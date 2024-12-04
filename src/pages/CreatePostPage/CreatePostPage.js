import React, { useState } from 'react';
import Navbar from "../../components/Navbar/Navbar"; 
import SideBar from "../../components/Sidebar/Sidebar";
import axios from 'axios';

import "./CreatePostPage.css"; 

const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [media, setMedia] = useState(null);
    const [postText, setPostText] = useState('');
    const [error, setError] = useState('');
    const [notification, setNotification] = useState('');

    const token = JSON.parse(localStorage.getItem("future-token"))

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://3.17.148.157:8000/posts/post/', {
                title: title,
                media: media,
                description: postText,
                user_id: token.user_id
            })

            setTitle('');
            setMedia('');
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
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        {/* <input
                            type="file"
                            id="media"
                            className="form-control rounded"
                            onChange={(e) => setMedia(e.target.files[0])}
                        /> */}
                        <input
                            type="text"
                            id="media"
                            value={media}
                            placeholder="URL of media"
                            className="form-control rounded"
                            onChange={(e) => setMedia(e.target.value)}
                        />

                        <textarea
                            id="postText"
                            value={postText}
                            placeholder="Post Text"
                            className="form-control rounded"
                            onChange={(e) => setPostText(e.target.value)}
                        />

                        <button type="submit" className="btn btn-primary rounded">
                            Post
                        </button>
                    </form>
                    {error && <p className="error">{error}</p>}
                    {notification && <div className="notification">{notification}</div>}
            </div> 
            
        </div>
    );
};

export default CreatePostPage;