package server

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"time"

	"forum/server/internal/models"
	"forum/server/internal/store"
	"forum/server/pkg/router"
)

const (
	sessionName = "session"
	ctxKeyRequestID
)

type ctxKey int8

type server struct {
	router *router.Router
	logger *log.Logger
	store  store.Store
}

func newServer(store store.Store) *server {
	s := &server{
		router: router.NewRouter(),
		logger: log.Default(),
		store:  store,
	}

	s.configureRouter()

	return s
}

func (s *server) configureRouter() {
	// Using middlewares
	s.router.Use(s.setRequestID)
	s.router.Use(s.logRequest)
	s.router.Use(s.CORSMiddleware)

	s.router.HandleFunc("POST", "/api/v1/users/create", s.handleUsersCreate())
	s.router.HandleFunc("POST", "/api/v1/users/login", s.handleUsersLogin())
	s.router.HandleFunc("GET", "/api/v1/auth/checkCookie", s.handleCheckCookie())
	s.router.HandleFunc("POST", "/api/v1/posts/create", s.handlePostCreation())
	s.router.HandleFunc("GET", "/api/v1/posts/findById", s.serveSinglePostInformation())
	s.router.HandleFunc("GET", "/api/v1/users/login", s.handleUsersLogin())
	s.router.HandleFunc("GET", "/api/v1/users/findById", s.handleUsersGetById())

	// s.router.UseWithPrefix("/private", s.authenticateUser)
	// s.router.HandleFunc("GET", "/private/profile", s.handleProfile())
}

func (s *server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.router.ServeHTTP(w, r)
}

func (s *server) handleCheckCookie() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie(sessionName)
		if err != nil {
			s.error(w, r, http.StatusUnauthorized, err)
			return
		}

		claims, err := parseToken(cookie.Value)
		if err != nil {
			s.error(w, r, http.StatusUnauthorized, err)
			return
		}

		// Check if the token is expired
		if time.Now().Unix() > claims.Exp {
			s.error(w, r, http.StatusUnauthorized, fmt.Errorf("expired token"))
			return
		}

		//In the future we can send userID from claims as respond
		s.respond(w, r, http.StatusOK, nil)
	}
}

func (s *server) handleUsersLogin() http.HandlerFunc {
	type RequestBody struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		var requestBody RequestBody

		if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		user, err := s.store.User().Check(requestBody.Email)
		if err != nil && !user.ComparePassword(requestBody.Password) {
			s.error(w, r, http.StatusUnauthorized, errors.New("invalid login credentials"))
			return
		}

		expiration := time.Now().Add(5 * time.Hour)
		token, err := s.generateToken(user.ID, expiration)
		if err != nil {
			s.error(w, r, http.StatusInternalServerError, err)
			return
		}

		cookie := http.Cookie{
			Name:     sessionName,
			Value:    token,
			Expires:  expiration,
			Path:     "/",
			HttpOnly: true,
			Secure:   true,
			SameSite: http.SameSiteNoneMode,
		}

		http.SetCookie(w, &cookie)

		s.respond(w, r, http.StatusOK, nil)
	}
}

func (s *server) handleUsersGetByEmail() http.HandlerFunc {
	type RequestBody struct {
		Email string `json:"email"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		var requestBody RequestBody
		if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
			s.error(w, r, http.StatusBadRequest, err)

			return
		}

		user, err := s.store.User().FindByID(requestBody.ID)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		s.respond(w, r, http.StatusCreated, user)
	}
}

func (s *server) handleUsersCreate() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		user := &models.User{}
		if err := json.NewDecoder(r.Body).Decode(user); err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		if err := s.store.User().Create(user); err != nil {
			s.error(w, r, http.StatusUnprocessableEntity, err)
			return
		}

		s.respond(w, r, http.StatusCreated, fmt.Sprintf(`Successfull, user: %v`, user))
	}
}

//-------------------------POST STUFF--------------------------//

func (s *server) handlePostCreation() http.HandlerFunc {
	type request struct {
		Post       models.Post       `json:"post"`
		Categories []models.Category `json:"categories"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		req := &request{}
		if err := json.NewDecoder(r.Body).Decode(req); err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}
		// Create category if needed
		for _, category := range req.Categories {
			if err := s.store.Category().Create(&category); err != nil {
				s.error(w, r, http.StatusUnprocessableEntity, err)
				return
			}
		}
		// Create post
		if err := s.store.Post().Create(&req.Post, req.Categories); err != nil {
			s.error(w, r, http.StatusUnprocessableEntity, err)
			return
		}

		s.respond(w, r, http.StatusCreated, fmt.Sprintf(`Successfull, post: %v, successfull categories %v`, req.Post, req.Categories))
	}
}

func (s *server) serveSinglePostInformation() http.HandlerFunc {
	type request struct {
		Post string `json:"post_id"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		req := &request{}
		if err := json.NewDecoder(r.Body).Decode(req); err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}
		post, err := s.store.Post().GetPost(req.Post)
		if err != nil {
			s.error(w, r, http.StatusBadRequest, err)
		}
		s.respond(w, r, http.StatusCreated, fmt.Sprintf(`Successfull post information: %v`, post))
	}
}

func (s *server) error(w http.ResponseWriter, r *http.Request, code int, err error) {
	s.respond(w, r, code, map[string]string{"error": err.Error()})
}

func (s *server) respond(w http.ResponseWriter, r *http.Request, code int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	if data != nil {
		json.NewEncoder(w).Encode(data)
	}
}
