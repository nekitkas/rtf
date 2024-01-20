package store

import "forum/server/internal/models"

type UserRepository interface {
	Create(*models.User) error
	FindByID(string) (*models.User, error)
	FindByEmail(string) (*models.User, error)
	CheckUser(string) (*models.User, error)
}

type PostRepository interface {
	Create(*models.Post, []models.Category) error
	GetPost(string) error
}

type CategoryRepository interface {
	Create(*models.Category) error
	GetCategory(string) (*models.Category, error)
}
