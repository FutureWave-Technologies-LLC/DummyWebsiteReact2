import { useState } from "react"
import axios from 'axios';
import Post from "./Post"

import "./PostFeed.css"

function PostFeed() {
  const [hadFetchedData, setFetchedData] = useState(false)
  const [postFeed, setPostFeed] = useState([])

  const fetchPostData = () => {
    axios.get("http://3.142.185.208:8000/api/posts/")  // Update with your Django API URL
    .then((response) => {
      setPostFeed(response.data);  // Store the API response in the state
    })
    .catch((error) => {
        console.error('Error fetching post data:', error);
    });
  };
  //Fetch data once; prevents multiple API calls
  if (hadFetchedData == false) {
    setFetchedData(true)
    fetchPostData()
  }
  

  return (
      <div className="feed-container">
          {postFeed.map(post => (
              <Post
                  is_mini={true}
                  post_id={post.post_id}
                  user={post.username}
                  media={post.media}
                  title={post.title}
                  description={post.text}
              ></Post>
          ))}
      </div> 
  )
}

export default PostFeed