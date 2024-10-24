import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import NotificationBar from "../components/NotificationBar";
import Modal from '../components/Modal'; 

import './ProfilePage.css';


function ProfilePage() {
    const { userId } = useParams();
    const [loading, IsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [followees, setFollowees] = useState([]);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowees, setShowFollowees] = useState(false);

    useEffect(() => {
        // Fetch user's data
        axios.get("http://localhost:8000/api/get_user_data/", {
            params: {
                user_id: userId,
            }
        })
        .then((response) => {
            if (response.data.error === false) {
                setUser(response.data);

                // Fetch followers
                axios.get("http://localhost:8000/api/get_followers/", {
                    params: { user_id: response.data.user_id }
                })
                .then((response) => {
                    setFollowers(response.data);
                })
                .catch(err => console.error('Error fetching followers data:', err));

                // Fetch followees (users this user is following)
                axios.get("http://localhost:8000/api/following/", {
                    params: { user_id: response.data.user_id }
                })
                .then(response => {
                    setFollowees(response.data);
                })
                .catch(err => console.error("Error fetching followees data:", err));
            } else {
                console.log(response.data.response);
            }

            IsLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
            IsLoading(false);
        });
    }, [userId]);

    return (
        <div className="profile-container">
            <Navbar />
            <SideBar />
            {user ? (
                <div className="profile-content">
                    <div className="profile-header">
                        <h1>{user.username}</h1>
                        <div className="follow-info">
                            <span onClick={() => setShowFollowers(true)} className="follower-count">
                                {followers.length} Followers
                            </span>
                            <span onClick={() => setShowFollowees(true)} className="following-count">
                                {followees.length} Following
                            </span>
                        </div>
                    </div>

                    {/* Followers Modal */}
                    {showFollowers && (
                        <Modal onClose={() => setShowFollowers(false)}>
                            <h2>Followers</h2>
                            {followers.map((follower) => (
                                <Link to={`/profile/${follower.user_id}`} key={follower.user_id} className="user-link">
                                    <p>{follower.username}</p>
                                </Link>
                            ))}
                        </Modal>
                    )}

                    {/* Following Modal */}
                    {showFollowees && (
                        <Modal onClose={() => setShowFollowees(false)}>
                            <h2>Following</h2>
                            {followees.map((followee) => (
                                <Link to={`/profile/${followee.user_id}`} key={followee.user_id} className="user-link">
                                    <p>{followee.username}</p>
                                </Link>
                            ))}
                        </Modal>
                    )}
                </div>
            ) : loading ? (
                <p>Loading data...</p>
            ) : (
                <p>Unable to get user data</p>
            )}
            <NotificationBar />
        </div>
    );
}

export default ProfilePage



