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