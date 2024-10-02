import { useState } from "react"
import MiniPost from "./MiniPost"

import "./PostFeed.css"

function PostFeed() {
    const [postFeed, setPostFeed] = useState([
        {
          post_id: 1,
          user: "Joe Roe",
          media: "",
          title: "This is a title.",
          text: "A description goes here."
          
        },
        {
          post_id: 2,
          user: "Joe Roe",
          media: "",
          title: "This is a title.",
          text: "A description goes here2."
        },
        {
          post_id: 3,
          user: "Joe Roe",
          media: "",
          title: "This is a title.",
          text: "A description goes here3."
        },
        {
            post_id: 4,
            user: "Joe Roe",
            media: "",
            title: "This is a title.",
            text: "A description goes here4."
          },
    ])

    function createPostFeed() {
        //use API
    }
    createPostFeed()
    return (
        <div className="feed-container">
            {postFeed.map(post => (
                <MiniPost
                    post_id={post.post_id}
                    user={post.user}
                    media={post.media}
                    title={post.title}
                    description={post.text}
                ></MiniPost>
            ))}
        </div> 
    )
}

export default PostFeed