import { useNavigate, useSearchParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/Sidebar/Sidebar";

import './SearchPage.css';

function Search() {
    const [searchParams] = useSearchParams();
    const [queryResult, setQueryResult] = useState([]);
    const [followingStatus, setFollowingStatus] = useState([]);

    const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem("future-token"));

    useEffect(() => {
        // Fetch users that match with query
        axios.get("http://localhost:8000/users/search_users/", {
            params: {
                query: searchParams.get('q'),
            }
        })
        .then((response) => {
            setQueryResult(response.data)

            // Get users and their IDs that this user is following and set to followingStatus state
            axios.get("http://localhost:8000/profiles/following/", {
                params: {
                    user_id: token.user_id,
                }
            })
            .then(response => {
                response.data.forEach(following_user => {
                    setFollowingStatus(prevState => [...prevState, following_user.username]);
                });
            })
            .catch(err => console.error("Error fetching ID:"+token.user_id+" followers:", err));
        
        })
        .catch((error) => {
            console.error('Error fetching query result:', error);
        });
    }, []);

    // Handles Follow and Unfollow
    function toggleFollow(usernameToFollow) {
        axios.post("http://localhost:8000/profiles/following/", {
            followee_username: usernameToFollow,
            follower_id: token.user_id,
        })
        .then(response => {
            if (response.data.Followed) {
                setFollowingStatus(prevState => [...prevState, usernameToFollow]);
            } else {
                setFollowingStatus(prevState => prevState.filter(i => i !== usernameToFollow));
            }
        })
        .catch(error => {
            console.error('Error following/unfollowing user:', error);
        });
    }

    // Navigate to messages page to start a conversation
    function navigateToMessages(user) {
        navigate("/messages", { state: { userToMessage: user } });
    }

    return (
        <div className="search-container">
            <Navbar></Navbar>
            <SideBar></SideBar>
            <div className="main-content">
                {(!queryResult.error && queryResult.map(user => (
                    <div key={user.user_id} className="user-item">
                        <img className="small-profile-image" src={user.profile_image}/>
                        <div className="right">
                            <h5><Link to={"/profile/"+user.user_id}>{user.username}</Link></h5>
                            {user.username !== token.username && (
                                <div>
                                    <button className="item-btn" onClick={() => toggleFollow(user.username)}>
                                        {followingStatus.includes(user.username) ? 'Unfollow' : 'Follow'}
                                    </button>
                                    <button className="item-btn" onClick={() => navigateToMessages(user)}>
                                        Message
                                    </button>
                                </div>
                            )}
                        </div>
                        
                    </div>
                ))) || <p>{queryResult.Response}</p>}
            </div>
        </div>
    );
}

export default Search;
