import { useState } from "react"
import axios from 'axios';
import Post from "./Post"

import "./PostFeed.css"

function PostFeed() {
  const [postFeed, setPostFeed] = useState([])
  // const [postFeed, setPostFeed] = useState([
  //     {
  //       post_id: 1,
  //       user: "Joe Roe",
  //       media: "",
  //       title: "This is a title.",
  //       text: "A description goes here."
        
  //     },
  //     {
  //       post_id: 2,
  //       user: "Joe Roe",
  //       media: "",
  //       title: "This is a title.",
  //       text: "A description goes here2."
  //     },
  //     {
  //       post_id: 3,
  //       user: "Joe Roe",
  //       media: "",
  //       title: "This is a title.",
  //       text: "A description goes here3."
  //     },
  //     {
  //         post_id: 4,
  //         user: "Joe Roe",
  //         media: "",
  //         title: "This is a title.",
  //         text: "A description goes here4."
  //       },
  // ])

  const fetchPostData = () => {
    axios.get("http://3.142.185.208:8000/api/posts/")  // Update with your Django API URL
    .then((response) => {
      setPostFeed(response.data);  // Store the API response in the state
    })
    .catch((error) => {
        console.error('Error fetching post data:', error);
    });
  };
  fetchPostData()

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