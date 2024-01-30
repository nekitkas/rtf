package store

import (
	"time"

	"forum/server/internal/models"
)

type UserRepository interface {
	Create(*models.User) error
	// FindByID is used to send the client user data
	// (password from db has been sanitized)
	FindByID(string) (*models.User, error)
	// Check can be used to get user data not meant to go the client
	// (password from db has NOT BEEN SANITIZED)
	Check(string) (*models.User, error)
}

type ReactionRepository interface {
	Create(*models.Reaction) error
	AddToParent(post_id string, reaction_id string, user_id string) error
	RemoveFromParent(post_id string, reaction_id string, user_id string) error
	GetByUserParentID(parent_id string, user_id string) (*[]models.Reaction, error)
	GetByParentID(parent_id string) (*[]models.Reaction, error)
	GetAll() (*[]models.Reaction, error)
}

type PostRepository interface {
	Create(*models.Post, []models.Category, string) error
	Get(string) (*models.Post, error)
	GetFeed(offset, limit int, timeStamp time.Time) ([]models.Post, error)
	GetCommentNumber(postId string) (int, error)
}

type CategoryRepository interface {
	Create(*models.Category) error
	Get(string) (*models.Category, error)
	GetForPost(postId string) (*[]models.Category, error)
	GetAll() (*[]models.Category, error)
}

type CommentRepository interface {
	Create(*models.Comment, string) error
	Get(id string) (*[]models.Comment, error)
}
