import { RouterFunction } from "./router/Router.js";


export const Page =document.querySelector(".root");

// Call the router initially and on every navigation
window.addEventListener("DOMContentLoaded", () => {
  console.log('DOMContentLoaded');
  RouterFunction()
});

window.addEventListener("hashchange", () => {
  console.log('hashchange');
  RouterFunction()
});

// Handle link clicks to prevent default navigation
document.addEventListener("click", (e) => {
    const target = e.target;

    if (target.tagName === "A" && target.origin === window.location.origin) {
      e.preventDefault();
      const href = target.getAttribute("href");
      window.location.hash = href;
      console.log('Hash updated to:', href);
     RouterFunction()
    }
});
