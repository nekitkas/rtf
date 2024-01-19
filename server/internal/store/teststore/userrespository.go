package teststore

import (
	"errors"
	"forum/server/internal/models"
)

type UserRepository struct {
	store *Store
	users map[int]*models.User
}

func (r *UserRepository) Create(user *models.User) error {
	if err := user.BeforeCreate(); err != nil {
		return err
	}

	r.users[user.ID] = user

	return nil
}

func (r *UserRepository) FindByID(id int) (*models.User, error) {
	user, ok := r.users[id]
	if !ok {
		return nil, errors.New("not found")
	}

	return user, nil
}

func (r *UserRepository) FindByEmail(email string) (*models.User, error) {
	for _, u := range r.users {
		if u.Email == email {
			return u, nil
		}
	}

	return nil, errors.New("not found")
}
