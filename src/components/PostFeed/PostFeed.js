import React, { useState, useEffect } from "react"
import axios from 'axios'

import MiniPost from "../MiniPost/MiniPost"

import "./PostFeed.css"

function PostFeed(props) {
  const {allPosts, userId} = props
  const [postFeed, setPostFeed] = useState([])

  function getPosts(sortType) {
    setPostFeed([])
    if (allPosts === true) {
      axios.get("http://localhost:8000/posts/all_posts/", {
        params: { sort_type: sortType },
      })
      .then((response) => {
        setPostFeed(response.data)
      })
      .catch((err) => console.error('Error fetching post data:', err))
    } else {
      // Fetch the user's posts using the id
      axios.get("http://localhost:8000/profiles/profile_posts/", {
        params: { sort_type: sortType,
            user_id: userId },
      })
      .then((response) => {
        setPostFeed(response.data)
      })
      .catch(err => console.error("Error fetching post data for user:", err));
    }
  }

  function sortBy(sortType) {
    getPosts(sortType)
  }

  useEffect(() => { getPosts("recent")}, [])

  return (
    <div>
      <div class="dropdown">
        <button class="main-button dropdown-btn">Sort By</button>
        <div class="dropdown-content">
          <button className="main-button" onClick={() => sortBy("recent")}>Recently Post</button>
          <button className="main-button" onClick={() => sortBy("popular")}>Popular</button>
        </div>
      </div>
      <div className="feed-container">
          {postFeed.sort((a, b) => a.popular_like_count - b.popular_like_count).map(post => (
              <MiniPost
                  post_id={post.post_id}
                  username={post.username}
                  title={post.title}
                  like_count={post.popular_like_count || post.recent_like_count}
                  description={post.description}
                  date={post.creation_date}
              ></MiniPost>
          )).reverse()}
      </div> 
    </div>
      
  )
}

export default PostFeed