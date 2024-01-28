package sqlstore

import (
	"forum/server/internal/models"

	"github.com/google/uuid"
)

type ReactionRepository struct {
	store *Store
}

func (r *ReactionRepository) Create(reaction *models.Reaction) error {
	return nil
}

func (r *ReactionRepository) AddToParent(parent_id string, reaction_id string, user_id string) error {
	id := uuid.New().String()

	query := `
	INSERT INTO parentReaction (id, user_id, reaction_id, parent_id, parent_type) VALUES (?, ?, ?, ?, ?);`
	_, err := r.store.Db.Exec(query, id, user_id, reaction_id, parent_id, "")
	if err != nil {
		return err
	}

	return nil
}

func (r *ReactionRepository) RemoveFromParent(post_id string, reaction_id string, user_id string) error {
	return nil
}

func (r *ReactionRepository) GetByParentID(parent_id string) (*[]models.Reaction, error) {
	query := ` 
SELECT r.id, r.emoji, r.description
FROM parentReaction pr
INNER JOIN reaction r ON pr.reaction_id = r.id
WHERE pr.parent_id = ?;
	`

	var reactions []models.Reaction

	resp, err := r.store.Db.Query(query, parent_id)
	if err != nil {
		return nil, err
	}
	defer resp.Close()

	for resp.Next() {
		var reaction models.Reaction
		if err := resp.Scan(&reaction.ID, &reaction.Emoji, &reaction.Description); err != nil {
			return nil, err
		}
		reactions = append(reactions, reaction)
	}

	return &reactions, nil
}

func (r *ReactionRepository) GetByUserParentID(parent_id string, user_id string) (*[]models.Reaction, error) {
	query := ` 
SELECT r.id, r.emoji, r.description
FROM parentReaction pr
INNER JOIN reaction r ON pr.reaction_id = r.id
WHERE pr.user_id = ? AND pr.parent_id = ?;
	`

	var reactions []models.Reaction

	resp, err := r.store.Db.Query(query, user_id, parent_id)
	if err != nil {
		return nil, err
	}
	defer resp.Close()

	for resp.Next() {
		var reaction models.Reaction
		if err := resp.Scan(&reaction.ID, &reaction.Emoji, &reaction.Description); err != nil {
			return nil, err
		}
		reactions = append(reactions, reaction)
	}

	return &reactions, nil
}

func (r *ReactionRepository) GetAll() (*[]models.Reaction, error) {
	query := ` 
	SELECT * FROM reaction
	`

	var reactions []models.Reaction

	resp, err := r.store.Db.Query(query)
	if err != nil {
		return nil, err
	}
	defer resp.Close()

	for resp.Next() {
		var reaction models.Reaction
		if err := resp.Scan(&reaction.ID, &reaction.Emoji, &reaction.Description); err != nil {
			return nil, err
		}
		reactions = append(reactions, reaction)
	}

	return &reactions, nil
}
