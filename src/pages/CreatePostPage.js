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

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleMediaChange = (e) => {
        setMedia(e.target.files[0]);
    };

    const handlePostTextChange = (e) => {
        setPostText(e.target.value);
    };

    const handlePostSubmit = (e) => {
        e.preventDefault();
        // Handle post submission logic here
        console.log('Title:', title);
        console.log('Media:', media);
        console.log('Post Text:', postText);
        axios.post("http://3.142.185.208:8000/api/recieving_posts/", {
            title: title,
            media: media,
            postText: postText,
        })
    };

    return (
        <div className="create-post-page">
            <Navbar />
            <div className="main-content">
                <SideBar /> 
                <div className="create-post-container">
                    <h1>Create New Post</h1>
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
                            placeholder="Body Text(Optional)"
                            className="form-control rounded"
                            onChange={handlePostTextChange}
                        />

                        <button type="Submit" className="btn btn-primary rounded">
                            Post
                        </button>
                    </form>
                </div>
                <NotificationBar/> 
            </div>
        </div>
    );
};

export default CreatePostPage;