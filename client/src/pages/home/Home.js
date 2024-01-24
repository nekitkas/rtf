import { Navbar } from "../../components/Navbar/Navbar.js";
import "../../styles/style.css"
import "../../styles/post.css"
import "../../styles/messenger.css"
import "../../styles/chat.css"
import {RenderPost} from "../../components/Post";
import {PostDataTest} from "../../components/postDataTest";
import {RenderMessenger} from "../../components/Messenger";

export const Container = document.createElement("div")
export const PostFeed = document.createElement("div")
PostFeed.classList.add("post-feed")


const Messenger = RenderMessenger()


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

 rootContainer.appendChild(Messenger)

    


}