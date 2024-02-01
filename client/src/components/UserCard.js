import { ROOT } from ".."
import { Messenger, OpenMessengers } from "./Messenger"

export class UsercardUser{
  constructor({id, username, image_url}){
    this.id = id;
    this.username = username;
    this.image_url = image_url;
    this.online = false;

  }

  Create(){
    const userComponent = document.createElement("div")
    userComponent.className = "user"
    // Create user image
    const userImage = document.createElement("img")
    userImage.src = this.image_url ? this.image_url : "https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
    userImage.alt = "user-avatar-from-userbar"
    
    // Create user name
    const userName = document.createElement("p")
    userName.textContent = this.username
    
    userComponent.addEventListener('click', () => {
      console.log("OPENMESSENGERS   :   ", OpenMessengers)
      if(OpenMessengers.length == 0){
        const Chats = new Messenger("CURRUSERID", this.id, this.username, this.image_url, ROOT)
        Chats.Create()
      }else{
        console.log("YOU CAN NOT OPEN MULTIPLE CHATS AT ONCE!")
      }
    })
    // Append elements to the User component
    userComponent.appendChild(userImage)
    userComponent.appendChild(userName)

    return userComponent
  }
}

