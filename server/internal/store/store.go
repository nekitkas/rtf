package store

type Store interface {
	User() UserRepository
	Post() PostRepository
	Category() CategoryRepository
	Reaction() ReactionRepository
	Comment() CommentRepository
}
