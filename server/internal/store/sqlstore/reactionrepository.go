package sqlstore

import (
	"forum/server/internal/models"
)

type ReactionRepository struct {
	store *Store
}

func (r *ReactionRepository) Create(reaction *models.Reaction) error {
	return nil
}

func (r *ReactionRepository) AddReactionTo(post_id string, reaction_id string) error {
	// id := uuid.New().String()

	query := `
	INSERT INTO parentReaction p (id, user_id, reaction_id, parent_id, parent_type)
	VALUES
		(?, ?, ?, ?, ?);
	`
	_, err := r.store.Db.Exec(query)
	if err != nil {
		return err
	}

	return nil
}

func (r *ReactionRepository) GetAllReactions() ([]models.Reaction, error) {
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

	return reactions, nil
}
