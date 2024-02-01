import { NavbarNotLogged } from "../../components/Navbar/NavbarNotLogged.js"
import "../../styles/auth.css"
import { RouterFunction } from "../../router/Router.js"
import { isLoggedIn } from "../../helpers/ServerRequests.js"
import { initializeWebSocket } from "../../index.js"
import { ROOT, CONTAINER } from "../../index.js"
import { Auth, RenderLoginForm } from "../../components/Auth/Login.js"
import { GLOBAL_URL } from '../../config.js'

export async function Login() {
  try {
      ROOT.innerHTML = ""
      CONTAINER.innerHTML = ""
      Auth.innerHTML = ""
      NavbarNotLogged()

      const LoginForm = RenderLoginForm()

      Auth.appendChild(LoginForm)
      CONTAINER.appendChild(Auth)
      ROOT.appendChild(CONTAINER)

      const loginForm = document.querySelector(".form")
      loginForm.addEventListener("submit", handleFormSubmit)
  } catch (error) {
    console.error("Error checking user login:", error)
  }
}

async function handleFormSubmit(e) {
  e.preventDefault() // Prevent the default form submission
  const errorMsg = document.querySelector(".errorMsg")
  const loginForm = document.querySelector(".form")
  // Get form data
  const formData = new FormData(loginForm)

  // Create an object from the form data
  const formDataObject = {}
  formData.forEach((value, key) => {
    // Exclude specific fields (e.g., 'confirm_password')
    if (key !== "confirm_password") {
      formDataObject[key] = value
    }
  })

  // Log the form data object
  console.log("Form data:", formDataObject)

  // Make a fetch request to the server
  fetch( GLOBAL_URL + "/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Method": "POST",
    },
    credentials: "include",
    body: JSON.stringify(formDataObject),
  })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            errorMsg.innerHTML = `Invalid Email/Nickname or password`
          }
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data) => {
        console.log(data)
        // window.location.href = "/"
        initializeWebSocket(data.id)
        window.history.pushState({}, "", "/")
        RouterFunction()
      })
      .catch((error) => {
        // Handle fetch errors
        console.log("Fetch error:", error)
      })
}
