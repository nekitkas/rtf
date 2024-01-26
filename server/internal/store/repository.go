package store

import "forum/server/internal/models"

type UserRepository interface {
	Create(*models.User) error
	// FindByID is used to send the client user data
	// (password from db has been sanitized)
	FindByID(string) (*models.User, error)
	// CheckUser can be used to get user data not meant to go the client
	// (password from db has NOT NOT BEEN SANITIZED)
	CheckUser(string) (*models.User, error)
}

type PostRepository interface {
	Create(*models.Post) error
	GetPost(string) error
}

type ChatRepository interface {
	Create(*models.Chat) error
}
