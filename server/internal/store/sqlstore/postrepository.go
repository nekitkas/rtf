package sqlstore

import (
	"database/sql"
	"fmt"
	"forum/server/internal/models"
	"time"

	"github.com/google/uuid"
)

type PostRepository struct {
	store *Store
}

func (r *PostRepository) Create(post *models.Post, categories []models.Category) error {
	//Add other neccessary information for posts
	post.ID = uuid.New().String()
	post.Timestamp = time.Now()
	//Get user id from Sessions/Cookeis
	//TO-DO

	insertQuery := `INSERT INTO post (id, title, content, user_id, image_url, timestamp) VALUES (?, ?, ?, ?, ?, ?)`

	_, err := r.store.Db.Exec(insertQuery, post.ID, post.Title, post.Content, post.UserID, post.ImageURL, post.Timestamp)
	if err != nil {
		return fmt.Errorf("Database SQL query error: %v", err)
	}

	//Insert info to join tabel
	insertQuery = `INSERT INTO postCategory (id, post_id, category_id) VALUES (?, ?, ?)`
	for _, category := range categories {
		categoryToCheck, err1 := r.store.Category().GetCategory(category.Name)
		//If there is not added category to db, then add
		if err1 == sql.ErrNoRows {
			_, err = r.store.Db.Exec(insertQuery, uuid.New().String(), post.ID, category.ID)
			if err != nil {
				return fmt.Errorf("Database SQL query error: %v", err)
			}
		}else if err1 != nil {
			return fmt.Errorf(err.Error())
		//If there is category added to db, then just take the existing category and add it
		}else{
			_, err1 = r.store.Db.Exec(insertQuery, uuid.New().String(), post.ID, &categoryToCheck.ID)
			if err != nil {
				return fmt.Errorf("Database SQL query error: %v", err)
			}
		}
	}

	return nil
}

func (r *PostRepository) GetPost(id string) error {
	panic("implement me!")
}
