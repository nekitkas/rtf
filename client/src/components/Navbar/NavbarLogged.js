import "../../styles/navbar.css"

import plusSvg from "../../assets/img/plus.svg"
import avatar from "../../assets/img/avatar.svg.png"
import arrowSvg from "../../assets/img/arrow.svg"
import messageButtonImage from "../../assets/img/message.svg"
import modalProfile from "../../assets/img/modalProfile.svg"
import logout from "../../assets/img/logout.svg"
import { RouterFunction } from "../../router/Router"
import { Logout } from "../../helpers/ServerRequests"

export function NavbarLogged() {
  const currentUrl = window.location.href

  const mainContainer = document.querySelector(".root")
  if (currentUrl.includes("create-post")) {
    mainContainer.innerHTML = `
    <nav class="navbar-post">
    <div class="nav-start">
      <a href="/"><h1 class="logo">VOYAGE</h1></a>
    </div>
    <div class="user-block">
    <div class="message-button">
      <img src="${messageButtonImage}" alt="message-button">
    </div>
    <div class="user-profile">
      <img class="user-avatar" src=${avatar} alt="profile">

      <div class="user-profile-selector">
        <p>Filthy Frank</p>
        <img class="modal-arrow"  src="${arrowSvg}" alt="arrow">
        <div class="userprofile-modal">
        <div class = "modal-div"><p class="UserprofileLink">My profile</p><img src="${modalProfile}" class="modal-icon" alt="profile"></img></div>
       <div class = "modal-div"><p class="logoutBtn">Log out</p><img src="${logout}" class="modal-icon"  alt="logout"></img></div>
      </div>
      </div>
    </div>
  </nav>`
  } else {
    mainContainer.innerHTML = `
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
        <p>Filthy Frank</p>
        <img class="modal-arrow"  src="${arrowSvg}" alt="arrow">
        <div class="userprofile-modal">
        <div class = "modal-div"><p class="UserprofileLink">My profile</p><img src="${modalProfile}" class="modal-icon" alt="profile"></img></div>
       <div class = "modal-div"><p class="logoutBtn">Log out</p><img src="${logout}" class="modal-icon"  alt="logout"></img></div>
      </div>
      </div>
    </div>
  </nav>`
  }

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
      window.location.href = "/profile"
      RouterFunction()
    })
  }

  const logoutBtn = document.querySelector(".logoutBtn")
  logoutBtn.addEventListener("click", () => {
    Logout()

    window.location.href = "/login"
    RouterFunction()
  })
}
