import React, { useState, useEffect } from "react"
import axios from 'axios'

import Post from "./Post"

import "../css/components/PostFeed.css"

function PostFeed() {
  const [postFeed, setPostFeed] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8000/posts/all_posts/")  
    .then((response) => {
      setPostFeed(response.data)
    })
    .catch((error) => {
        console.error('Error fetching post data:', error);
    })
  }, [])

  return (
      <div className="feed-container">
          {postFeed.map(post => (
              <Post
                  is_mini={true}
                  post_id={post.post_id}
                  username={post.username}
                  title={post.title}
                  description={post.description}
              ></Post>
          )).reverse()}
      </div> 
  )
}

export default PostFeed