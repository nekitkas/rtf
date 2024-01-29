import { NavbarLogged } from "../../components/Navbar/NavbarLogged";
import "../../styles/createPostPage.css";
import addCategory from "../../assets/img/addCategory.svg";
import postImgIcon from "../../assets/img/postImgIcon.svg";
import closeIcon from "../../assets/img/close.svg";

export function RenderPostPage() {
  const rootContainer = document.querySelector(".root");
  rootContainer.innerHTML = "";
  NavbarLogged();

  const main = document.createElement("main");
  main.className = "main";

  main.innerHTML = `
<div class="container">
<div class="create-post-container">
  <h2 class="auth-title">Create Post</h2>
  <form
    type="submit"
    action="/create-post"
    class="create-post-form"
    method="POST"
  >
    <div class="post-title-container">
      <label>Post Title</label>

      <input type="title" placeholder="Post title" required maxlength="100" name="title" />
    </div>

    <div class="label-container" >
      <label>Post Content</label>
      <div class="editor">
      <div class="top">
          <ul class="bar">
              <li>
                  <button title="Underline" class="tool-btn" type="button" data-command="underline">
                      <span class="sp-f">
                          <u>U</u>
                      </span>
                  </button>
              </li>
              <li>
                  <button title="Negrito" class="tool-btn" type="button" data-command="bold">
                      <span class="sp-f">
                          <b style="font-weight: 800;">B</b>
                      </span>
                  </button>
              </li>
              <li>
                  <button title="Italico" class="tool-btn" type="button" data-command="italic">
                      <span class="sp-f">
                          <i style="font-weight: 600;">i</i>
                      </span>
                  </button>
              </li>
              <li>
                  <button title="Criar Link" class="tool-btn" type="button" data-command="createlink"   >
                      <span class="sp-f" style="font-weight: 800; font-family: poppins;">
                          <>
                      </span>
                  </button>
              </li>

              <li>
                  <button title="Linha" class="tool-btn" type="button" data-command="insertHorizontalRule">
                      <span class="sp-f">
                          <p>__</p>
                      </span>
                  </button>
              </li>

          </ul>
          <div><button class="clearOutput">Clear</button></div>
      </div>
      <div class="output" contenteditable="true" spellcheck="false">

      </div>
  </div>
      <div class="category-container"></div>
    </div>
    <div class="add-category-container">
    <div class ="add-category-sub">
    <input type="text" name="add-category" class="add-category-input"  placeholder="Add category" required maxlength="15"/>

    <button class="input-add-category-btn">Add</button></div>
      <button class="add-category-btn">Category <img class="category-item" src=${addCategory} alt="category-img"></button>
    </div>
    <div class="img-button-container">
    <input type="file" name="add-image" class="add-image-input">
      <button class="add-image-button">Image<img class="add-img-icon" src=${postImgIcon}  alt="addimg"></button>
    </div>

    <div class="image-preview-container"></div>

    <div class="add-post-button-container">
      <button class="add-post-button">Create</button>
    </div>
  </form>
</div>
</div>
`;

  rootContainer.appendChild(main);

  const addCategoryBtn = document.querySelector(".add-category-btn");
  addCategoryBtn.addEventListener("click",(e) => showCategoryInput(e));
  const addCategorySubDiv = document.querySelector(".add-category-sub");

  const categoryInputBtn = document.querySelector(".input-add-category-btn");
  categoryInputBtn.addEventListener("click",(e) => addCategoryToPost(e));

  const categoryInputValue = document.querySelector(".add-category-input");
  const categoryContainer = document.querySelector(".category-container");


  function showCategoryInput(e){
    e.preventDefault();
    addCategorySubDiv.classList.toggle("display-CategorySubDiv");

  }

  function addCategoryToPost(e) {
    e.preventDefault();
    const categoryValue = categoryInputValue.value.trim();

    const maxCategories = 5;
    if (categoryContainer.children.length >= maxCategories) {
      alert('You can only add up to 5 categories.');
      return;
    }

    if (categoryValue !== "") {
      const categoryElement = document.createElement("div");
      categoryElement.textContent = "/" + categoryValue
      categoryContainer.appendChild(categoryElement);

      categoryInputValue.value = "";
    }
  }

/////////
//ADD IMAGE

const imgBtn = document.querySelector(".add-image-button");
const imgInput = document.querySelector(".add-image-input");


imgBtn.addEventListener("click",(e) => {
  e.preventDefault();
  imgInput.click();
});

imgInput.addEventListener("change", (e) => changeInputHandler(e));



function changeInputHandler(e) {
console.log(e.target.files);
const file = e.target.files[0]
if(!file.type.match('image')){
  alert('File must be an image.');
return
}

const reader = new FileReader();

reader.onload = (e) => {
  const imgPreviewContainer = document.querySelector(".image-preview-container");

  // Check if an existing preview is present
  const existingPreview = document.querySelector(".image-preview-wrapper");

  // If an existing preview is found, remove it
  if (existingPreview) {
    existingPreview.remove();
  }

  // Create a wrapper div for the image and close button
  const wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add("image-preview-wrapper");

  // Create the preview image
  const previewImg = document.createElement("img");
  previewImg.src = e.target.result;
  previewImg.classList.add("image-preview");

  // Create the close button
  const closePostImg = document.createElement("img");
  closePostImg.src = closeIcon;
  closePostImg.classList.add("close-post-img");

  // Append the close button and preview image to the wrapper
  wrapperDiv.appendChild(previewImg);
  wrapperDiv.appendChild(closePostImg);

  // Append the wrapper to the preview container
  imgPreviewContainer.appendChild(wrapperDiv);

  closePostImg.addEventListener("click", () => {
    wrapperDiv.remove();
  });
};


reader.readAsDataURL(file);


}

const sendPostDataBtn = document.querySelector(".add-post-button");
sendPostDataBtn.addEventListener("click", (e) => {
  e.preventDefault()
  const postTitleInput = document.querySelector('input[name="title"]');
  const postContentTextarea = document.querySelector('.output');
  const postCategories = Array.from(document.querySelector('.category-container').children).map(category => category.textContent);
  const postImageWrapper = document.querySelector('.image-preview-wrapper img');

  const title = postTitleInput.value;
  const content = postContentTextarea.value;
  const categories = postCategories;
  const image = postImageWrapper ? postImageWrapper.src : null;

  sendPostData(title, content, categories, image);
})

///////text editor
for (let btn of document.getElementsByClassName('tool-btn')) {
  btn.addEventListener('click', () => {
    console.log(btn.type);
      if(btn.title === "Underline" || btn.title === "Negrito" || btn.title === "Italico" ){
        btn.classList.toggle("active-btn");
      }

      let cmd = btn.dataset['command'];
      if(cmd === 'createlink') {
          let url = prompt("Enter the link here: ", "http:\/\/");
          document.execCommand(cmd, false, url);
      } else {
          document.execCommand(cmd, false, null);
      }
  })
}





const clearOutputBtn = document.querySelector(".clearOutput");
clearOutputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const output = document.querySelector('.output');
  output.innerHTML = "";
});



}




async function sendPostData() {
  // Get the content from the editable div
  const postContentDiv = document.querySelector('.output');
  const content = postContentDiv.innerHTML;

  // Get other input values (title, categories, image) as needed
  const postTitleInput = document.querySelector('input[name="title"]');
  const postCategories = Array.from(document.querySelector('.category-container').children).map(category => category.textContent);
  const postImageWrapper = document.querySelector('.image-preview-wrapper img');

  const title = postTitleInput.value;
  const categories = postCategories;
  const image = postImageWrapper ? postImageWrapper.src : null;

  // Prepare the request body
  const requestBody = {
    post: {
      title: title,
      content: content,
      image_url: image,
    },
    categories: categories.map(categoryName => ({
      name: categoryName,
      description: `Description for ${categoryName}`,
    })),
  };

  console.log("Request Body:", requestBody);

  try {
    // Make the fetch request
    const response = await fetch("http://localhost:8080/api/v1/jwt/posts/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Server response:", data);
    } else {
      console.error("Server error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
