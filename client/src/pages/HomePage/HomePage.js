import { Navbar } from "../../components/Navbar/Navbar.js";
import "../../styles/homepage_styles/home.css"

export function RenderHomePage(){
   const rootContainer = document.querySelector('.root');
    Navbar()
    const mainContainer = document.createElement("div")
    mainContainer.classList.add("container")
    rootContainer.append(mainContainer)
    


}