import "../../styles/navbar.css";
import searchSvg from "../../assets/img/search.svg";
import plusSvg from "../../assets/img/plus.svg";
import avatar from "../../assets/img/avatar.svg.png";
import arrowSvg from "../../assets/img/arrow.svg";
import messageButtonImage from "../../assets/img/message.svg";

export function Navbar() {
  const mainContainer = document.querySelector(".root");
  mainContainer.innerHTML = `
    <nav class="navbar">

    <a href="#/home"> <h1 class="logo">VOYAGE</h1></a>
    </div>
    <div class="navbar-auth">

        <a href="#/login"><div class="navbar-button"><p>Sign in</p></div></a>

        <a href="#/register">
        <div class="navbar-button"><p>Sign up</p></div>
      </a>
      </div>
  </nav>`;
}
