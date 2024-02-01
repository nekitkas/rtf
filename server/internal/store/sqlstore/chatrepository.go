package sqlstore

import (
	"fmt"

	"forum/server/internal/models"

	"github.com/google/uuid"
)

type ChatRepository struct {
	store *Store
}

func (c *ChatRepository) CheckChatExists(user1 string, user2 string) ([]string, error) {
	query := `SELECT chat_id
FROM chatUser
WHERE user_id IN (?, ?)
GROUP BY chat_id
HAVING COUNT(DISTINCT user_id) = 2;
`

	row, err := c.store.Db.Query(query, user1, user2)
	if err != nil {
		return []string{}, err
	}

	var strs []string
	for row.Next() {
		var str string
		if err := row.Scan(&str); err != nil {
			return []string{}, err
		}
		strs = append(strs, str)
	}
	fmt.Println(strs)

	return strs, nil
}

func (c *ChatRepository) Create(user1 string, user2 string) (models.Chat, error) {
	query := `INSERT INTO chat (id) VALUES (?)`

	id := uuid.New().String()

	if _, err := c.store.Db.Exec(query, id); err != nil {
		return models.Chat{}, err
	}

	if err := c.createChatUser(user1, id); err != nil {
		return models.Chat{}, err
	}

	if err := c.createChatUser(user2, id); err != nil {
		return models.Chat{}, err
	}

	return models.Chat{
		ID: id,
	}, nil
}

func (c *ChatRepository) createChatUser(user_id string, chat_id string) error {
	id := uuid.New().String()
	query := `INSERT INTO chatUser (id, user_id, chat_id) VALUES (?, ?, ?)`

	if _, err := c.store.Db.Exec(query, id, user_id, chat_id); err != nil {
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

// func getLinesOfChat(chat_id string) ([]models.Line, error)
