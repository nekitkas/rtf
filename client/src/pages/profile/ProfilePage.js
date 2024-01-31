import { NavbarLogged } from "../../components/Navbar/NavbarLogged"
import "../../styles/profile.css"

import { RenderProfile, profileContainer } from "../../components/Profile.js"

import { ROOT, CONTAINER } from "../../index.js"

const userInfo = [
  "John",
  "Doe",
  "test1",
  "test1@gmail.com",
  "Male",
  "01.10.2001",
]

export async function RenderProfilePage() {
  ROOT.innerHTML = ""
  CONTAINER.innerHTML = ""
  profileContainer.innerHTML = ""

  await NavbarLogged()

  const Profile = RenderProfile(userInfo)

  CONTAINER.appendChild(Profile)

  ROOT.appendChild(CONTAINER)
}
