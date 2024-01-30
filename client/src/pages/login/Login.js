import { NavbarNotLogged } from "../../components/Navbar/NavbarNotLogged.js"
import "../../styles/auth.css"
import { RouterFunction } from "../../router/Router.js"
import { CheckUserLoggedIn } from "../../helpers/ServerRequests.js"

import { ROOT, CONTAINER } from "../../index.js"
import { Auth, RenderLoginForm } from "../../components/Auth/Login.js"

export async function RenderLoginPage() {
  try {
    const isUserLogged = await CheckUserLoggedIn()
    console.log(isUserLogged)

    if (isUserLogged) {
      window.location.href = "/"
      RouterFunction()
    } else {
      ROOT.innerHTML = ""
      CONTAINER.innerHTML = ""
      Auth.innerHTML = ""
      NavbarNotLogged()

      const LoginForm = RenderLoginForm()

      Auth.appendChild(LoginForm)

      CONTAINER.appendChild(Auth)

      ROOT.appendChild(CONTAINER)

      const errorMsg = document.querySelector(".errorMsg")

      const registerForm = document.querySelector(".form")
      registerForm.addEventListener("submit", handleFormSubmit)

      function handleFormSubmit(e) {
        e.preventDefault() // Prevent the default form submission

        // Get form data
        const formData = new FormData(registerForm)

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
        fetch("http://localhost:8080/api/v1/users/login", {
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
          })
          .then(() => {
            window.location.href = "#/home"
            RouterFunction()
          })
          .catch((error) => {
            // Handle fetch errors
            console.log("Fetch error:", error)
          })
      }
    }
  } catch (error) {
    console.error("Error checking user login:", error)
    // Handle the error as needed
  }
}
