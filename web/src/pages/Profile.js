import { Navbar } from "../components/Navbar.js"
import "../styles/profile.css"

import { RenderProfile, profileContainer } from "../components/Profile.js"

import { ROOT, CONTAINER } from "../index.js"
import { GetUserInfo, isLoggedIn } from "../helpers/ServerRequests.js"



export async function Profile() {
  ROOT.innerHTML = ""
  CONTAINER.innerHTML = ""
  profileContainer.innerHTML = ""

  await Navbar()

  const userId = await isLoggedIn()
  const userInfo = await GetUserInfo(userId)

  const Profile = RenderProfile(userInfo.data)

  CONTAINER.appendChild(Profile)

  ROOT.appendChild(CONTAINER)
}
