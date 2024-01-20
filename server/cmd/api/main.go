package main

import (
	"flag"
	"log"

	"forum/server/internal/app/server"
)

var configPath string

func init() {
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
