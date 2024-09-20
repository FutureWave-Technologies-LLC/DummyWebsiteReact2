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
        buttonText="Fetch client-info Data"
        API_URL="http://localhost:8000/api/client-info/"
        setDataMethod={setDisplayedData}
      ></FetchDataButton>

      <FetchDataButton
        buttonText="Fetch likes Data"
        API_URL="http://localhost:8000/api/likes/"
        setDataMethod={setDisplayedData}
      ></FetchDataButton>

      <PostDataButton
        buttonText="Update Likes"
        API_URL="http://localhost:8000/api/update_likes/"
        dataToPost={{
          email: 'email@gmial.com'
        }}
      ></PostDataButton>
      {/* <button onClick={fetch_update_likes}>Update Likes</button> */}
      
      <DataTable data={displayedData}></DataTable>
    </div>
  );
}

export default App;
