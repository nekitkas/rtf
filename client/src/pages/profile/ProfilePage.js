import { NavbarLogged } from "../../components/Navbar/NavbarLogged";
import "../../styles/profile.css";


export function RenderProfilePage(){
    const rootContainer = document.querySelector(".root");
    rootContainer.innerHTML= ""
    NavbarLogged()


    const Container = document.createElement("div")
    const PostFeed = document.createElement("div")
   PostFeed.classList.add("post-feed")

   Container.classList.add("container")
   rootContainer.append(Container)

   const ProfileContainer = document.createElement("div")
   ProfileContainer.classList.add("profile-container")
   Container.appendChild(ProfileContainer)
}