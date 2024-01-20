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
	"github.com/gorilla/websocket"
)

const (
	sessionName        = "session"
	ctxKeyUser  ctxKey = iota
	ctxKeyRequestID
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

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
	s.router.Use(s.setRequestID)
	s.router.Use(s.logRequest)

	fs := http.FileServer(http.Dir("server/cmd/api/static"))
	s.router.HandleFunc("*", "/static/", http.StripPrefix("/static/", fs).ServeHTTP)
	s.router.HandleFunc("POST", "/users", s.handleUsersCreate())
	s.router.HandleFunc("POST", "/sessions", s.handleSessionsCreate())
	s.router.HandleFunc("*", "/ws", s.wsHandler())

	// s.router.HandleFunc("*", "/", fs.ServeHTTP)

	// s.router.UseWithPrefix("/private", s.authenticateUser)
	// s.router.HandleFunc("GET", "/private/profile", s.handleProfile())
}

func (s *server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.router.ServeHTTP(w, r)
}

func (s *server) wsHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// fmt.Println("PARY")
		rw := &responseWriter{w, http.StatusOK}
		conn, err := upgrader.Upgrade(rw, r, nil)
		if err != nil {
			log.Println(err)
			return
		}
		fmt.Println("Client connected")
		defer conn.Close()

		for {
			messageType, message, err := conn.ReadMessage()
			if err != nil {
				log.Println(err)
				return
			}

			fmt.Println("Received message:", string(message))

			err = conn.WriteMessage(messageType, message)
			if err != nil {
				log.Println(err)
				return
			}
		}
	}
}

func (s *server) handleUsersCreate() http.HandlerFunc {
	type request struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		req := &request{}
		if err := json.NewDecoder(r.Body).Decode(req); err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		user := &models.User{
			Email:    req.Email,
			Password: req.Password,
		}
		if err := s.store.User().Create(user); err != nil {
			s.error(w, r, http.StatusUnprocessableEntity, err)
			return
		}

		user.Sanitize()
		s.respond(w, r, http.StatusCreated, user)
	}
}

func (s *server) handleSessionsCreate() http.HandlerFunc {
	type request struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		req := &request{}
		if err := json.NewDecoder(r.Body).Decode(req); err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		u, err := s.store.User().FindByEmail(req.Email)
		if err != nil || !u.ComparePassword(req.Password) {
			s.error(w, r, http.StatusUnauthorized, errors.New("incorrect email or password"))
			return
		}

		session, err := s.sessionStore.Get(r, sessionName)
		if err != nil {
			s.error(w, r, http.StatusInternalServerError, err)
			return
		}

		session.Values["user_id"] = u.ID
		err = s.sessionStore.Save(r, w, session)
		if err != nil {
			s.error(w, r, http.StatusInternalServerError, err)
			return
		}

		s.respond(w, r, http.StatusOK, nil)
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
