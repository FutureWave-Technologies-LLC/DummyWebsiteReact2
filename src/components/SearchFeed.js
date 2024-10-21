import { useState } from "react"
import axios from 'axios';
import Post from "./Post"

import "./PostFeed.css"

function SearchFeed() {
  var [hasFetchedData, setHasFetchedData] = useState(false)
  const [searchFeed, setSearchFeed] = useState([])

  const fetchPostData = () => {
    //Fetch data once; don't call API multiple times
    if (hasFetchedData == false) {
      setHasFetchedData(true)
      axios.get("http://3.142.185.208:8000/api/search_user/")  // Update with your Django API URL
      .then((response) => {
        setSearchFeed(response.data);  // Store the API response in the state
      })
      .catch((error) => {
          console.error('Error fetching post data:', error);
      });
    }
  };

  fetchPostData()

  return (
      <div className="feed-container">
          {searchFeed.map(post => (
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

export default SearchFeed