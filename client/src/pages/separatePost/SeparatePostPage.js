import { CONTAINER, ROOT } from "../.."
import { NavbarLogged } from "../../components/Navbar/NavbarLogged"
import { GLOBAL_URL } from "../../config"
import { SinglePostRequest } from "../../helpers/ServerRequests"
import "../../styles/separatePost.css"
import {
  CreateCommentContainer,
  CreatePostUi,
  createCommentsContainer,
} from "./PostCreateUi"

<<<<<<< HEAD
export async function Post(postId) {
  ROOT.innerHTML = "";
  CONTAINER.innerHTML = "";
  await NavbarLogged();
  ROOT.append(CONTAINER);

  console.log("POST ID bla bla" ,postId["id"])
  postId = postId["id"]
  const apiUrl = GLOBAL_URL + `/api/v1/jwt/posts/${postId}`;
=======
export async function RenderSeparatePostPage(postId) {
  ROOT.innerHTML = ""
  CONTAINER.innerHTML = ""
  await NavbarLogged()
  ROOT.append(CONTAINER)
>>>>>>> d95110b2eec552b02634b60f1f320e59ed730f25

  const apiUrl = GLOBAL_URL + `/api/v1/jwt/posts/${postId}`

  SinglePostRequest(apiUrl, "GET")
    .then((data) => {
<<<<<<< HEAD
      const postData = data.data.post;
=======
      const pagePost = CreatePostUi(data, postId)
      const commentContainer = CreateCommentContainer(postId)

      CONTAINER.appendChild(pagePost)
      CONTAINER.appendChild(commentContainer)
>>>>>>> d95110b2eec552b02634b60f1f320e59ed730f25

      if (data.data.comments) {
        const commentsContainer = createCommentsContainer(data)

        CONTAINER.appendChild(commentsContainer)
      }

      //function to send request to create comment
    })
    .catch((error) => {
      console.error("Error in fetch operation:", error)
    })
}
