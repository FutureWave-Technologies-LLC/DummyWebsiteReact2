import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import Modal from '../components/Modal';
import NavigateButton from '../components/NavigateButton';
import PostFeed from "../components/PostFeed"

import '../css/pages/ProfilePage.css';

function ProfilePage() {
    const { userId } = useParams();  // Get the userId from the route params if any
    const [loading, IsLoading] = useState(true);

    //data
    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState("https://via.placeholder.com/300")
    const [followers, setFollowers] = useState([]);
    const [followees, setFollowees] = useState([]);
    const [posts, setPosts] = useState([]);

    //show/hide modals
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowees, setShowFollowees] = useState(false);

    // Retrieve the token from localStorage
    const token = JSON.parse(localStorage.getItem("future-token"));

    // Get the logged-in user's user_id from the token
    const loggedInUserId = token?.user_id;

    useEffect(() => {
        const profileUserId = userId || loggedInUserId;  // Fallback to loggedInUserId if userId is undefined

        if (!profileUserId) {
            console.error('No valid userId available');
            IsLoading(false);
            return;
        }

        // Fetch user's data
        axios.get("http://3.142.185.208:8000/users/get_user_data/", {
            params: { user_id: profileUserId },
        })
        .then((response) => {
            if (response.data.error === false) {
                setUser(response.data)
                setProfileImage(response.data.profile_image)

                // Fetch followers
                axios.get("http://3.142.185.208:8000/profiles/get_followers/", {
                    params: { user_id: response.data.user_id },
                })
                .then((response) => {
                    setFollowers(response.data);
                })
                .catch(err => console.error('Error fetching followers data:', err));

                // Fetch followees (users this user is following)
                axios.get("http://3.142.185.208:8000/profiles/following/", {
                    params: { user_id: response.data.user_id },
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
    }, [userId, loggedInUserId]);

    return (
        <div className="profile-page">
            <Navbar />
            <SideBar />
            {user ? (
                <div className="profile-container">
                    <div className="profile-header">
                        <img className="profile-image" src={profileImage}></img>
                        <h1>{user.username}</h1>
                        <div className="follow-info">
                            <span onClick={() => setShowFollowers(true)} className="follower-count">
                                {followers.length} Followers
                            </span>
                            <span onClick={() => setShowFollowees(true)} className="following-count">
                                {followees.length} Following
                            </span>
                        </div>
                        <p>Joined on: {new Intl.DateTimeFormat('en-US').format(new Date(user.creation_date))}</p>
                    </div>
                    
                    {/* Followers Modal */}
                    {showFollowers && (
                        <Modal onClose={() => setShowFollowers(false)}>
                            <h2>Followers</h2>
                            {followers.map((follower) => (
                                <NavigateButton
                                    buttonText={follower.username}
                                    path= {"/profile/"+follower.user_id}
                                    bootstrap="border border-opacity-100"
                                ></NavigateButton>
                            ))}
                        </Modal>
                    )}
                    {/* Following Modal */}
                    {showFollowees && (
                        <Modal onClose={() => setShowFollowees(false)}>
                            <h2>Following</h2>
                            {followees.map((followee) => (
                                <NavigateButton
                                    buttonText={followee.username}
                                    path= {"/profile/"+followee.user_id}
                                    bootstrap="border border-opacity-100"
                                ></NavigateButton>
                            ))}
                        </Modal>
                    )}
                    {/* Display User Posts */}
                    <h2>{user.username}'s Recent Posts</h2>
                    <div className='profile-posts'>
                        <PostFeed userId={userId}></PostFeed>
                    </div>
                </div>
            ) : loading ? (
                <p>Loading data...</p>
            ) : (
                <p>Unable to get user data</p>
            )}
        </div>
    );
}

export default ProfilePage;
