import { ROOT } from ".."
import { Messenger, OpenMessengers } from "./Messenger"
import { CURRENTUSER } from "../pages/login/Login";
export const OnlineUsers = [];
export class UsercardUser{
  constructor({id, username, image_url}){
    this.id = id;
    this.username = username;
    this.image_url = image_url;
    this.online = false;
    this.userComponent = document.createElement("div");
    OnlineUsers.push(this);
  }

  Create(){
    this.userComponent.className = "user"
    // Create user image
    const userImage = document.createElement("img")
    userImage.src = this.image_url ? this.image_url : "https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
    userImage.alt = "user-avatar-from-userbar"
    this.userComponent.style.backgroundColor = "red";
    // Create user name
    const userName = document.createElement("p")
    userName.textContent = this.username
    
    this.userComponent.addEventListener('click', () => {
      console.log("OPENMESSENGERS   :   ", OpenMessengers)
      if(OpenMessengers.length == 0){
        const Chats = new Messenger(CURRENTUSER.id, this.id, this.username, this.image_url, ROOT)
        Chats.Create()
        
      }else{
        console.log("YOU CAN NOT OPEN MULTIPLE CHATS AT ONCE!")
      }
    })
    // Append elements to the User component
    this.userComponent.appendChild(userImage)
    this.userComponent.appendChild(userName)

    return this.userComponent
  }

}

export function RefreshStatus(){
  for(let user of OnlineUsers){
    if(user.online){
      user.userComponent.style.backgroundColor = "green";
    }else{
      user.userComponent.style.backgroundColor = "red";
    }
  }
}
