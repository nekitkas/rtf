.PHONY: build
build:
	go build -v ./server/cmd/api

.PHONY: test
test:
	go test -v ./...
.DEFAULT_GOAL := build