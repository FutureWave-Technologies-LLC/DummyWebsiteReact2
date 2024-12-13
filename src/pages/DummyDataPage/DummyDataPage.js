import React, { useState } from 'react';

import FetchDataButton  from '../../components/FetchDataButton/FetchDataButton.js';
import PostDataButton from '../../components/PostDataButton/PostDataButton.js';
import NavigateButton from '../../components/NavigateButton/NavigateButton.js';
import DataTable from '../../components/DataTable/DataTable.js';

function DummyDataPage() {
  const [displayedData, setDisplayedData] = useState([])
  
  return (
    <div className="App">
      <h1>Dummy Data from Django</h1>
      <FetchDataButton
        buttonText="Fetch user data"
        API_URL="http://3.17.148.157:8000/users/users/"
        setDataMethod={setDisplayedData}
      ></FetchDataButton>
      <FetchDataButton
        buttonText="Fetch posts Data"
        API_URL="http://3.17.148.157:8000/posts/all_posts/"
        setDataMethod={setDisplayedData}
      ></FetchDataButton>
      <FetchDataButton
        buttonText="Get Posts for UserId: 1"
        API_URL="http://3.17.148.157:8000/profiles/profile_posts/"
        setDataMethod={setDisplayedData}
        params = {
          { sort_type: "recent",
            user_id: "1" }
        }
      ></FetchDataButton>
      <FetchDataButton
        buttonText="Get Comments for PostId: 904014"
        API_URL="http://3.17.148.157:8000/posts/comments/"
        setDataMethod={setDisplayedData}
        params = {
          { post_id: 904014 }
        }
      ></FetchDataButton>
      <FetchDataButton
        buttonText="Get Replies for CommentId: 3"
        API_URL="http://3.17.148.157:8000/posts/replies/"
        setDataMethod={setDisplayedData}
        params = {
          { comment_id: 3 }
        }
      ></FetchDataButton>
      <FetchDataButton
        buttonText="Get users with query 'bryce'"
        API_URL="http://3.17.148.157:8000/users/search_users/"
        setDataMethod={setDisplayedData}
        params = {
          { query: "bryce" }
        }
      ></FetchDataButton>
      <FetchDataButton
        buttonText="Get followers of userid 1"
        API_URL="http://3.17.148.157:8000/profiles/get_followers/"
        setDataMethod={setDisplayedData}
        params = {
          { user_id: 1 }
        }
      ></FetchDataButton>
      <FetchDataButton
        buttonText="Get followees of userid 1"
        API_URL="http://3.17.148.157:8000/profiles/get_followees/"
        setDataMethod={setDisplayedData}
        params = {
          { user_id: 1 }
        }
      ></FetchDataButton>
      <PostDataButton
        buttonText="Update Likes"
        API_URL="http://3.17.148.157:8000/api/update_likes/"
        dataToPost={{
          email: 'email@gmial.com'
        }}
      ></PostDataButton>
      <NavigateButton
                buttonText="Home"
                path="/home"
                bootstrap="border border-opacity-100"
                iconClass="uil uil-home"
      />
      
      <DataTable data={displayedData}></DataTable>
    </div>
  );
}

export default DummyDataPage