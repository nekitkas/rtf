package store

type Store interface {
	User() UserRepository
	Post() PostRepository
	Category() CategoryRepository
	Comment() CommentRepository
}
