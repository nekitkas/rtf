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
	err := r.store.Db.QueryRow(query, id).Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Timestamp, &user.DateOfBirth, &user.FirstName, &user.LastName, &user.Gender, &user.ImageURL)
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
	//Check if user exists in the firstPlace
	u, err := r.FindByEmail(user.Email)
	if (err != nil) {
		return fmt.Errorf(err.Error())
	}
	if user.Email == u.Email || user.Username == u.Username {
		return fmt.Errorf("User already created with this username/email")
	}
	// Maybe add checks for example: whether all the neccessary information is given or checks in front end for that?
	user.ID = uuid.New().String()
	user.Timestamp = time.Now()
	// hash the password and store it
	fmt.Println(user.Password)
	user.BeforeCreate()
	fmt.Println(user.Password)

	// Adding that stuff to db
	query := `INSERT INTO user (id, username, email, password, timestamp, age, first_name, last_name, gender, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	_, err := r.store.Db.Exec(query, user.ID, user.Username, user.Email, user.Password, user.Timestamp, user.DateOfBirth, user.FirstName, user.LastName, user.Gender, user.ImageURL)

	if err != nil {
		return fmt.Errorf("Database SQL query error: %v", err)
	}

	return nil
}

func (r *UserRepository) FindByEmail(email string) (*models.User, error) {
	// command to find a user with a specific id
	query := `SELECT * FROM user u WHERE u.email = ?`

	var user models.User
	// get the row and add it to the user variable
	err := r.store.Db.QueryRow(query, email).Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Timestamp, &user.DateOfBirth, &user.FirstName, &user.LastName, &user.Gender, &user.ImageURL)
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

func (r *UserRepository) CheckUser(login string) (*models.User, error) {
	//command to find a user no matter if its email or username
	query := `SELECT * FROM user u WHERE u.email = ? OR u.username = ?`

	var user models.User

	err := r.store.Db.QueryRow(query, login, login).Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Timestamp, &user.Age, &user.FirstName, &user.LastName, &user.Gender, &user.ImageURL)
	if err != nil {
		if err == sql.ErrNoRows {
			return &user, fmt.Errorf(`User is not registered!`)
		}else{
			return &user, fmt.Errorf(`Error occured while checking user: %v`, err)
		}
	}
	//check if passwords match
	
	return &user, nil
}
