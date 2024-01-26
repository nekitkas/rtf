import { Navbar } from "../../components/Navbar/Navbar.js";
import "../../styles/style.css"

export function RenderHomePage(){
   const rootContainer = document.querySelector('.root');
    Navbar()
    const mainContainer = document.createElement("div")
    mainContainer.classList.add("container")
    rootContainer.append(mainContainer)
    


}