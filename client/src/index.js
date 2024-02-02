import { OpenMessengers } from "./components/Messenger.js"
import { router } from "./router/Router.js"
import { OnlineUsers, RefreshStatus } from "./components/UserCard.js"
import { CheckPosition } from "./helpers/LazyLoading.js"

export const Page = document.querySelector(".root")

const ROOT = document.querySelector(".root")
const CONTAINER = document.createElement("div")
CONTAINER.className = "container"


function checkScroll() {
  window.addEventListener('scroll', CheckPosition)
  window.addEventListener('resize', CheckPosition)
}
checkScroll()

let Socket

export function initializeWebSocket() {
  // Replace 'ws://example.com/socket' with your WebSocket server URL
  Socket = new WebSocket('ws://localhost:8080/jwt/chat');

  // WebSocket event listeners
  Socket.addEventListener('open', (event) => {
    console.log('WebSocket connection opened:', event);
    RefreshStatus()
  });

  Socket.addEventListener('message', (event) => {
    // console.log(event.data.json())
    const parsedData = JSON.parse(event.data)
    let onlineUsers = parsedData.online_users
    console.log(onlineUsers)
    setTimeout(() => {
      if (onlineUsers != undefined){
        for(let i = 0; i < OnlineUsers.length; i++){
          for(let j = 0; j < onlineUsers.length; j++){
            console.log("TESTINDASKDSALDKASDKLSADSA: ", OnlineUsers[i].id, onlineUsers[j])
            if(OnlineUsers[i].id == onlineUsers[j]){
                OnlineUsers[i].online = true;
                RefreshStatus()
             }
          }
        }
      }
    }, 200)

    if(parsedData.message == "online" && parsedData.type == "status"){
      //fire a get all function
      for(let i = 0; i < OnlineUsers.length; i++){
        if(OnlineUsers[i].id == parsedData.from_user){
          OnlineUsers[i].online = true;
        }
      }

    }

    if(parsedData.message == "offline" && parsedData.type == "status"){
      for(let i = 0; i < OnlineUsers.length; i++){
        if(OnlineUsers[i].id == parsedData.from_user){
          console.log('true');
          OnlineUsers[i].online = false;
          onlineUsers = onlineUsers.filter(function(item) {
            return item !== OnlineUsers[i].id
        })
        }
      }
    }

    RefreshStatus()
    for(let i = 0; i < OpenMessengers.length; i++){
      if (OpenMessengers[i].userToId == parsedData.from_user && parsedData.type == "chat"){
        // OpenMessengers[i].messages.push({text: parsedData.message, class: "left"});
        // OpenMessengers[i].RefreshChats();
        OpenMessengers[i].AppendLine({text: parsedData.message, class: "left"})
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

  await router()
})

export { ROOT, CONTAINER, Socket }
