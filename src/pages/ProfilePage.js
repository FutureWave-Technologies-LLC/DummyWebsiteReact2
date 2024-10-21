import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Navbar from "../components/Navbar"
import SideBar from "../components/Sidebar"
import NotificationBar from "../components/NotificationBar"

function ProfilePage() {
    const { userId } = useParams()
    const [loading, IsLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [followers, setFollowers] = useState([])

    useEffect(() => {
        //get user's data based on id
        axios.get("http://3.142.185.208:8000/api/get_user_data/", {
            params: {
                user_id: userId,
            }
        })
        .then((response) => {
            //setUser only if request returns a user
            if (response.data) {
                setUser(response.data)
                // //get list of the user's followers
                axios.get("http://3.142.185.208:8000/api/get_followers/", {
                    params: {
                        user_id: response.data.user_id,
                    }
                })
                .then((response) => {
                    console.log(response.data)
                    setFollowers(response.data)
                })
                .catch((error) => {
                    console.error('Error fetching followers data:', error)
                })
            }
            
            IsLoading(false)
        })
        .catch((error) => {
            console.error('Error fetching user data:', error)
            IsLoading(false)
        })
    }, [])

    return (
        <div>
            <Navbar></Navbar>
            <SideBar></SideBar>
            {(user && 
                <div className="profile-container">
                    <h1>{user.username}</h1>
                    <h2>Followers:</h2>
                    {followers.map((follower) => (
                            <p>{follower.username}</p>
                        ))}
                </div>) 
            || (loading && 
                <p>Loading data...</p>)
            || <p>Unable to get user data</p>}
            <NotificationBar></NotificationBar>
        </div>
    )
}

export default ProfilePage