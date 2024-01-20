package sqlstore

import (
	"database/sql"
	"fmt"
	"log"
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
	err := r.store.Db.QueryRow(query, id).Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Timestamp, &user.Age, &user.FirstName, &user.LastName, &user.Gender, &user.ImageURL)
	if err != nil {
		if err == sql.ErrNoRows {
			// Handle the case where no user was found
			log.Println("No user found with the specified ID")
		} else {
			// Handle other types of errors
			log.Fatal(err)
		}
	}

	user.Sanitize()

	return &user, nil
}

func (r *UserRepository) Create(user *models.User) error {
	// Maybe add checks for example: wheter all the neccessary information is given or checks in front end for that?
	user.ID = uuid.New().String()
	user.Timestamp = time.Now()
	// hash the password and store it
	fmt.Println(user.Password)
	user.BeforeCreate()
	fmt.Println(user.Password)

	// Adding that stuff to db
	query := `INSERT INTO user (id, username, email, password, timestamp, age, first_name, last_name, gender, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	_, err := r.store.Db.Exec(query, user.ID, user.Username, user.Email, user.Password, user.Timestamp, user.Age, user.FirstName, user.LastName, user.Gender, user.ImageURL)
	if err != nil {
		return err
	}

	return nil
}

func (r *UserRepository) FindByEmail(email string) (*models.User, error) {
	// command to find a user with a specific id
	query := `SELECT * FROM user u WHERE u.email = ?`

	var user models.User
	// get the row and add it to the user variable
	err := r.store.Db.QueryRow(query, email).Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Timestamp, &user.Age, &user.FirstName, &user.LastName, &user.Gender, &user.ImageURL)
	if err != nil {
		if err == sql.ErrNoRows {
			// Handle the case where no user was found
			log.Println("No user found with the specified Email")
		} else {
			// Handle other types of errors
			log.Fatal(err)
		}
	}

	return &user, nil
}
