const root = document.querySelector(".root")
const container = document.createElement("div")
const PostFeed = document.createElement("div")


container.classList.add('container')

PostFeed.classList.add('post-feed')

container.appendChild(PostFeed)

root.appendChild(container)




export {RenderPostFeed}


