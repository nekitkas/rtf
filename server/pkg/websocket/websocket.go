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
	//Allow all connections
	CheckOrigin: func(r *http.Request) bool { return true },
}

type WebSocket struct {
	Upgrader           websocket.Upgrader
	connections map[*websocket.Conn]bool
}

func NewWebSocket() *WebSocket {
	return &WebSocket{
		Upgrader:           upgrader,
		connections: make(map[*websocket.Conn]bool),
	}
}

// Takes in a custom responsewriter that has to have a hijack function
func (ws *WebSocket) HandleWebSocket(rw http.ResponseWriter, r *http.Request) error {
	if conn, err := upgrader.Upgrade(rw, r, nil); err != nil {
		return err
	} else {
		ws.connections[conn] = true
		go ws.handleWebSocketConnection(conn)
	}

	return nil
}

func (ws *WebSocket) handleWebSocketConnection(conn *websocket.Conn) {
	defer func(){
		conn.Close()
		delete(ws.connections, conn)
	}()
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			fmt.Println("WebSocket Read Error:", err)
			delete(ws.connections, conn)
			break
		}

		fmt.Println(ws.connections)
		// Process the received message (e.g., broadcast to other users)
		ws.broadcast(messageType, p)
	}
}

func (ws *WebSocket) broadcast(messType int, b []byte) {
	for ws := range ws.connections {
		go func(ws *websocket.Conn) {
			if err := ws.WriteMessage(messType, b); err != nil {
				fmt.Println("SOMETING ERROR", err)
			}
		}(ws)
	}
}
