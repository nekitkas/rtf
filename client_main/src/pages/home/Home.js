import { Navbar } from "../../components/Navbar/Navbar.js";
import "../../styles/homepage_styles/home_notRegistered.css"
import secureImg from "../../assets/img/secureLoginImg.jpg"

export function RenderHomePage(){
   const rootContainer = document.querySelector('.root');
   
  Navbar()
    const mainContainer = document.createElement("div")
    mainContainer.classList.add("container")
    rootContainer.append(mainContainer)
    

    mainContainer.innerHTML = `
    <div class="notloggedContainer">
    <h1 class="signin-text">Please sign in to see the content</h1>
    <img src=${secureImg} class="secureImg"></img>
    </div>
    `
    // const loginHeader = document.createElement("h1")
    // loginHeader.classList.add("signin-text")
    // loginHeader.innerText = "Please sign in to see the content"
    // mainContainer.appendChild(loginHeader)

}