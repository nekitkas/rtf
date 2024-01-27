import { NavbarLogged } from "../../components/Navbar/NavbarLogged";
import "../../styles/profile.css";


export function RenderProfilePage(){
    const mainContainer = document.querySelector(".root");
    mainContainer.innerHTML= ""
    NavbarLogged()


    const ProfileContainer = document.createElement("div");
    ProfileContainer.className = "profile-container";
    mainContainer.appendChild(ProfileContainer)
}