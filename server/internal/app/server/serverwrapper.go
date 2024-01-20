package server

import (
	"database/sql"
	"forum/server/internal/store/sqlstore"
	"github.com/gorilla/sessions"
	_ "github.com/mattn/go-sqlite3"
	"net/http"
)

func Start(config *Config) error {
	db, err := newDB(config.DatabaseURL)
	if err != nil {
		return err
	}

	defer db.Close()

	store := sqlstore.New(db)
	sessionStore := sessions.NewCookieStore([]byte("test_key"))
	srv := newServer(store, sessionStore)

	srv.logger.Printf("Server started at port %v", config.Port)

	return http.ListenAndServe(config.Port, srv)
}

func newDB(databaseURL string) (*sql.DB, error) {
	db, err := sql.Open("sqlite3", databaseURL)
	if err != nil {
		return nil, err
	}

	if err = db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}
