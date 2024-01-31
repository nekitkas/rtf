import { CheckUserLoggedIn } from "../helpers/ServerRequests.js"
import { RenderHomePage } from "../pages/home/Home.js"
import { RenderLoginPage } from "../pages/login/Login.js"
import { RenderPostPage } from "../pages/cratePost/CreatePostPage.js"
import { RenderProfilePage } from "../pages/profile/ProfilePage.js"
import { RenderRegisterPage } from "../pages/register/Register.js"
import { RenderSeparatePostPage } from "../pages/separatePost/SeparatePostPage.js"

export const RouterFunction = async () => {
  const path = location.pathname

  console.log("Current Path:", path)

  if (path.startsWith("/post/")) {
    const postId = path.split("/")[2]
    console.log("Rendering Post Page for Post ID:", postId)
    RenderSeparatePostPage(postId)
  } else {
    try {
      const userLoggedIn = await CheckUserLoggedIn()

      switch (path) {
        case "/":
          if (!userLoggedIn) {
            RenderLoginPage()
            return
          }
          RenderHomePage()
          break
        case "/login":
          RenderLoginPage()
          break
        case "/register":
          RenderRegisterPage()
          break
        case "/create-post":
          if (!userLoggedIn) {
            RenderLoginPage()
            return
          }
          RenderPostPage()
          break
        case "/profile":
          if (!userLoggedIn) {
            RenderLoginPage()
            return
          }

          RenderProfilePage()
          break
        default:
          if (!userLoggedIn) {
            RenderLoginPage()
            return
          }
          RenderHomePage()
      }
    } catch (error) {
      console.error("Error checking user login:", error)
    }
  }
}

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
