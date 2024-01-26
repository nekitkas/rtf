package store

type Store interface {
	User() UserRepository
	Post() PostRepository
	Chat() ChatRepository
}
