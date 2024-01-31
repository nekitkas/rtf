import { RouterFunction } from "./router/Router.js"

export const Page = document.querySelector(".root")

const ROOT = document.querySelector(".root")
const CONTAINER = document.createElement("div")
CONTAINER.className = "container"

// Call the router initially and on every navigation
window.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault()

  await RouterFunction()
})

// window.addEventListener("hashchange", () => {
//   console.log("hashchange")
//   RouterFunction()
// })

// Handle link clicks to prevent default navigation
document.addEventListener("click", async (e) => {
  const target = e.target

  // Check if the clicked element is an anchor element and has the same origin
  if (target.tagName === "A" && target.origin === location.origin) {
    e.preventDefault() // Prevent the default behavior of anchor links


    window.history.pushState({}, "", e.target.href)

    // Call RouterFunction asynchronously
    await RouterFunction()
  }
})

export { ROOT, CONTAINER }
