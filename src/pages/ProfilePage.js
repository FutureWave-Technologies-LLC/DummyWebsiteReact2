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
    const [followers, setFollowers] = useState([
        {username: "follower1"},
        {username: "follower2"}
    ])

    useEffect(() => {
        //get user's data based on id
        axios.get("http://localhost:8000/api/get_user_data/", {
            params: {
                user_id: userId,
            }
        })
        .then((response) => {
            //setUser only if request returns a user
            if (response.data[0]) {
                setUser(response.data)
            }
            IsLoading(false)
        })
        .catch((error) => {
            console.error('Error fetching user data:', error)
            IsLoading(false)
        })

        //get list of follower that follow user
        axios.get("http://localhost:8000/api/followers/", {
            params: {
                user_id: userId,
            }
        })
        .then((response) => {
            console.log(response.data)
            // setFollowers(response.data)
        })
        .catch((error) => {
            console.error('Error fetching followers data:', error)
        })

    }, [])
    return (
        <div>
            <Navbar></Navbar>
            <SideBar></SideBar>
            {(user && 
                <div className="profile-container">
                    <h1>{user[0].username}</h1>
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