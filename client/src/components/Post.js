





export function RenderPost (data){

    const {category,title,text,imageURL,commentCounter} = data



    const post = document.createElement('div')
    post.classList.add("post")

    const postHeader = document.createElement('div')
    postHeader.classList.add("post-header")

    const postHeaderCategory = document.createElement('p')
    postHeaderCategory.classList.add("post-header-category")
    postHeaderCategory.textContent = category


    const postHeaderTitle = document.createElement('div')
    postHeaderTitle.classList.add("post-header-title")
    postHeaderTitle.textContent = title
    postHeader.appendChild(postHeaderCategory)
    postHeader.appendChild(postHeaderTitle)

    const postBody = document.createElement('div')
    postBody.classList.add("post-body")
    const postBodyText = document.createElement('div')
    postBodyText.classList.add("post-body-text")
    postBodyText.textContent = text
    const postBodyImg = document.createElement('img')
    postBodyImg.src = imageURL
    postBodyImg.alt = "post-img"
    postBodyImg.classList.add("post-body-img")
    postBody.appendChild(postBodyText)
    postBody.appendChild(postBodyImg)

    const postFooter = document.createElement('div')
    postFooter.classList.add("post-footer")
    const postFooterCommentsAmount = document.createElement('div')
    postFooterCommentsAmount.classList.add("post-footer-commentsAmount")
    postFooterCommentsAmount.innerHTML = `${commentCounter} <span>comments</span>`
    postFooter.appendChild(postFooterCommentsAmount)

    post.appendChild(postHeader)
    post.appendChild(postBody)
    post.appendChild(postFooter)

    return post

}



