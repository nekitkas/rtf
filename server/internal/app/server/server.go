package server

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"forum/server/internal/models"
	"forum/server/internal/store"
	"forum/server/pkg/jwttoken"
	"forum/server/pkg/router"
	"forum/server/pkg/websocket"
)

const (
	sessionName     = "session"
	jwtKey          = "JWT_KEY"
	ctxKeyRequestID = iota
	ctxUserID
)

type server struct {
	websocket *websocket.WebSocket
	router    *router.Router
	logger    *log.Logger
	store     store.Store
}

func newServer(store store.Store) *server {
	s := &server{
		websocket: websocket.NewWebSocket(),
		router:    router.NewRouter(),
		logger:    log.Default(),
		store:     store,
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
	s.router.HandleFunc("GET", "/api/v1/logout", s.handleLogOut())

	s.router.UseWithPrefix("/jwt", s.jwtMiddleware)

	// -------------------- USER PATHS ------------------------------- //
	s.router.HandleFunc("GET", "/api/v1/jwt/users/:id", s.handleUsersGetByID())
	s.router.HandleFunc("DELETE", "/api/v1/jwt/users/delete/:id", s.handleUsersDelete())
	s.router.HandleFunc("POST", "/api/v1/jwt/users/getUser", s.handleUsersGetByID())
	s.router.HandleFunc("DELETE", "/api/v1/jwt/users/delete", s.handleUsersDelete())
	s.router.HandleFunc("GET", "/api/v1/jwt/users/getAll", s.handleUsersGetAll())
	// -------------------- CATEGORY PATHS --------------------------- //
	s.router.HandleFunc("GET", "/api/v1/jwt/categories", s.handleGetAllCategories())
	// -------------------- POST PATHS ------------------------------- //
	s.router.HandleFunc("GET", "/api/v1/jwt/posts", s.handleAllPostInformation())
	s.router.HandleFunc("POST", "/api/v1/jwt/posts/create", s.handlePostCreation())
	s.router.HandleFunc("GET", "/api/v1/jwt/posts/:id", s.serveSinglePostInformation())
	s.router.HandleFunc("DELETE", "/api/v1/jwt/posts/delete/:id", s.handleRemovePost())
	// -------------------- COMMENT PATHS ---------------------------- //
	s.router.HandleFunc("POST", "/api/v1/jwt/comments/create", s.handleCommentCreation())
	s.router.HandleFunc("DELETE", "/api/v1/jwt/comments/delete/:id", s.handleRemoveComment())
	// -------------------- REACTION PATHS --------------------------- //
	s.router.HandleFunc("GET", "/api/v1/jwt/reactions/getAll", s.handleGetReactions())
	s.router.HandleFunc("POST", "/api/v1/jwt/reactions/remove", s.handleRemoveReaction())
	s.router.HandleFunc("POST", "/api/v1/jwt/reactions/addToParent", s.handleAddReactionsToParent())
	s.router.HandleFunc("GET", "/api/v1/jwt/reactions/getByUserParentID", s.handleGetUserReactions())
	s.router.HandleFunc("GET", "/api/v1/jwt/reactions/getByParentID", s.handleGetReactionsByParentID())
	// -------------------- CHAT --------------------------- //
	s.router.HandleFunc("GET", "jwt/chat/:user_id", s.wsHandler())
}

func (s *server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.router.ServeHTTP(w, r)
}

func (s *server) wsHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rw := &responseWriter{w, http.StatusOK}
		userId := router.Param(r.Context(), "user_id")
		if err := s.websocket.HandleWebSocket(rw, r, userId); err != nil {
			s.error(w, r, http.StatusInternalServerError, err)
		}
	}
}

func (s *server) handleCheckCookie() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie(sessionName)
		if err != nil {
			s.error(w, r, http.StatusUnauthorized, err)
			return
		}

		alg := jwttoken.HmacSha256(os.Getenv(jwtKey))
		claims, err := alg.DecodeAndValidate(cookie.Value)
		if err != nil {
			s.error(w, r, http.StatusUnauthorized, err)
			return
		}
		// check if user exist
		_, err = s.store.User().FindByID(claims.UserID)
		if err != nil {
			deletedCookie := s.deleteCookie()
			http.SetCookie(w, &deletedCookie)
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		s.respond(w, r, http.StatusOK, nil)
	}
}

func (s *server) handleUsersGetAll() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value(ctxUserID).(string)

		data, err := s.store.User().GetAllOtherUsers(userID)
		if err != nil {
			s.error(w, r, http.StatusInternalServerError, err)
			return
		}

		s.respond(w, r, http.StatusOK, data)
	}
}

func (s *server) handleGetReactionsOptions() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		reactions, err := s.store.Reaction().GetAll()
		if err != nil {
			s.error(w, r, http.StatusInternalServerError, err)
			return
		}

		s.respond(w, r, http.StatusFound, reactions)
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

func (s *server) deleteCookie() http.Cookie {
	deletedCookie := http.Cookie{
		Name:     sessionName,
		Value:    "",
		Expires:  time.Now().Add(-1 * time.Hour),
		Path:     "/",
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	}
	return deletedCookie
}
