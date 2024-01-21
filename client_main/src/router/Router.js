import { RenderHomePage } from "../pages/home/Home.js";
import { RenderLoginPage } from "../pages/login/Login.js";
import { RenderRegisterPage } from "../pages/register/register.js";

export const RouterFunction = () => {
  const path = window.location.hash.slice(1);
  console.log("Current Path:", path);

  if (path.startsWith("/post/")) {
    const postId = path.split("/")[2];
    console.log("Rendering Post Page for Post ID:", postId);
    RenderPostPage(postId);
  } else {
    switch (path) {
      case "/home":
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
