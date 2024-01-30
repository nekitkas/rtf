import { NavbarLogged } from "../../components/Navbar/NavbarLogged.js";
import "../../styles/style.css";
import "../../styles/post.css";
import "../../styles/messenger.css";
import "../../styles/chat.css";
import { RenderPost } from "../../components/Post";
import { PostDataTest } from "../../components/postDataTest";
import { RenderMessenger } from "../../components/Messenger";
import searchSvg from "../../assets/img//search.svg";
import arrowSvg from "../../assets/img/arrow.svg";
import { GetPosts } from "../../helpers/ServerRequests.js";

const Messenger = RenderMessenger();

export function RenderHomePage() {
  const rootContainer = document.querySelector(".root");
  rootContainer.innerHTML = "";
  NavbarLogged();



  const Container = document.createElement("div");
  const PostFeed = document.createElement("div");
  PostFeed.classList.add("post-feed");

  Container.classList.add("container");
  rootContainer.append(Container);

  // Call the fetchData function
  fetchData(PostFeed);
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("info-div");
  infoDiv.innerHTML = `
    <div class="input-select-block">
    <div class="input-block">
      <input type="text" class="search_input" placeholder="Search" maxlength="15" />
      <img src=${searchSvg} alt="" class="search-icon" />
    </div>
    <div class="select-block">
      <p>Category</p>
      <img class="select-arrow"  src="${arrowSvg}" alt="arrow">
        <div class="select-dropdown">
            <p>Fun</p>
            <p>Sport</p>
            <p>Cars</p>
            <p>Politics</p>
            </div>
    </div>

  </div>
</div>`;
  rootContainer.appendChild(infoDiv);

  Container.appendChild(PostFeed);

  rootContainer.appendChild(Messenger);

  const selectBlock = document.querySelector(".select-block");
  if (selectBlock) {
    selectBlock.addEventListener("click", displayCategoryModal);
    const dropdown = document.querySelector(".select-dropdown");
    const selectArrow = document.querySelector(".select-arrow");

    function displayCategoryModal() {
      dropdown.classList.toggle("showSelectModal");
      selectArrow.classList.toggle("select-arrow-rotate");
    }
  }
}


async function fetchData(PostFeed) {
  try {
    const postsData = await GetPosts();

    if (postsData) {
      // Do something with the data

      postsData.forEach(post => {

        PostFeed.appendChild(RenderPost(post))
      });
    } else {
      // Handle case when response is not OK
      console.log("Error: Response not OK");
    }
  } catch (error) {
    // Handle errors that occurred during the fetch
    console.error("Error during fetch:", error);
  }
}
