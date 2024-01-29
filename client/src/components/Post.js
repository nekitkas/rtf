

export function RenderPost (data){

    const {category,title,content,image_url,comment_count} = data
    const post = document.createElement('div')
    post.classList.add("post")

    const postHeader = document.createElement('div')
    postHeader.classList.add("post-header")

console.log(data);


const postHeaderTitle = document.createElement('div')
postHeaderTitle.classList.add("post-header-title")
postHeaderTitle.textContent = title

postHeader.appendChild(postHeaderTitle)



const postBody = document.createElement('div')
    postBody.classList.add("post-body")
    const postBodyText = document.createElement('div')
    postBodyText.classList.add("post-body-text")
    postBodyText.textContent = content
    postBody.appendChild(postBodyText)
    if(image_url){
        const postBodyImg = document.createElement('img')
        postBodyImg.src = image_url
        postBodyImg.alt = "post-img"
        postBodyImg.classList.add("post-body-img")
        postBody.appendChild(postBodyImg)
    }






    // if(category){
    //     const postHeaderCategory = document.createElement('p')
    //     postHeaderCategory.classList.add("post-header-category")
    //     postHeaderCategory.textContent = category
    //     postHeader.appendChild(postHeaderCategory)
    // }





    const postFooter = document.createElement('div')
    postFooter.classList.add("post-footer")
    const postFooterCommentsAmount = document.createElement('div')
    postFooterCommentsAmount.classList.add("post-footer-commentsAmount")
    postFooterCommentsAmount.innerHTML = `${comment_count} <span>comments</span>`
    postFooter.appendChild(postFooterCommentsAmount)

    post.appendChild(postHeader)
    post.appendChild(postBody)
    post.appendChild(postFooter)
console.log(post)
    return post

}



