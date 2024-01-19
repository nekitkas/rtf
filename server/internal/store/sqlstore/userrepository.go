package sqlstore

import (
	"forum/server/internal/models"
	"time"

	"github.com/google/uuid"
)

type UserRepository struct {
	store *Store
}

func (r *UserRepository) FindByID(id string) (*models.User, error) {
	//TODO implement me
	panic("implement me")
}

func (r *UserRepository) Create(user *models.User) error {
	//Maybe add checks for example: wheter all the neccessary information is given or checks in front end for that?
	user.ID = uuid.New().String()
	user.Timestamp = time.Now()
	//Adding that stuff to db
	query := `INSERT INTO user (id, username, email, password, timestamp, age, first_name, last_name, gender, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	_, err := r.store.Db.Exec(query, user.ID, user.Username, user.Email, user.Password, user.Timestamp, user.Age, user.FirstName, user.LastName, user.Gender, user.ImageURL)
	if err != nil {
		return err
	}

	return nil
}

func (r *UserRepository) FindByEmail(email string) (*models.User, error) {
	//TODO: Implement
	return nil, nil
}
