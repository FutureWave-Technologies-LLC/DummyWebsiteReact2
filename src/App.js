import React, { useState } from 'react';
import axios from 'axios';

import FetchDataButton from './components/FetchDataButton.js';
import DataTable from './components/DataTable.js';

function App() {
  const [client_info, setClientInfo] = useState([]);  // State to store the fetched data
  const [likes, setlikes] = useState([]);  // State to store the fetched data
  const data = {
    email: 'email@gmial.com'
  };

  // Function to fetch data from Django API
  const fetchData = () => {
    axios.get('http://localhost:8000/api/dummy-data/')  // Update with your Django API URL
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
        buttonText="Fetch Data here"
        API_URL="http://localhost:8000/api/dummy-data/"
        setDataMethod={setData}
      ></FetchDataButton>
      
      <DataTable data={data}></DataTable>
    </div>
  );
}

export default App;
