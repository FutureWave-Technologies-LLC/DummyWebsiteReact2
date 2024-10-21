import React, { useState, useEffect } from "react"
import axios from 'axios'

import Post from "./Post"

import "./PostFeed.css"

function PostFeed() {
  const [postFeed, setPostFeed] = useState([])

  useEffect(() => {
    axios.get("http://3.142.185.208:8000/api/posts/")  
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
                  media={post.media}
                  title={post.title}
                  description={post.text}
              ></Post>
          )).reverse()}
      </div> 
  )
}

export default PostFeed