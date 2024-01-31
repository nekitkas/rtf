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

  // Append elements to the User component
  userComponent.appendChild(userImage)
  userComponent.appendChild(userName)

  return userComponent
}
