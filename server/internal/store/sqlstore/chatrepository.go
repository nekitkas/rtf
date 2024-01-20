package sqlstore

import "forum/server/internal/models"

type ChatRepository struct {
	store *Store
}

func (c *ChatRepository) Create(chat *models.Chat) error {
	return nil
}
