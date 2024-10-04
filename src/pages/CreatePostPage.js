import React, { useState } from 'react';
import Navbar from "../components/Navbar"; 
import SideBar from "../components/Sidebar";
import NotificationBar from "../components/NotificationBar";
import './CreatePostPage.css'; 
import axios from 'axios';

const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [media, setMedia] = useState(null);
    const [postText, setPostText] = useState('');
    const [error, setError] = useState('');
    const [notification, setNotification] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleMediaChange = (e) => {
        setMedia(e.target.files[0]);
    };

    const handlePostTextChange = (e) => {
        setPostText(e.target.value);
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            // Handle post submission logic here
            const formData = new FormData();
            formData.append('title', title);
            formData.append('media', media);
            formData.append('postText', postText);

            await axios.post('http://3.142.185.208:8000/api/recieving_posts/', formData);

            setTitle('');
            setMedia(null);
            setPostText('');

        
            setNotification('Posted!');
            setTimeout(() => setNotification(''), 3000); 
        } catch (error) {
            setError('Failed to post. Please try again.');
        }
    };

    return (
        <div className="create-post-page">
            <Navbar /> 
            <div className="main-content">
                <SideBar /> 
                <div className="create-post-container">
                    <h1>Create Post</h1>
                    <form className="create-post-form" onSubmit={handlePostSubmit}>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            placeholder="Title"
                            className="form-control rounded"
                            onChange={handleTitleChange}
                        />

                        <input
                            type="file"
                            id="media"
                            className="form-control rounded"
                            onChange={handleMediaChange}
                        />

                        <textarea
                            id="postText"
                            value={postText}
                            placeholder="Post Text"
                            className="form-control rounded"
                            onChange={handlePostTextChange}
                        />

                        <button type="submit" className="btn btn-primary rounded">
                            Post
                        </button>
                    </form>
                    {error && <p className="error">{error}</p>}
                    {notification && <div className="notification">{notification}</div>}
                </div>
                <NotificationBar /> 
            </div>
        </div>
    );
};

export default CreatePostPage;