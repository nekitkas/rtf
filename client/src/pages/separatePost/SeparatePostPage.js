import { CONTAINER, ROOT } from "../..";
import { CreateCommentComponent } from "../../components/Comment";
import { Navbar } from "../../components/Navbar";
import { SinglePostRequest } from "../../helpers/ServerRequests";
import { RouterFunction } from "../../router/Router";
import "../../styles/separatePost.css";

export async function RenderSeparatePostPage(postId) {
  ROOT.innerHTML = "";
  CONTAINER.innerHTML = "";
  await Navbar();
  ROOT.append(CONTAINER);

 
  const apiUrl = "http://localhost:8080/api/v1/jwt/posts/findById";
  const requestData = {
    post_id: postId,
  };

  SinglePostRequest(apiUrl, "POST", requestData)
    .then((data) => {


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
      if (postData.image_url) {
        const img = document.createElement("img");
        img.src = postData.image_url;
        img.alt = "";
        postPageBodyImg.appendChild(img);
      }

      postPagePostBody.appendChild(postPageBodyText);
      postPagePostBody.appendChild(postPageBodyImg);

      const postPagePostFooter = document.createElement("div");
      postPagePostFooter.className = "postPagePostFooter";

      if (postData.categories) {
        const categoriesDiv = document.createElement("div");
        data.categories.forEach(
          (category) => (categoriesDiv.textContent += category.name + " ")
        );
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


      // Create the comment container elements
      const commentContainer = document.createElement("div");
      commentContainer.className = "createCommentContainer";

      const textarea = document.createElement("textarea");
      textarea.placeholder = "Enter your comment text";
      textarea.cols = "30";
      textarea.rows = "4";

      const createCommentbutton = document.createElement("button");
      createCommentbutton.textContent = "Send";

      // Append textarea and button to the comment container
      commentContainer.appendChild(textarea);
      commentContainer.appendChild(createCommentbutton);

















      // Append the post details to the CONTAINER
      CONTAINER.appendChild(pagePost);

      const commentsContainer = document.createElement("div");
      commentsContainer.className = "commentsContainer";

      if(data.comments){
        const commentDiv = document.createElement("div");
        commentDiv.className = "comment";
        data.comments.forEach(
          (comment) => commentsContainer.appendChild(CreateCommentComponent(comment.comment.datetime, comment.comment.content, comment.comment.user_id,commentDiv))
        );

        CONTAINER.appendChild(commentsContainer)

      }
      CONTAINER.appendChild(commentContainer);


      //function to send request to delete post
      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();


        const requestData = {
          post_id: postId,
        };

        SinglePostRequest(
          "http://localhost:8080/api/v1/jwt/posts/delete",
          "DELETE",
          requestData,
          {
            "Content-Type": "application/json",
          }
        )
          .then(() => {
            window.location.href = "/home";
            RouterFunction();
          })
          .catch((error) => {
            console.error("Error in fetch operation:", error);
          });
      });


       //function to send request to create comment
    createCommentbutton.addEventListener("click", async () => {
        const commentText = textarea.value.trim();

        if (commentText !== "") {
            const createCommentUrl = "http://localhost:8080/api/v1/jwt/comments/create";

            const commentData = {
                post_id: postId,
                content: commentText,
            };

            try {
                const response = await fetch(createCommentUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(commentData),
                    credentials: "include",
                });

                if (response.ok) {
                    console.log("Comment created successfully");
                    // You may want to handle success, update UI, etc.
                } else {
                    console.error("Failed to create comment");
                    // Handle the error, display a message, etc.
                }
            } catch (error) {
                console.error("Error in fetch operation:", error);
                // Handle network error, etc.
            }
        } else {
            console.log("Comment text is empty");
            // Handle the case where the comment text is empty
        }
    })
    })
    .catch((error) => {
      console.error("Error in fetch operation:", error);
    });
}
