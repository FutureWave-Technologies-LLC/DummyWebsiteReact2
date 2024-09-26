import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import axios from 'axios';
//import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"

//Pages
import DummyDataPage from './pages/DummyDataPage.js';
import SignUpPage from './pages/SignUpPage.js';
import SignInPage from './pages/SignInPage.js';

import './components/customButton.css';

function App() {
  return (
    //Establish routes to be used for navigating
    //https://www.codeconcisely.com/posts/react-navigation/
    <Routes>
          <Route path="/" element={<DummyDataPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
    </Routes>
  )
}

export default App;