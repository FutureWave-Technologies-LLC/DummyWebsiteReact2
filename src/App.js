import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios.get('http://localhost:8000/api/dummy-data/')  // Replace with Azure backend URL after deployment
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="App">
      <h1>Dummy Data</h1>
      <button onClick={fetchData}>Fetch Dummy Data</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Occupation</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>{row.occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;