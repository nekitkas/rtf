package sqlstore

import "forum/server/internal/models"

type PostRepository struct {
	store *Store
}

func (r *PostRepository) Create(post *models.Post) error {
	//TODO implement me
	panic("implement me")
}

func (r *PostRepository) FindByID(id string) error {
	panic("implement me!")
}
