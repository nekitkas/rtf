import { Navbar } from "../components/Navbar.js"
import "../styles/style.css"
import "../styles/post.css"
import "../styles/messenger.css"
import "../styles/chat.css"
import "../styles/users.css"
import { RenderPost } from "../components/Post"

import {
  GetAllUsers,
  GetPosts,
  SinglePostRequest,
} from "../helpers/ServerRequests.js"
import { CONTAINER, ROOT, Socket } from "../index.js"
import { RenderPostFeed } from "../components/PostFeed.js"
import { RenderFilter } from "../components/Filter.js"
import { router } from "../router/Router.js"
import { UserList } from "../components/UserList"
import { OpenMessengers, Throttle } from "../components/Messenger.js"
import { CheckPosition, PostsLoadedIndex, setPostsLoadedIndex } from "../helpers/LazyLoading.js"

const usersContainer = document.createElement("div")

usersContainer.className = "users-container"

export async function Home() {
  ROOT.innerHTML = ""
  CONTAINER.innerHTML = ""

  usersContainer.innerHTML = ""
  await Navbar()

  OpenMessengers.length = 0;
  const PostFeed = RenderPostFeed()
  ROOT.append(CONTAINER)

  fetchData(PostFeed)

  fetchUsers(usersContainer)

  const Filter = RenderFilter()

  ROOT.appendChild(Filter)
  CONTAINER.appendChild(PostFeed)

  //check for scrollin to lazy load posts
  function checkScroll() {
    window.addEventListener('scroll', Throttle(CheckPosition, 250))
    window.addEventListener('resize', Throttle(CheckPosition, 250))
  }
  checkScroll()

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
    if (postsData) {
      postsData.forEach((post) => {
        const postLink = ProcessPostData(post, router);
        PostFeed.appendChild(postLink)})
    } else {
      // Handle case when response is not OK
      console.log("Error: Response not OK")
    }
  } catch (error) {
    // Handle errors that occurred during the fetch
    console.error("Error during fetch:", error)
  }
}

async function fetchUsers(usersContainer) {
  try {
    const usersData = await GetAllUsers()
    if (usersData) {
      usersContainer.appendChild(UserList(usersData))

      CONTAINER.appendChild(usersContainer)
    }
  } catch (error) {
    console.error("Error during fetch:", error)
  }
}


//create a link and calls function to create post out of provided data
export function ProcessPostData(post) {
  const postLink = document.createElement("div");

  postLink.addEventListener("click", () => {
    history.pushState({}, "", `post/${post.id}`);
   setPostsLoadedIndex(0);
    router();
  });

  postLink.classList.add("post-link");

  if (post.categories) {
    postLink.appendChild(RenderPost(post, post.nickname));
  } else {
    postLink.appendChild(RenderPost(post));
  }

  return postLink;
}
