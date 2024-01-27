.PHONY: build
build:
	go build -v ./server/cmd/api
.DEFAULT_GOAL := build