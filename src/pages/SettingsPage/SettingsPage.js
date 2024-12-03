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

    const [oldPassword, setOldPassword]= useState("")
    const [newPassword, setNewPassword]= useState("")

    const [disableInput, setDisabledInput] = useState(true)
    const [passwordSuccess, setPasswordSuccess] = useState()
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

    //submit user's settings through endpoint
    const submitSettingsChange = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://3.17.148.157:8000/users/update_settings/', {
                user_id: token.user_id,
                profile_image: profileImage,
                banner_image: bannerImage,
                profile_description: profileDesc,
                old_password: oldPassword,
                new_password: newPassword
            })
            .then((response) => {
                if (response.data.password_update == true) {
                    setPasswordSuccess("Password updated.")
                } else if (response.data.password_update == false) {
                    setPasswordSuccess("Unable to update password; incorrect old password.")
                }
            })
            setNotification('Settings successfully updated.');
        } catch (error) {
            setNotification('Failed to update settings.');
        }
        setTimeout(() => setNotification(''), 3000); 
        setTimeout(() => setPasswordSuccess(''), 3000); 
    }

    return (
        <div className="settings-page">
            <Navbar />
            <SideBar />
            <form className="settings-form" onSubmit={submitSettingsChange}>
                <div className="settings-container">
                    <SettingsComponent
                        title={"Profile Image"}
                        placeholder={'"https://via.placeholder.com/300"'}
                        onChange={e=>{setProfileImage(e.target.value)}}
                        value={profileImage}
                        disabled={disableInput}
                    ></SettingsComponent>
                    <SettingsComponent
                        title={"Banner Image"}
                        placeholder={'"https://via.placeholder.com/300"'}
                        onChange={e=>{setBannerImage(e.target.value)}}
                        value={bannerImage}
                        disabled={disableInput}
                    ></SettingsComponent>
                    <SettingsComponent
                        title={"Profile Description"}
                        placeholder={"Type your profile's description here"}
                        onChange={e=>{setProfileDesc(e.target.value)}}
                        value={profileDesc}
                        disabled={disableInput}
                    ></SettingsComponent>
                </div>
                <div className="row-container">
                        <SettingsComponent
                            title={"Old Password"}
                            placeholder={"Type your old password here"}
                            onChange={e=>{setOldPassword(e.target.value)}}
                            value={oldPassword}
                            disabled={disableInput}
                            isPassword={true}
                            shortInput={true}
                        ></SettingsComponent>
                        <SettingsComponent
                            title={"New Password"}
                            placeholder={"Type your new password here"}
                            onChange={e=>{setNewPassword(e.target.value)}}
                            value={newPassword}
                            disabled={disableInput}
                            isPassword={true}
                            shortInput={true}
                        ></SettingsComponent>
                    </div>
                <div className='submit-notif-container'>
                    <button className="submit-btn" type="form">Save</button>
                    {notification && <div className="notification">{notification}</div>}
                    {passwordSuccess && <div className="notification">{passwordSuccess}</div>}
                </div>
            </form>
           
        </div>
    )
}

export default SettingsPage;