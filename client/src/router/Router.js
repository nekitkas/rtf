import { RenderHomePage } from "../pages/home/Home.js";
import { RenderLoginPage } from "../pages/login/Login.js";
import { RenderRegisterPage } from "../pages/register/Register.js";

export const RouterFunction = () => {
  const path = window.location.hash.slice(1);
  console.log("Current Path:", path);

  // Check for the presence of a cookie to determine user authentication


  if (path.startsWith("/post/")) {
    const postId = path.split("/")[2];
    console.log("Rendering Post Page for Post ID:", postId);
    RenderPostPage(postId);
  } else {
    switch (path) {
      case "/home":
        const isUserLoggedIn = checkUserLoggedIn(); // Implement the checkUserLoggedIn function

        if (!isUserLoggedIn) {
          // If the user is not authenticated, redirect to the Login Page
          console.log("User not logged in, redirecting to Login Page");
          RenderLoginPage();
          return;
        }
        console.log("Rendering Home Page");
        RenderHomePage();
        break;
      case "/login":
        console.log("Rendering Login Page");
        RenderLoginPage();
        break;
      case "/register":
        console.log("Rendering Register Page");
        RenderRegisterPage();
        break;
      default:
        console.log("Unknown Path, Rendering Home Page");
        RenderHomePage();
    }
  }
};

// Function to check the presence of a cookie (pseudocode, implement according to your logic)
const checkUserLoggedIn = () => {
  const userCookie = getCookie("your_user_cookie_name"); // Implement the getCookie function
  return !!userCookie; // Returns true if the cookie is present, otherwise false
};

// Function to retrieve the value of a cookie by name (pseudocode, implement according to your logic)
const getCookie = (cookieName) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === cookieName) {
      return value;
    }
  }
  return null;
};
