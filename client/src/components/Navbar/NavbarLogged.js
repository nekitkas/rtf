import "../../styles/navbar.css"

import plusSvg from "../../assets/img/plus.svg"
import avatar from "../../assets/img/avatar.svg.png"
import arrowSvg from "../../assets/img/arrow.svg"
import messageButtonImage from "../../assets/img/message.svg"
import modalProfile from "../../assets/img/modalProfile.svg"
import logout from "../../assets/img/logout.svg"
import { RouterFunction } from "../../router/Router"
import { GetUserInfo, Logout } from "../../helpers/ServerRequests"
import { Socket } from "../.."

export async function NavbarLogged() {
  const userInfo = await GetUserInfo()

  console.log("user info:", userInfo);

  const navbarHTML = await RenderNavbar(userInfo);
  const mainContainer = document.querySelector(".root");
  mainContainer.innerHTML = navbarHTML;

  const userProfile = document.querySelector(".userprofile-modal")
  const userBlock = document.querySelector(".user-profile")
  userBlock.addEventListener("click", displayUserModal)
  const modalArrow = document.querySelector(".modal-arrow")

  function displayUserModal() {
    userProfile.classList.toggle("showModal")
    modalArrow.classList.toggle("show-modal-arrow")
  }

  const UserprofileLink = document.querySelector(".UserprofileLink")
  if (UserprofileLink) {
    UserprofileLink.addEventListener("click", () => {
    
      window.history.pushState({}, "", "/profile")
      RouterFunction()
    })
  }

  const logoutBtn = document.querySelector(".logoutBtn")
  logoutBtn.addEventListener("click", () => {
    Socket.close(1000, "Connection closed by the client")
    Logout()


    window.history.pushState({}, "", "/login")
    RouterFunction()
  })

  return navbarHTML;
}


const  RenderNavbar =  async (userInfo) => {
  const currentUrl = window.location.href
  let navbarHTML = '';

  // const mainContainer = document.querySelector(".root")
  if (currentUrl.includes("create-post")) {
    navbarHTML = `
    <nav class="navbar-post">
    <div class="nav-start">
      <a href="#" ><h1 class="logo">VOYAGE</h1></a>
    </div>
    <div class="user-block">
    <div class="message-button">
      <img src="${messageButtonImage}" alt="message-button">
    </div>
    <div class="user-profile">
      <img class="user-avatar" src=${avatar} alt="profile">

      <div class="user-profile-selector">
        <p>${userInfo.username}</p>
        <img class="modal-arrow"  src="${arrowSvg}" alt="arrow">
        <div class="userprofile-modal">
        <div class = "modal-div"><p class="UserprofileLink">My profile</p><img src="${modalProfile}" class="modal-icon" alt="profile"></img></div>
       <div class = "modal-div"><p class="logoutBtn">Log out</p><img src="${logout}" class="modal-icon"  alt="logout"></img></div>
      </div>
      </div>
    </div>
  </nav>`
  } else {
    navbarHTML = `
    <nav class="navbar-post">
    <div class="nav-start">
      <a href="/"><h1 class="logo">VOYAGE</h1></a>
    </div>
    <div class="user-block">
    <div class="message-button">
      <img src="${messageButtonImage}" alt="message-button">
    </div>
    <a href="/create-post">
    <div class="create-post-button">
       <img src="${plusSvg}" alt="create-post-button"></img>
    </div>
    <a/>
    <div class="user-profile">
      <img class="user-avatar" src=${avatar} alt="profile">

      <div class="user-profile-selector">
      <p>${userInfo.username}</p>
        <img class="modal-arrow"  src="${arrowSvg}" alt="arrow">
        <div class="userprofile-modal">
        <div class = "modal-div"><p class="UserprofileLink">My profile</p><img src="${modalProfile}" class="modal-icon" alt="profile"></img></div>
       <div class = "modal-div"><p class="logoutBtn">Log out</p><img src="${logout}" class="modal-icon"  alt="logout"></img></div>
      </div>
      </div>
    </div>
  </nav>`
  }

  return navbarHTML;

}




export function NavbarNotLogged() {
  const mainContainer = document.querySelector(".root")
  mainContainer.innerHTML = `
    <nav class="navbar">

    <a href="/"> <h1 class="logo">VOYAGE</h1></a>
    </div>
    <div class="navbar-auth">

        <a href="/login" ><div class="navbar-button"><p>Sign in</p></div></a>

        <a href="/register">
        <div class="navbar-button"><p>Sign up</p></div>
      </a>
      </div>
  </nav>`
}



