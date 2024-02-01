import { ROOT } from ".."
import { Messenger, OpenMessengers } from "./Messenger"

export function UserCard(data) {
  const { id, username, image_url } = data

  const userComponent = document.createElement("div")
  userComponent.className = "user"
  userComponent.id = id
  // Create user image
  const userImage = document.createElement("img")
  userImage.src = image_url ? image_url : "https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
  userImage.alt = "user-avatar-from-userbar"

  // Create user name
  const userName = document.createElement("p")
  userName.textContent = username

  userComponent.addEventListener('click', () => {
    console.log("OPENMESSENGERS   :   ", OpenMessengers)
    if(OpenMessengers.length == 0){
      const Chats = new Messenger("CURRUSERID", id, username, image_url, ROOT)
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
