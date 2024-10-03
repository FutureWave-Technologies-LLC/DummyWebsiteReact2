import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

//Pages
import DummyDataPage from './pages/DummyDataPage.js';
import SignUpPage from './pages/SignUpPage.js';
import SignInPage from './pages/SignInPage.js';
import HomePage from './pages/HomePage.js';
import CreatePostPage from './pages/CreatePostPage.js';
import PostPage from './pages/PostPage.js';

//css
import './App.css'

function App() {
  return (
    //Establish routes to be used for navigating
    //https://www.codeconcisely.com/posts/react-navigation/
    <Routes>
          <Route path="/" element={<DummyDataPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/CreatePost" element={<CreatePostPage />} />
          <Route path="/post" element={<PostPage />} />
    </Routes>
  )
}

export default App;