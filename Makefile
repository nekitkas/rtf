.PHONY: build run-api run-client
.SILENT:
build:
	go build -o ./build/api ./cmd/api/main.go
	go build -o ./build/client ./cmd/client/main.go
run-api: build
	./build/api

run-client: build
	./build/client