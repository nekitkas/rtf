package sqlstore

import (
	"database/sql"
	"fmt"
	"forum/server/internal/models"
	"time"

	"github.com/google/uuid"
)

type CommentRepository struct {
	store *Store
}

func (c *CommentRepository) Create(comment *models.Comment) error {
	//Add other neccessary information for posts
	comment.ID = uuid.New().String()
	comment.Timestamp = time.Now()
	//Get user id from Sessions/Cookeis
	comment.UserID = "NEEDS IMPLEMENTING!"
	//TO-DO

	insertQuery := `INSERT INTO comment (id, user_Id, post_id, parent_id, content, timestamp) VALUES (?, ?, ?, ?, ?, ?)`
	_, err := c.store.Db.Exec(insertQuery, comment.ID, comment.UserID, comment.PostID, comment.ParentID, comment.Content, comment.Timestamp)
	if err != nil {
		return fmt.Errorf("Database SQL query error: %v", err)
	}

	return nil
}

func (c *CommentRepository) GetComment(id string) (*models.Comment, error) {
	query := `SELECT * FROM comment WHERE id = ?`

	var comment models.Comment
	err := c.store.Db.QueryRow(query, id).Scan(&comment.ID, &comment.UserID, &comment.PostID, &comment.ParentID, &comment.Content, &comment.Timestamp)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf(`Comment containing id %v does not exist`, id)
		} else {
			return nil, fmt.Errorf(`Error occured while checking comments: %v`, err)
		}
	}

	return &comment, nil
}

func (c *CommentRepository) GetSubComments(id string) (*[]models.Comment, error) {
	query := `SELECT * FROM comment WHERE parent_id = ?`

	rows, err := c.store.Db.Query(query, id)
	if err != nil {
		return nil, fmt.Errorf(`Error while executing db query comments - %v`, err)
	}
	defer rows.Close()

	var comments []models.Comment
	for rows.Next() {
		var comment models.Comment
		err := rows.Scan(&comment.ID, &comment.UserID, &comment.PostID, &comment.ParentID, &comment.Content, &comment.Timestamp)
		if err != nil {
			return nil, fmt.Errorf(`Error while looping through comments - %v`, err)
		}
		comments = append(comments, comment)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf(`Looping error - %v`, err)
	}
	return &comments, nil
}