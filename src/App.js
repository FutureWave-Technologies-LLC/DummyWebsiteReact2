import React, { useState } from 'react';
import axios from 'axios';

import FetchDataButton from './components/FetchDataButton.js';
import DataTable from './components/DataTable.js';

function App() {
  const [displayedData, setDisplayedData] = useState([])
  //??
  const data = {
    email: 'email@gmial.com'
  };

  const fetch_update_likes = () => {
    axios.post('http://localhost:8000/api/update_likes/', data)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error updating likes:', error);
      });
  };
  
  return (
    <div className="App">
      <h1>Dummy Data from Django</h1>
      <FetchDataButton
        buttonText="Fetch user Data"
        API_URL="http://localhost:8000/api/users/"
        setDataMethod={setDisplayedData}
      ></FetchDataButton>
      <FetchDataButton
        buttonText="Fetch likes Data"
        API_URL="http://localhost:8000/api/likes/"
        setDataMethod={setDisplayedData}
      ></FetchDataButton>
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

      <button onClick={fetch_update_likes}>Update Likes</button>
      
      <DataTable data={displayedData}></DataTable>
    </div>
  );
}

export default App;
