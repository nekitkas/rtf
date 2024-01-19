package db

import (
	"time"
)

type User struct {
	ID        string    `db:"id" json:"id"`
	Username  string    `db:"username" json:"username"`
	Email     string    `db:"email" json:"email"`
	Password  string    `db:"password" json:"password"`
	Timestamp time.Time `db:"timestamp" json:"timestamp"`
	Age       int       `db:"age" json:"age"`
	FirstName string    `db:"first_name" json:"first_name"`
	LastName  string    `db:"last_name" json:"last_name"`
	Gender    string    `db:"gender" json:"gender"`
	ImageURL  string    `db:"image_url" json:"image_url"`
}

type Post struct {
	ID        string    `db:"id" json:"id"`
	Title     string    `db:"title" json:"title"`
	Content   string    `db:"content" json:"content"`
	UserID    string    `db:"user_id" json:"user_id"`
	ImageURL  string    `db:"image_url" json:"image_url"`
	Timestamp time.Time `db:"timestamp" json:"timestamp"`
}
