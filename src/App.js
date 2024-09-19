import React, { useState } from 'react';
import axios from 'axios';

import FetchDataButton from './components/FetchDataButton.js';
import DataTable from './components/DataTable.js';

function App() {
  const [data, setData] = useState([]);  // State to store the fetched data

  // Function to fetch data from Django API
  const fetchData = () => {
    axios.get('http://localhost:8000/api/dummy-data/')  // Update with your Django API URL
      .then((response) => {
        setData(response.data);  // Store the API response in the state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
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
