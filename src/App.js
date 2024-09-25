import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Pages
import DummyDataPage from './pages/DummyDataPage.js';
import SignUpPage from './pages/SignUpPage.js';

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