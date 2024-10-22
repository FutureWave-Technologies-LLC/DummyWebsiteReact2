import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Navbar from "../components/Navbar"
import SideBar from "../components/Sidebar"
import NotificationBar from "../components/NotificationBar"

import './ProfilePage.css'

function ProfilePage() {
    const { userId } = useParams()
    const [loading, IsLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [followers, setFollowers] = useState([])
    const [followees, setFollowees] = useState([])

    useEffect(() => {
        //get user's data based on id
        axios.get("http://localhost:8000/api/get_user_data/", {
            params: {
                user_id: userId,
            }
        })
        .then((response) => {
            //setUser only if request returns a user
            if (response.data.error == false) {
                setUser(response.data)
                // //get list of the user's followers
                axios.get("http://localhost:8000/api/get_followers/", {
                    params: {
                        user_id: response.data.user_id,
                    }
                })
                .then((response) => {
                    setFollowers(response.data)
                })
                .catch(err => console.error('Error fetching followers data:', err));

                //get users and their ids that this user is following and set to FollowingStatusState
                axios.get("http://localhost:8000/api/following/", {
                    params: {
                        user_id: response.data.user_id,
                    }
                })
                .then(response => {
                    setFollowees(response.data)
                })
                .catch(err => console.error("Error fetching followers:", err));
        
            } else {
                console.log(response.data.response)
            }
            
            IsLoading(false)
        })
        .catch((error) => {
            console.error('Error fetching user data:', error)
            IsLoading(false)
        })
    }, [])

    return (
        <div className="profile-container">
            <Navbar></Navbar>
            <SideBar></SideBar>
            {(user && 
                <div>
                    <h1>{user.username}</h1>
                    <div className="follow-container">
                        <div className="followers-container">
                            <h2>Followers:</h2>
                            {followers.map((follower) => (
                                    <p>{follower.username}</p>
                            ))}
                        </div>
                        <div className="followees-container">
                            <h2>Following:</h2>
                            {followees.map((followee) => (
                                    <p>{followee.username}</p>
                            ))}
                        </div>
                    </div>
                    
                </div>) 
            || (loading && 
                <p>Loading data...</p>)
            || <p>Unable to get user data</p>}
            <NotificationBar></NotificationBar>
        </div>
    )
}

export default ProfilePage