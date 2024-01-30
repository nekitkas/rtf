package websocket

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

type responseWriter struct {
	http.ResponseWriter
	code int
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

// upgrader.CheckOrigin = func(r *http.Request) bool { return true }

type WebSocket struct {
	Upgrader   websocket.Upgrader
	connection *websocket.Conn
}

func NewWebSocket() *WebSocket {
	return &WebSocket{Upgrader: upgrader}
}

// Takes in a custom responsewriter that has to have a hijack function
func (ws *WebSocket) HandleWebSocket(rw http.ResponseWriter, r *http.Request) error {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	if conn, err := upgrader.Upgrade(rw, r, nil); err != nil {
		return err
	} else {
		ws.connection = conn
	}

	if err := ws.socketLoop(); err != nil {
		return err
	}

	return nil
}

func (ws *WebSocket) CloseHandler(code int, text string) error {
	if err := ws.connection.CloseHandler()(code, text); err != nil {
		return err
	}

	return nil
}

func (ws *WebSocket) socketLoop() error {
	defer ws.CloseHandler(1001, "Client left the connection")
	for {
		messageType, message, err := ws.connection.ReadMessage()
		if err != nil {
			return err
		}

		if string(message) == "CLOSE" {
			ws.CloseHandler(1000, `Recieved "CLOSE" message from client`)
			return nil
		}
		fmt.Println(messageType)

		fmt.Println("Received message:", string(message))

		err = ws.connection.WriteMessage(messageType, message)
		if err != nil {
			return err
		}
	}
}

func (ws *WebSocket) readJson()
