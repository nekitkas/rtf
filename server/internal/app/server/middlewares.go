package server

import (
	"context"
	"errors"
	"fmt"
	"github.com/google/uuid"
	"net/http"
	"time"
)

var jwtKey = []byte("secret_key")

func (s *server) setRequestID(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		id := uuid.New().String()
		w.Header().Set("X-Request-ID", id)
		next.ServeHTTP(w, r.WithContext(context.WithValue(r.Context(), ctxKeyRequestID, id)))
	})
}

func (s *server) logRequest(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		rw := &responseWriter{w, http.StatusOK}
		s.logger.Printf("started %s %s\nremote_addr:%s  request_id:%s",
			r.Method,
			r.RequestURI,
			r.RemoteAddr,
			r.Context().Value(ctxKeyRequestID),
		)
		start := time.Now()
		next.ServeHTTP(rw, r)
		s.logger.Printf("completed in %s with %d %s\nremote_addr:%s  request_id:%s",
			time.Now().Sub(start),
			rw.code,
			http.StatusText(rw.code),
			r.RemoteAddr,
			r.Context().Value(ctxKeyRequestID),
		)
	})
}

func (s *server) CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers dynamically based on the request's Origin header
		origin := r.Header.Get("Origin")
		if origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Credentials", "true")
		}

		// Allow only specific methods for actual requests
		if r.Method == http.MethodOptions {
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
			w.WriteHeader(http.StatusOK)
			return
		}

		// Call the next handler in the chain for actual requests
		next.ServeHTTP(w, r)
	})
}

// Middleware for auth
func (s *server) authenticateUser(next http.Handler) http.Handler {
	fmt.Println("method authenticateUser")
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		session, err := s.sessionStore.Get(r, sessionName)
		if err != nil {
			s.error(w, r, http.StatusInternalServerError, err)
		}

		id, ok := session.Values["user_id"]
		if !ok {
			fmt.Println("1")
			s.error(w, r, http.StatusUnauthorized, errors.New("not authenticated"))
			return
		}

		u, err := s.store.User().FindByID(id.(string))
		if err != nil {
			fmt.Println("2")
			s.error(w, r, http.StatusUnauthorized, errors.New("not authenticated"))
			return
		}

		next.ServeHTTP(w, r.WithContext(context.WithValue(r.Context(), ctxKeyUser, u)))
	})
}

func (s *server) JWTAuth() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// expirationTime := time.Now().Add(time.Minute * 1)
		// claims :=
	})
}
