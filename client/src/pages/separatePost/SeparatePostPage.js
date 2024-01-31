import { CONTAINER, ROOT } from "../..";
import { NavbarLogged } from "../../components/Navbar/NavbarLogged";
import { SinglePostRequest } from "../../helpers/ServerRequests";
import { RouterFunction } from "../../router/Router";
import "../../styles/separatePost.css";

export function RenderSeparatePostPage(postId) {
  ROOT.innerHTML = "";
  CONTAINER.innerHTML = "";
  NavbarLogged();
  ROOT.append(CONTAINER);

  console.log("this is post page");
  console.log(postId);

  const apiUrl = "http://localhost:8080/api/v1/jwt/posts/findById";
  const requestData = {
    post_id: postId,
  };

  SinglePostRequest(apiUrl, "POST", requestData)
    .then((data) => {
      console.log("One post:", data);

      const postData = data.post;


      const { title, content, timestamp, nickname } = postData;

      // Create elements using the received data
      const pagePost = document.createElement("div");
      pagePost.className = "pagePost";

      const postPagePostHeader = document.createElement("div");
      postPagePostHeader.className = "postPagePostHeader";

      const authorHeader = document.createElement("h5");
      authorHeader.textContent = `Author: ${nickname}`;

      const titleHeader = document.createElement("h2");
      titleHeader.textContent = title;

      postPagePostHeader.appendChild(authorHeader);
      postPagePostHeader.appendChild(titleHeader);

      const postPagePostBody = document.createElement("div");
      postPagePostBody.className = "postPagePostBody";

      const postPageBodyText = document.createElement("div");
      postPageBodyText.className = "postPageBodyText";
      postPageBodyText.textContent = content;

      const postPageBodyImg = document.createElement("div");
      postPageBodyImg.className = "postPageBodyImg";

      // Assuming your API returns an image URL
   if(postData.image_url){
    const img = document.createElement("img");
    img.src = postData.image_url;
    img.alt = "";
    postPageBodyImg.appendChild(img);
   }

      postPagePostBody.appendChild(postPageBodyText);
      postPagePostBody.appendChild(postPageBodyImg);

      const postPagePostFooter = document.createElement("div");
      postPagePostFooter.className = "postPagePostFooter";

  if(postData.categories){
    const categoriesDiv = document.createElement("div");
    data.categories.forEach(category =>  categoriesDiv.textContent += category.name + " ")
    postPagePostFooter.appendChild(categoriesDiv);
  }

      const timeDiv = document.createElement("div");
      timeDiv.className = "time";

      const dateObject = new Date(timestamp);


      const formattedDate = dateObject.toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      timeDiv.textContent = formattedDate;

      postPagePostFooter.appendChild(timeDiv);

      pagePost.appendChild(postPagePostHeader);
      pagePost.appendChild(postPagePostBody);
      pagePost.appendChild(postPagePostFooter);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete post";
      deleteBtn.className = "PostDeleteBtn";
      pagePost.appendChild(deleteBtn);
      // Append the post details to the CONTAINER
      CONTAINER.appendChild(pagePost);


      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(postId);

        const requestData = {
          post_id: postId
        };

        SinglePostRequest("http://localhost:8080/api/v1/jwt/posts/delete", "DELETE", requestData, {
          "Content-Type": "application/json"
        })
        .then(() => {
            window.location.href = "/home";
            RouterFunction();
        })
        .catch((error) => {
          console.error("Error in fetch operation:", error);
        });
      });







    })
    .catch((error) => {
      console.error("Error in fetch operation:", error);
    });
}
