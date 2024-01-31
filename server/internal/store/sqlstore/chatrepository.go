package sqlstore

import "forum/server/internal/models"

type ChatRepository struct {
	store *Store
}

func (c *ChatRepository) Create(model *models.Chat) error {
	query := `INSERT INTO chat (id) VALUES (?)`

	if _, err := c.store.Db.Exec(query, model.ID); err != nil {
		return err
	}

	return nil
}

func (c *ChatRepository) Get(id string)
