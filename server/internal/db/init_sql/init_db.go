package db

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

func OpenDB() *sql.DB {
	db, err := sql.Open("sqlite3", "server/db/data.sqlite")
	if err != nil {
		log.Fatal(err)
	}

	sqlStmt, err := os.ReadFile("server/db/init_sql/schema.sql")
	if err != nil {
		log.Fatal(err)
	}
	_, err = db.Exec(string(sqlStmt))
	if err != nil {
		log.Fatal(err)
	}
	return db
}
