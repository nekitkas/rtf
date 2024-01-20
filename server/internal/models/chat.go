package models

import "time"

type Chat struct {
	ID string `db:"id" json:"id"`
}

type ChatUser struct {
	ID     string `db:"id" json:"id"`
	UserID string `db:"user_id" json:"user_id"`
	ChatID string `db:"chat_id" json:"chat_id"`
}

type ChatLine struct {
	ID        string    `db:"id" json:"id"`
	ChatID    string    `db:"chat_id" json:"chat_id"`
	UserID    string    `db:"user_id" json:"user_id"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
	Content   string    `db:"content" json:"content"`
}
