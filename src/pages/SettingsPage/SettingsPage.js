import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/Sidebar/Sidebar";
import SettingsComponent from '../../components/SettingsComponent/SettingsComponent';

import './SettingsPage.css';

function SettingsPage() {
    const [profileImage, setProfileImage] = useState("")
    const [bannerImage, setBannerImage] = useState("")
    const [profileDesc, setProfileDesc] = useState("")

    const [disableInput, setDisabledInput] = useState(true)
    const [notification, setNotification] = useState("")

    // Retrieve the token from localStorage
    const token = JSON.parse(localStorage.getItem("future-token"));

    useEffect(() => {
        // Fetch user's data
        axios.get("http://3.17.148.157:8000/users/get_user_data/", {
            params: { user_id: token.user_id },
        })
        .then((response) => {
            setProfileImage(response.data.profile_image)
            setBannerImage(response.data.banner_image)
            setProfileDesc(response.data.profile_description)

            setDisabledInput(false)
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });
    }, []);

    const submitSettingsChange = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://3.17.148.157:8000/users/update_settings/', {
                user_id: token.user_id,
                profile_image: profileImage,
                banner_image: bannerImage,
                profile_description: profileDesc,
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
                {notification && <div className="notification">{notification}</div>}
                <div className="settings-container">
                    <SettingsComponent
                        title={"Profile Image"}
                        onChange={e=>{setProfileImage(e.target.value)}}
                        value={profileImage}
                        disabled={disableInput}
                    ></SettingsComponent>
                    <SettingsComponent
                        title={"Banner Image"}
                        onChange={e=>{setBannerImage(e.target.value)}}
                        value={bannerImage}
                        disabled={disableInput}
                    ></SettingsComponent>
                    <SettingsComponent
                        title={"Profile Description"}
                        onChange={e=>{setProfileDesc(e.target.value)}}
                        value={profileDesc}
                        disabled={disableInput}
                    ></SettingsComponent>
                </div>
                <button className="submit-btn" type="form">Save</button>
            </form>
           
        </div>
    )
}

export default SettingsPage;