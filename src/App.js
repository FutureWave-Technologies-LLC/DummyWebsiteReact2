import React, { useState } from 'react';
import axios from 'axios';
//import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"

import './components/customButton.css';
import FetchDataButton from './components/FetchDataButton.js';
import PostDataButton from './components/PostDataButton.js';
import DataTable from './components/DataTable.js';

function App() {
  return (
    //Establish routes to be used for navigating
    //https://www.codeconcisely.com/posts/react-navigation/
    <Routes>
          <Route path="/" element={<DummyDataPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  )
}

export default App;