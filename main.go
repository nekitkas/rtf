package main

import (
	"fmt"

	database "forum/server/db/functions"
)

func main() {
	database.GetUser()
	fmt.Println("Hello World!")
}
