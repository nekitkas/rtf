import { NavbarNotLogged } from "../../components/Navbar/NavbarNotLogged.js";
import "../../styles/auth.css";
import { RouterFunction } from "../../router/Router.js";
import { CheckUserLoggedIn } from "../../helpers/ServerRequests.js";

export async function RenderLoginPage() {
  try {
    const isUserLogged = await CheckUserLoggedIn();
    console.log(isUserLogged);

    if (isUserLogged) {
      window.location.href = "#/home";
      RouterFunction();
    } else {
      const mainContainer = document.querySelector(".root");
      NavbarNotLogged();

      const main = document.createElement("main");
      main.className = "main";
      main.innerHTML = `
        <div class="container">
            <div class="auth">
                <form type="submit" action="/login" class="form" method="POST">
                    <h1 class="auth-title">SIGN-IN</h1>

                    <label>Email/Nickname</label>
                    <input type="text" placeholder="Email,Login" name="email" />

                    <label>PASSWORD</label>
                    <input type="password" name="password" placeholder="********" />

                    <button type="submit">SIGN-IN</button>

                    <p>
                        Don't have an account?
                        <a href="#/register">register</a>
                    </p>

                    <div class="errorMsg"></div>
                </form>
            </div>
        </div>
    `;

      mainContainer.appendChild(main);

      const registerForm = document.querySelector(".form");
      registerForm.addEventListener("submit", handleFormSubmit);

      function handleFormSubmit(e) {
        e.preventDefault(); // Prevent the default form submission

        // Get form data
        const formData = new FormData(registerForm);

        // Create an object from the form data
        const formDataObject = {};
        formData.forEach((value, key) => {
          // Exclude specific fields (e.g., 'confirm_password')
          if (key !== "confirm_password") {
            formDataObject[key] = value;
          }
        });

        // Log the form data object
        console.log("Form data:", formDataObject);

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
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            // Handle the response from the server
            console.log("Server response:", data);
            window.location.href = "#/home";
            RouterFunction();
          })
          .catch((error) => {
            // Handle fetch errors
            console.log("Fetch error:", error);
          });
      }
    }
  } catch (error) {
    console.error("Error checking user login:", error);
    // Handle the error as needed
  }
}
