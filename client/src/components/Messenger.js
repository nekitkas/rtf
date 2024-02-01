import { Socket } from ".."
import { GLOBAL_URL } from "../config";

export const OpenMessengers = [];
export class Messenger {
  constructor(currentUserId, userToId, username, imageUrl, RootElement){
    this.currentUserId = currentUserId;
    this.userToId = userToId;
    this.username = username;
    this.imageUrl = imageUrl;
    this.RootElement = RootElement;
    this.chatBody = document.createElement("div");
    this.messenger = document.createElement("div")
    this.messages = new ObservableArray([
    ])
    this.messages.addListener((eventName, items, array) => {
      console.log("ITEM ADDED!", items)
    })
    this.chatId;
    this.openedAt = new Date().toISOString()
    this.chatPage = 0;
    OpenMessengers.push(this)

    this.chatBody.addEventListener('wheel', Throttle(() => this.LoadOlderChats(), 300));
  }

  //Get messages from the back-end

  Close(){
    this.RootElement.removeChild(this.messenger);
    OpenMessengers.pop(this.messenger);
  }

  async LoadChats(){
    await this.GetChatId()
    //Initalize last messages from database (like 20 last messages)
    console.log("CHATID", this.chatId, "Timestamp", this.openedAt, "count", this.chatPage)
    fetch(GLOBAL_URL + `/api/v1/jwt/chat/line/init`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        "chat_id": this.chatId,
        "timestamp": this.openedAt,
        "count": this.chatPage,
      }),
      credentials: "include",
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if(data.data != null){
        data.data.forEach((item) => {
          let toBeClass = "left";
          if(item.user_id == this.currentUserId){
            toBeClass = "right";
          }
          this.messages.push({text: item.content,
          class: toBeClass})
        })
      }
      console.log(data);
      this.AddChats()
    }).catch((err) => {
      console.log("ERROR WHILE CREATING CHATID: ", err)
      return
    })
  }

  async GetChatId(){
    ///api/v1/jwt/chat/:user_id
    await fetch(GLOBAL_URL + `/api/v1/jwt/chat/`+this.userToId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log(" THIS IS THE CHAT ID WE ARE CREAINTG", data)
      this.chatId = data.data.chat_id[0];
      // return data.data.chat_id[0]
    }).catch((err) => {
      console.log("ERROR WHILE CREATING CHATID: ", err)
      return
    })
  }

  LoadOlderChats(){
  // If scollred up, add more messagesconst isScrollCloseToBottom = () => {
    // const isAtTop = this.chatBody.scrollTop <= 800;
    // if (isAtTop){
    //   for(let i = 0; i <= 20; i++)
    //   this.AppendLine({text: "JUST A TESTING: " + i, class: "left"}, true)
    // }
  }

  Create(){
    this.messenger.classList.add("messenger")
    
    const chatHeader = document.createElement("div")
    chatHeader.classList.add("chat-header")
    
    const userChatInfo = document.createElement("div")
    userChatInfo.classList.add("user-chat-info")
    
    const userImage = document.createElement("img")
    userImage.src = this.imageUrl
    userImage.alt = this.userToId

    const userName = document.createElement("p")
    userName.textContent = this.username
    const closeIcon = document.createElement("img")
    closeIcon.src = "/assets/close.svg"
    closeIcon.alt = "close"
    closeIcon.addEventListener("click", () => {
      this.Close()
    })
    
    userChatInfo.appendChild(userImage)
    userChatInfo.appendChild(userName)
    
    chatHeader.appendChild(userChatInfo)
    chatHeader.appendChild(closeIcon)
    
    this.chatBody.classList.add("chat-body")

    this.LoadChats()


    const chatFooter = document.createElement("div");
    chatFooter.className = "chat-footer";
  
  // Create form for message input
    const messageForm = document.createElement("form");
  
  
  // Create message input
    const messageInput = document.createElement("input");
    messageInput.type = "text";
    messageInput.placeholder = "Aa";
    messageInput.id = "message";
  
  // Create send button
    const sendButton = document.createElement("input");
    sendButton.type = "image";
    sendButton.src = "/assets/send.svg";
    sendButton.name = "submit";
    sendButton.alt = "submit";
    sendButton.className = "form-img-submit";
    sendButton.addEventListener('click', (event) => {
      event.preventDefault()
      let messageToSend = {
        "message": messageInput.value,
        "to_user": this.userToId,
      }
      sendMessage(JSON.stringify(messageToSend))
      let textLine = {
        text: messageInput.value,
        class: "right",
      }
      this.AddToDatabase(messageInput.value)
      this.messages.push(textLine)
      messageInput.value = "";
      this.AppendLine(textLine)
    })
  
    messageForm.appendChild(messageInput);
    messageForm.appendChild(sendButton);
  
    chatFooter.appendChild(messageForm);
  
    this.messenger.appendChild(chatHeader)
    this.messenger.appendChild(this.chatBody)
    this.messenger.appendChild(chatFooter)
    //appendToRoot
    this.RootElement.appendChild(this.messenger)
    //move the chat to bottom
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
  }

  AddChats(){
    // const scrollTop = this.chatBody.scrollTop;
    this.chatBody.innerHTML = "";
    this.messages.array.reverse().forEach((message) => {
      this.AppendLine(message)
    })
  }

  async AddToDatabase(message){
    await this.GetChatId()
    await fetch(GLOBAL_URL + `/api/v1/jwt/chat/line/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "chat_id": this.chatId,
        "content": message,
        "timestamp": new Date().toISOString(),
      }),
      credentials: "include",
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data)
      // return data.data.chat_id[0]
    }).catch((err) => {
      console.log("ERROR ADDING LINE TO DATABASE: ", err)
      return
    })
  }
  
  AppendLine(message, top=false){
    const msgDiv = document.createElement("div")
    msgDiv.classList.add("msg")
    
    const msgText = document.createElement("p")
    msgText.classList.add(message.class)
    msgText.textContent = message.text
    
    msgDiv.appendChild(msgText)

    if(top){
      this.chatBody.insertBefore(msgDiv, this.chatBody.firstChild);
    }else{
      this.chatBody.appendChild(msgDiv)
      this.chatBody.scrollTop = this.chatBody.scrollHeight;
    }
    // return msgDiv
  }
}

export function Throttle(func, delay){
  let shouldWait = false;

  return function(...args){
      if(shouldWait) return;
      func(...args);
      shouldWait = true;

      setTimeout(() => {
          shouldWait = false;
      }, delay)
  }
}


class ObservableArray {
  constructor(arr) {
    this.array = arr;
    this.listeners = [];
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  push(item) {
    this.array.push(item);
    this.notifyListeners('add', [item]);
  }

  // Add other array methods as needed

  notifyListeners(eventName, items) {
    this.listeners.forEach(listener => {
      listener(eventName, items, this.array);
    });
  }
}
// Append the 'messenger' element to the document or any other container element in your HTML
function sendMessage(message) {
  if (Socket.readyState === WebSocket.OPEN) {
    Socket.send(message);
    // console.log('Message sent:', message);
  } else {
    console.error('WebSocket connection not open. Cannot send message.');
  }
}

