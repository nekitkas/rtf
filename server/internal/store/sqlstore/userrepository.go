package sqlstore

import (
	"database/sql"
	"errors"
	"time"

	"forum/server/internal/models"

	"github.com/google/uuid"
)

type UserRepository struct {
	store *Store
}

func (r *UserRepository) FindByID(id string) (*models.User, error) {
	// command to find a user with a specific id
	query := `SELECT * FROM user u WHERE u.id = ?`

	var user models.User
	// get the row and add it to the user variable
	err := r.store.Db.QueryRow(query, id).Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Timestamp, &user.DateOfBirth, &user.FirstName, &user.LastName, &user.Gender, &user.ImageURL)
	if err != nil {
		return nil, err
	}

	user.Sanitize()
	return &user, nil
}

func (r *UserRepository) Create(user *models.User) error {
	user.ID = uuid.New().String()
	user.Timestamp = time.Now()
	// hash the password and store it
	user.BeforeCreate()

	// Adding that stuff to db
	query := `INSERT INTO user (id, username, email, password, timestamp, date_of_birth, first_name, last_name, gender, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	_, err := r.store.Db.Exec(query, user.ID, user.Username, user.Email, user.Password, user.Timestamp, user.DateOfBirth, user.FirstName, user.LastName, user.Gender, user.ImageURL)
	user.Sanitize()

	if err != nil {
		return err
	}

	return nil
}

func (r *UserRepository) Check(login string) (*models.User, error) {
	//command to find a user no matter if its email or username
	query := `SELECT * FROM user u WHERE u.email = ? OR u.username = ?`
	var user models.User

	err := r.store.Db.QueryRow(query, login, login).Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Timestamp, &user.DateOfBirth, &user.FirstName, &user.LastName, &user.Gender, &user.ImageURL)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, err
		}
	}
	//check if passwords match
	return &user, nil
}
