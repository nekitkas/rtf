import { CheckUserLoggedIn } from "../helpers/ServerRequests.js";
import { RenderHomePage } from "../pages/home/Home.js";
import { RenderLoginPage } from "../pages/login/Login.js";
import { RenderRegisterPage } from "../pages/register/Register.js";

export const RouterFunction = async () => {
  const path = window.location.hash.slice(1);
  console.log("Current Path:", path);

  if (path.startsWith("/post/")) {
    const postId = path.split("/")[2];
    console.log("Rendering Post Page for Post ID:", postId);
    RenderPostPage(postId);
  } else {
    try {
      const userLoggedIn = await CheckUserLoggedIn();

      switch (path) {
        case "/home":
          if (!userLoggedIn) {
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
          if (!userLoggedIn) {
            // If the user is not authenticated, redirect to the Login Page
            console.log("User not logged in, redirecting to Login Page");
            RenderLoginPage();
            return;
          }
          console.log("Unknown Path, Rendering Home Page");
          RenderHomePage();
      }
    } catch (error) {
      console.error("Error checking user login:", error);
    }
  }
};














  // try {
  //   const userCookie = getCookie("session");


  //   console.log("User Cookie:", userCookie);
  //   return userCookie ? true : false;
  // } catch (error) {
  //   console.error("Error checking user login:", error);
  //   return false;
  // }


// Function to retrieve the value of a cookie by name
// const getCookie = (cookieName) => {
//   const cookies = document.cookie.split("; ");
//   for (const cookie of cookies) {
//     const [name, value] = cookie.split("=");
//     if (name.trim() === cookieName) {
//       return value;
//     }
//   }
//   return null;
// };
