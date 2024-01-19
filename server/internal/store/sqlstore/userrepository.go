package sqlstore

import "forum/server/internal/models"

type UserRepository struct {
	store *Store
}

func (r *UserRepository) FindByID(id string) (*models.User, error) {
	//TODO implement me
	panic("implement me")
}

func (r *UserRepository) Create(user *models.User) error {
	//TODO: Implement
	return nil
}

func (r *UserRepository) FindByEmail(email string) (*models.User, error) {
	//TODO: Implement
	return nil, nil
}
