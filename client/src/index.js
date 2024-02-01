import { OpenMessengers } from "./components/Messenger.js"
import { RouterFunction } from "./router/Router.js"

export const Page = document.querySelector(".root")

const ROOT = document.querySelector(".root")
const CONTAINER = document.createElement("div")
CONTAINER.className = "container"

let Socket

export function initializeWebSocket(id) {
  // Replace 'ws://example.com/socket' with your WebSocket server URL
  Socket = new WebSocket('ws://localhost:8080/chat/'+id);

  // WebSocket event listeners
  Socket.addEventListener('open', (event) => {
    console.log('WebSocket connection opened:', event);
  });

  Socket.addEventListener('message', (event) => {
    // console.log(event.data.json())
    const parsedData = JSON.parse(event.data)

    for(let i = 0; i < OpenMessengers.length; i++){
      if (OpenMessengers[i].userToId == parsedData.from_user){
        OpenMessengers[i].messages.push({text: parsedData.message, class: "left"});
        OpenMessengers[i].RefreshChats();
      } 
    }
    console.log('Received message:', event.data);
  });

  Socket.addEventListener('close', (event) => {
    console.log('WebSocket connection closed:', event);
  });

  Socket.addEventListener('error', (event) => {
    console.error('WebSocket error:', event);
  });
}

// Call the router initially and on every navigation
window.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault()

  await RouterFunction()
})

// window.addEventListener("hashchange", () => {
//   console.log("hashchange")
//   RouterFunction()
// })

// Handle link clicks to prevent default navigation


export { ROOT, CONTAINER, Socket }
