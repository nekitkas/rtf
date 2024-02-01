package sqlstore

import (
	"fmt"

	"forum/server/internal/models"
)

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

func (c *ChatRepository) Get(id string) (models.Chat, error) {
	query := `SELECT c.id, cu.user_id, u.username, 
	FROM chat c
	INNER JOIN chatUser cu ON c.id = cu.chat_id
	INNER JOIN user u ON u.id = cu.id
	WHERE c.id = ?;
	`

	rows, err := c.store.Db.Query(query, id)
	if err != nil {
		return models.Chat{}, err
	}

	for rows.Next() {
		chat := models.Chat{
			Users: []models.ChatUser{
				{
					ID: "TEST IF I CAN DO THIS",
				},
			},
		}

		if err := rows.Scan(&chat.ID, &chat.Users[0].UserID, &chat.Users[0].Username); err != nil {
			return models.Chat{}, err
		}
		fmt.Println(chat)
	}

	return models.Chat{}, nil
}

func getLinesOfChat(chat_id string) ([]models.Line, error)
