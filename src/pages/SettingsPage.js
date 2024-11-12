import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import Modal from '../components/Modal';

import '../css/pages/SettingsPage.css';

function SettingsPage() {
    const [image, setImage] = useState("")

    const [notification, setNotification] = useState("")

    // Retrieve the token from localStorage
    const token = JSON.parse(localStorage.getItem("future-token"));

    useEffect(() => {
        // Fetch user's data
        axios.get("http://localhost:8000/users/get_user_data/", {
            params: { user_id: token.user_id },
        })
        .then((response) => {
            setImage(response.data.profile_image)
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });
    }, []);

    const submitSettingsChange = async (e) => {
        e.preventDefault();
        console.log(image)
        try {
            await axios.post('http://localhost:8000/users/update_settings/', {
                user_id: token.user_id,
                profile_image: image,
            })
            setNotification('Settings successfully updated.');
        } catch (error) {
            setNotification('Failed to update settings.');
        }
        setTimeout(() => setNotification(''), 3000); 
    }

    return (
        <div className="settings-page">
            <Navbar />
            <SideBar />
            <form className="settings-form" onSubmit={submitSettingsChange}>
                <div className="profile-image-container">
                    <h3>Profile Image</h3>
                    <input className="settings-input" 
                        placeholder='"https://via.placeholder.com/300"'
                        onChange={e=>{setImage(e.target.value)}}
                        value={image}
                    ></input>
                </div>
                <button className="submit-btn" type="form">Save</button>
            </form>
            {notification && <div className="notification">{notification}</div>}
        </div>
    )
}

export default SettingsPage;