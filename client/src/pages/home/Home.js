import { NavbarLogged } from "../../components/Navbar/NavbarLogged.js"
import "../../styles/style.css"
import "../../styles/post.css"
import "../../styles/messenger.css"
import "../../styles/chat.css"
import { RenderPost } from "../../components/Post"
import { RenderMessenger } from "../../components/Messenger"
import { GetPosts } from "../../helpers/ServerRequests.js"
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
 // Пример использования:
const apiUrl = 'http://localhost:8080/api/v1/jwt/posts/findById';
const requestData = {
  post_id: 'c7a545fa-66d5-42be-b881-7c9e7985f1a7',
};

sendRequest(apiUrl, 'POST', requestData)
  .then(data => {
    // Обработка данных, полученных от сервера
    console.log(data);
  })
  .catch(error => {
    // Обработка ошибок
    console.error('Error in fetch operation:', error);
  });
}

async function fetchData(PostFeed) {
  try {
    const postsData = await GetPosts()
    // console.log(postsData.posts[0]);
    if (postsData) {
      // Do something with the data
      postsData.posts.forEach((post) => {
        console.log(post.post)
        if (post.categories) {
          PostFeed.appendChild(RenderPost(post.post, post.categories))
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


//////////////////////////////
//check later
// function sendRequest(url, method, body = null, headers = {}) {
//   const options = {
//     method,
//     headers: {
//       'Content-Type': 'application/json',
//       ...headers,
//     },
//     body: body ? JSON.stringify(body) : null,
//     credentials:"include"
//   };

//   return fetch(url, options)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Network response was not ok: ${response.status}`);
//       }
//       return response.json();
//     })
//     .catch(error => {
//       console.error('Error during fetch operation:', error);
//       throw error;
//     });
// }

