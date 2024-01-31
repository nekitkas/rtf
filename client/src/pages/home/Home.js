import { NavbarLogged } from "../../components/Navbar/NavbarLogged.js"
import "../../styles/style.css"
import "../../styles/post.css"
import "../../styles/messenger.css"
import "../../styles/chat.css"
import { RenderPost } from "../../components/Post"
import { RenderMessenger } from "../../components/Messenger"
import { GetPosts, SinglePostRequest } from "../../helpers/ServerRequests.js"
import { CONTAINER, ROOT } from "../../index.js"
import { RenderPostFeed } from "../../components/PostFeed.js"
import { RenderFilter } from "../../components/Filter.js"

const Messenger = RenderMessenger()

export function RenderHomePage() {
  ROOT.innerHTML = ""
  CONTAINER.innerHTML = ""
  NavbarLogged()

  const PostFeed = RenderPostFeed()

  ROOT.append(CONTAINER)

  // Call the fetchData function
  fetchData(PostFeed)

  const Filter = RenderFilter()

  ROOT.appendChild(Filter)
  CONTAINER.appendChild(PostFeed)
  ROOT.appendChild(Messenger)

  const selectBlock = document.querySelector(".select-block")
  if (selectBlock) {
    selectBlock.addEventListener("click", displayCategoryModal)
    const dropdown = document.querySelector(".select-dropdown")
    const selectArrow = document.querySelector(".select-arrow")

    function displayCategoryModal() {
      dropdown.classList.toggle("showSelectModal")
      selectArrow.classList.toggle("select-arrow-rotate")
    }
  }


}

async function fetchData(PostFeed) {
  try {
    const postsData = await GetPosts()
    // console.log(postsData.posts[0]);
    if (postsData) {
      // Do something with the data
      postsData.posts.forEach((post) => {
        const postLink = document.createElement("a");
        postLink.href = `post/${post.post.id}`;
        postLink.classList.add("post-link");
        if (post.categories) {

          postLink.appendChild((RenderPost(post.post, post.categories)))
          PostFeed.appendChild(postLink);

        }else{
          postLink.appendChild((RenderPost(post.post)))
          PostFeed.appendChild(postLink);
        }

      })
      // postsData.forEach(post => {

      // });
    } else {
      // Handle case when response is not OK
      console.log("Error: Response not OK")
    }
  } catch (error) {
    // Handle errors that occurred during the fetch
    console.error("Error during fetch:", error)
  }
}


