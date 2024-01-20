package sqlstore

import (
	"database/sql"
	"fmt"
	"forum/server/internal/models"
	"strings"

	"github.com/google/uuid"
)

type CategoryRepository struct {
	store *Store
}

func (r *CategoryRepository) Create(category *models.Category) error {
	category.ID = uuid.New().String()
	//Add category information
	insertQuery := `INSERT INTO category (id, name, description) SELECT ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM category WHERE name = ?);`
	_, err := r.store.Db.Exec(insertQuery, category.ID, strings.ToLower(category.Name), category.Description, strings.ToLower(category.Name))
	if err != nil {
		return fmt.Errorf("Database SQL query error: %v", err)
	}
	return nil
}

func (r *CategoryRepository) GetCategory(name string) (*models.Category, error) {
	query := `SELECT * FROM category WHERE name = ?`

	var category models.Category

	err := r.store.Db.QueryRow(query, strings.ToLower(name)).Scan(&category.ID, &category.Name, &category.Description)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, sql.ErrNoRows
		} else {
			return nil, fmt.Errorf(`Error occured while checking category: %v`, err)
		}
	}
	return &category, nil
}
