import React, { useState } from 'react';
import axios from 'axios';

import FetchDataButton from './components/FetchDataButton.js';
import PostDataButton from './components/PostDataButton.js';
import DataTable from './components/DataTable.js';

function App() {
  const [displayedData, setDisplayedData] = useState([])
  
  return (
    <div className="App">
      <h1>Dummy Data from Django</h1>
      <FetchDataButton
        buttonText="Fetch user data"
        API_URL="http://localhost:8000/api/users/"
        setDataMethod={setDisplayedData}
      ></FetchDataButton>
      {/*<FetchDataButton
        buttonText="Fetch likes Data"
        API_URL="http://localhost:8000/api/likes/"
        setDataMethod={setDisplayedData}
      ></FetchDataButton>*/}
      <FetchDataButton
        buttonText="Fetch posts Data"
        API_URL="http://localhost:8000/api/posts/"
        setDataMethod={setDisplayedData}
      ></FetchDataButton>
      <FetchDataButton
        buttonText="Fetch personal_pages data"
        API_URL="http://localhost:8000/api/personal_pages/"
        setDataMethod={setDisplayedData}
      ></FetchDataButton>
      <FetchDataButton
        buttonText="Fetch comments data"
        API_URL="http://localhost:8000/api/comments/"
        setDataMethod={setDisplayedData}
      ></FetchDataButton>
      <FetchDataButton
        buttonText="Fetch replies data"
        API_URL="http://localhost:8000/api/replies/"
        setDataMethod={setDisplayedData}
      ></FetchDataButton>
      <FetchDataButton
        buttonText="Fetch messages data"
        API_URL="http://localhost:8000/api/messages/"
        setDataMethod={setDisplayedData}
      ></FetchDataButton>
      {/*<PostDataButton
        buttonText="Update Likes"
        API_URL="http://localhost:8000/api/update_likes/"
        dataToPost={{
          email: 'email@gmial.com'
        }}
      ></PostDataButton>*/}
      {/* <button onClick={fetch_update_likes}>Update Likes</button> */}
      
      <DataTable data={displayedData}></DataTable>
    </div>
  );
}

export default App;
