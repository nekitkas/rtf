package main

import (
	"flag"
	"log"
	"forum/server/internal/app/server"
	"os"
)

var configPath string

func init() {
	jwtKey := os.Getenv("JWT_KEY")
	if jwtKey == "" {
		log.Fatalf("error: env variable JWT_KEY is not set")
	}

	flag.StringVar(&configPath, "config-path", "server/configs/config.json", "path to config")
}

func main() {
	flag.Parse()

	config := server.NewConfig()
	err := config.ReadConfig(configPath)
	if err != nil {
		log.Fatalf("Error reading config file: %s\n", err)
	}

	log.Fatal(server.Start(config))
}
