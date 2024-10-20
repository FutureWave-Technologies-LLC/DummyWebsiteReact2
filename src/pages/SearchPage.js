import { useSearchParams } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar"
import SideBar from "../components/Sidebar"
import NotificationBar from "../components/NotificationBar"
import axios from 'axios'
import { useAuth } from "../hooks/AuthProvider" // Assuming you have an AuthProvider hook

function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [queryResult, setQueryResult] = useState([])
    const [followingStatus, setFollowingStatus] = useState({}) // To track follow status

    // Get the user token from localStorage and useAuth hook
    const token = JSON.parse(localStorage.getItem("future-token"))
    const { username } = token || {}; // Destructure to get the username from token

    // Temporarily hardcoding the follow_id for the logged-in user
    const loggedInUserId = 1; // Replace this with the actual numeric ID of the user

    useEffect(() => {
        // Fetch search results
        axios.get("http://localhost:8000/api/search_users/", {
            params: {
                query: searchParams.get('q'),
            }
        })
        .then((response) => {
            setQueryResult(response.data);

            // Check follow status for each user in the search result
            response.data.forEach(user => {
                axios.get("http://localhost:8000/api/followers/", {
                    params: {
                        user_follower_id: loggedInUserId,  // Use the hardcoded numeric user ID
                        following_id: user.username
                    }
                })
                .then(res => {
                    setFollowingStatus(prevState => ({
                        ...prevState,
                        [user.username]: res.data.is_following
                    }));
                })
                .catch(err => console.error("Error fetching follow status:", err));
            });
        })
        .catch((error) => {
            console.error('Error getting data:', error);
        });
    }, [searchParams, loggedInUserId])

    // Function to handle follow/unfollow
    const toggleFollow = (usernameToFollow) => {
        const isFollowing = followingStatus[usernameToFollow];
        
        axios.post("http://localhost:8000/api/followers/", {
            user_follower_id: loggedInUserId,  // Use the hardcoded numeric user ID
            following_id: usernameToFollow
        })
        .then(response => {
            // Toggle the follow status in the UI
            setFollowingStatus(prevState => ({
                ...prevState,
                [usernameToFollow]: !isFollowing
            }));
        })
        .catch(error => {
            console.error('Error following/unfollowing user:', error);
        });
    }

    return (
        <div>
            <Navbar></Navbar>
            <SideBar></SideBar>
            {(!queryResult.error && queryResult.map(user => (
                <div key={user.username}>
                    <p>{user.username}</p>
                    <button onClick={() => toggleFollow(user.username)}>
                        {followingStatus[user.username] ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
            ))) || <p>{queryResult.Response}</p>}

            {/* {filteredUsers.map(user => (
                <div key={user.id} className="user-item">
                    <p className="user-name">{user.name}</p>
                    <button onClick={() => handleFollow(user.id)}>
                            {followedUsers.includes(user.id) ? 'Following' : 'Follow'}
                    </button>
                </div>
            ))} */}
            
            <NotificationBar></NotificationBar>
        </div>
    )
}

export default Search;
