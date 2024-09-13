import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);  // State to store the fetched data

  // Function to fetch data from Django API
  const fetchData = () => {
    axios.get('https://ip-172-31-28-218.us-east-2.compute.internal')  // Update with your Django API URL
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
      <button onClick={fetchData}>Fetch Data</button>

      {/* Display fetched data in a table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>  {/* Replace with other fields if necessary */}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.username}</td>
              <td>{item.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
