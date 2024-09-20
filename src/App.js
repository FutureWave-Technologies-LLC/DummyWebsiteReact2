import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [client_info, setClientInfo] = useState([]);  // State to store the fetched data
  const [likes, setlikes] = useState([]);  // State to store the fetched data
  const data = {
    email: 'email@gmial.com'
  };

  // Function to fetch data from Django API
  const fetch_client_info = () => {
    axios.get('http://localhost:8000/api/client-info/')  // Update with your Django API URL
      .then((response) => {
        setClientInfo(response.data);  // Store the API response in the state
      })
      .catch((error) => {
        console.error('Error fetching client_info:', error);
      });
  };

  const fetch_likes = () => {
    axios.get('http://localhost:8000/api/likes/')  // Update with your Django API URL
      .then((response) => {
        setlikes(response.data);  // Store the API response in the state
      })
      .catch((error) => {
        console.error('Error fetching likes:', error);
      });
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
      <button onClick={fetch_client_info}>Fetch client info</button>
      <button onClick={fetch_likes}>Fetch likes</button>
      <button onClick={fetch_update_likes}>update likes</button>

      {/* Display client info */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>name</th>
            <th>email</th>  {/* Replace with other fields if necessary */}
          </tr>
        </thead>
        <tbody>
          {client_info.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

        {/* Display likes */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>name</th>
            <th>email</th>
            <th>comment</th>
            <th>likeCount</th>  {/* Replace with other fields if necessary */}
          </tr>
        </thead>
        <tbody>
          {likes.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.comment}</td>
              <td>{item.like_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
