import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

//Pages
import DummyDataPage from './pages/DummyDataPage.js';
import SignUpPage from './pages/SignUpPage.js';
import SignInPage from './pages/SignInPage.js';

//css
import './components/customButton.css';
import './App.css'

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