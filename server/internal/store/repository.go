package store

import "forum/server/internal/models"

type UserRepository interface {
	Create(*models.User) error
	FindByID(string) (*models.User, error)
	FindByEmail(string) (*models.User, error)
}

type PostRepository interface {
	Create(*models.Post) error
	GetPost(string) error
}