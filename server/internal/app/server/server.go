package server

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"

	"forum/server/internal/models"
	"forum/server/internal/store"
	"forum/server/pkg/router"

	"github.com/gorilla/sessions"
)

const (
	sessionName        = "session"
	ctxKeyUser  ctxKey = iota
	ctxKeyRequestID
)

type ctxKey int8

type server struct {
	router       *router.Router
	logger       *log.Logger
	store        store.Store
	sessionStore sessions.Store
}

func newServer(store store.Store, sessionStore sessions.Store) *server {
	s := &server{
		router:       router.NewRouter(),
		logger:       log.Default(),
		store:        store,
		sessionStore: sessionStore,
	}

	s.configureRouter()

	return s
}

func (s *server) configureRouter() {
	// Using middlewares
	// s.router.Use(s.setRequestID)
	// s.router.Use(s.logRequest)
	s.router.Use()

	s.router.HandleFunc("POST", "/api/v1/chat/create", s.handleChatCreate())
	s.router.HandleFunc("POST", "/api/v1/users/create", s.handleUsersCreate())
	s.router.HandleFunc("GET", "/api/v1/users/login", s.handleUsersLogin())
	s.router.HandleFunc("GET", "/api/v1/users/findById", s.handleUsersGetById())

	// s.router.UseWithPrefix("/private", s.authenticateUser)
	// s.router.HandleFunc("GET", "/private/profile", s.handleProfile())
}

func (s *server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.router.ServeHTTP(w, r)
}

func (s *server) handleChatCreate() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		s.respond(w, r, http.StatusCreated, fmt.Sprintf(`Successfull, user: %v`, "test"))
	}
}

func (s *server) handleUsersLogin() http.HandlerFunc {
	type RequestBody struct {
		Login    string `json:"login"`
		Password string `json:"password"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		var requestBody RequestBody
		if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		user, err := s.store.User().CheckUser(requestBody.Login)
		if err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		// Check password
		if user.ComparePassword(requestBody.Password) {
			user.Sanitize()
			s.respond(w, r, http.StatusCreated, user)
		} else {
			s.error(w, r, http.StatusUnauthorized, errors.New("Invalid login credentials!"))
		}
	}
}

func (s *server) handleUsersGetById() http.HandlerFunc {
	type RequestBody struct {
		ID string `json:"id"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		var requestBody RequestBody
		if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		user, err := s.store.User().FindByID(requestBody.ID)
		if err != nil {
			s.error(w, r, http.StatusBadRequest, err)
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

		user.Sanitize()
		s.respond(w, r, http.StatusCreated, user)
	}
}

func (s *server) error(w http.ResponseWriter, r *http.Request, code int, err error) {
	s.respond(w, r, code, map[string]string{"error": err.Error()})
}

func (s *server) respond(w http.ResponseWriter, r *http.Request, code int, data interface{}) {
	w.WriteHeader(code)
	if data != nil {
		json.NewEncoder(w).Encode(data)
	}
}
