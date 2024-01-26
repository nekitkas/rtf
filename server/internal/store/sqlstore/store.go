package sqlstore

import (
	"database/sql"

	"forum/server/internal/store"

	_ "github.com/mattn/go-sqlite3"
)

type Store struct {
	Db             *sql.DB
	userRepository *UserRepository
	postRepository *PostRepository
	chatRepository *ChatRepository
}

func New(db *sql.DB) *Store {
	return &Store{
		Db: db,
	}
}

func (s *Store) User() store.UserRepository {
	if s.userRepository != nil {
		return s.userRepository
	}

	s.userRepository = &UserRepository{
		store: s,
	}

	return s.userRepository
}

func (s *Store) Post() store.PostRepository {
	if s.postRepository != nil {
		return s.postRepository
	}

	s.postRepository = &PostRepository{
		store: s,
	}

	return s.postRepository
}

func (s *Store) Chat() store.ChatRepository {
	if s.chatRepository != nil {
		return s.chatRepository
	}

	s.chatRepository = &ChatRepository{
		store: s,
	}

	return s.chatRepository
}
