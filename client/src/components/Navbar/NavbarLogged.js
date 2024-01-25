import "../../styles/navbar.css";
import searchSvg from "../../assets/img//search.svg";
import plusSvg from "../../assets/img/plus.svg";
import avatar from "../../assets/img/avatar.svg.png";
import arrowSvg from "../../assets/img/arrow.svg";
import messageButtonImage from "../../assets/img/message.svg";
import modalProfile from "../../assets/img/modalProfile.svg";
import logout from "../../assets/img/logout.svg";

export function NavbarLogged() {
  const currentUrl = window.location.href;



  const mainContainer = document.querySelector(".root");
  if(currentUrl.includes("create-post")){
    mainContainer.innerHTML = `
    <nav class="navbar-post">
    <div class="nav-start">
      <a href="#/home"><h1 class="logo">VOYAGE</h1></a>
    </div>
    <div class="user-block">
    <div class="message-button">
      <img src="${messageButtonImage}" alt="message-button">
    </div>
    <div class="user-profile">
      <img class="user-avatar" src=${avatar} alt="profile">

      <div class="user-profile-selector">
        <p>Filthy Frank</p>
        <img   src="${arrowSvg}" alt="arrow">
        <div class="userprofile-modal">
        <div class = "modal-div"><p>My profile</p><img src="${modalProfile}" class="modal-icon" alt="profile"></img></div>
       <div class = "modal-div"><p>Log out</p><img src="${logout}" class="modal-icon"  alt="logout"></img></div>
      </div>
      </div>
    </div>
  </nav>`;
  }else{
    mainContainer.innerHTML = `
    <nav class="navbar">
    <div class="nav-start">
      <a href="#/home"><h1 class="logo">VOYAGE</h1></a>
      <div class="input-select-block">
        <div class="input-block">
          <input type="text" class="search_input" placeholder="Search" maxlength="15" />
          <img src=${searchSvg} alt="" class="search-icon" />
        </div>
        <div class="select-block">

          <select name="categories" class="categories">
            <option value="categories">categories</option>
            <option value="Sport">Sport</option>
            <option value="Politics">Politics</option>
            <option value="Fun">Fun</option>
            <option value="Technologies">Technologies</option>
          </select>

        </div>

      </div>
    </div>
    <div class="user-block">
      <div class="message-button">
        <img src="${messageButtonImage}" alt="message-button">
      </div>
      <a href="#/create-post">
      <div class="create-post-button">
         <img src="${plusSvg}" alt="create-post-button"></img>
      </div>
      <a/>
      <div class="user-profile">
        <img class="user-avatar" src=${avatar} alt="profile">

        <div class="user-profile-selector">
          <p>Filthy Frank</p>
          <img   src="${arrowSvg}" alt="arrow">
          <div class="userprofile-modal">
          <div class = "modal-div"><p>My profile</p><img src="${modalProfile}" class="modal-icon" alt="profile"></img></div>
         <div class = "modal-div"><p>Log out</p><img src="${logout}" class="modal-icon"  alt="logout"></img></div>
        </div>
        </div>
      </div>
    </div>
  </nav>`;
  }




const userProfile = document.querySelector('.userprofile-modal')
const userBlock = document.querySelector('.user-profile')
userBlock.addEventListener('click', displayUserModal)

function displayUserModal(){
  userProfile.classList.toggle("showModal");
}
}