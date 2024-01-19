package store

import "forum/server/internal/models"

type UserRepository interface {
	Create(*models.User) error
	FindByID(int) (*models.User, error)
	FindByEmail(string) (*models.User, error)
}
