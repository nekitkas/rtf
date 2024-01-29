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
   ProfileContainer.innerHTML = `
   <div class="avatarBlock">
   <div class="imgBlock">
       <img class="userAvatar" src="assets/avatar.svg.png" alt="">


   </div>
   <div class="changeAvatarDiv">
       <button class="changeAvatarBtn">Change Avatar</button>
   </div>
</div>
   <div class="infoBlock">
       <div class="userTextBlock">
           <div class="name">
               <h2>John</h2>
           </div>
           <div class="name">
               <h2>Doe</h2>
           </div>
           <div class="name">
               <h2>test1</h2>
           </div>
           <div class="name">
               <h2>test1@gmail.com</h2>
           </div>
           <div class="name">
               <h2>Male</h2>
           </div>
           <div class="name">
               <h2>01.10.2001</h2>
           </div>
       </div>

       <div class="emailBlock">

       </div>
   </div>
   `
}