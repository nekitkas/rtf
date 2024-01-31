import { ROOT } from ".."
import { Messenger } from "./Messenger"

export function UserCard(data) {
  const { id, username, image_url } = data

  const userComponent = document.createElement("div")
  userComponent.className = "user"
  // Create user image
  const userImage = document.createElement("img")
  userImage.src = image_url ? image_url : "https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
  userImage.alt = "user-avatar-from-userbar"

  // Create user name
  const userName = document.createElement("p")
  userName.textContent = username

  userComponent.addEventListener('click', () => {
    const Chats = new Messenger("CURRUSERID", id, username, image_url, ROOT)
    Chats.Create()
  })
  // Append elements to the User component
  userComponent.appendChild(userImage)
  userComponent.appendChild(userName)

  return userComponent
}
