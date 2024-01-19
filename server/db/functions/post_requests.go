package db

import (
	db "forum/server/db/init_sql"
	structs "forum/server/db/structs"
)

func GetPost(postId string) structs.Post {
	db := db.OpenDB()
	defer db.Close()

	var post structs.Post

	db.Exec(`SELECT`)

	return structs.Post{}
}
