import { Navbar } from "../../components/Navbar/Navbar.js";
import "../../styles/style.css"
import "../../styles/post.css"
import {RenderPost} from "../../components/Post";
import {PostDataTest} from "../../components/postDataTest";

export const Container = document.createElement("div")
export const PostFeed = document.createElement("div")
PostFeed.classList.add("post-feed")


export function RenderHomePage(){
   const rootContainer = document.querySelector('.root');
    Navbar()


    Container.classList.add("container")
    rootContainer.append(Container)

    const post = RenderPost(PostDataTest)
    const post2 = RenderPost(PostDataTest)

    PostFeed.appendChild(post)
    PostFeed.appendChild(post2)


 Container.appendChild(PostFeed)

    


}