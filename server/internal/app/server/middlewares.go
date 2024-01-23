package server

import (
	"context"
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
		s.logger.Printf("started %s %s ----- remote_addr:%s request_id:%s",
			r.Method,
			r.RequestURI,
			r.RemoteAddr,
			r.Context().Value(ctxKeyRequestID),
		)
		start := time.Now()
		next.ServeHTTP(rw, r)
		s.logger.Printf("completed in %s with %d %s ----- remote_addr:%s  request_id:%s",
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

func (s *server) jwtMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Extract the token from the Authorization header
		tokenString := extractToken(r.Header.Get("Authorization"))
		fmt.Println("Extracted Token:", tokenString)
		// Parse the token
		claims, err := parseToken(tokenString)
		fmt.Println(err)
		if err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		// Check if the token is expired
		if time.Now().Unix() > claims.Exp {
			http.Error(w, "Token expired", http.StatusUnauthorized)
			return
		}

		// Set user information in the request context or handle it as needed
		fmt.Println("UserID:", claims.UserID)

		// Call the next handler
		next.ServeHTTP(w, r)
	})
}
