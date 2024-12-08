import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../../components/Navbar/Navbar"
import SideBar from "../../components/Sidebar/Sidebar"
import PostFeed from "../../components/PostFeed/PostFeed"
import Modal from '../../components/Modal/Modal';
import NavigateButton from '../../components/NavigateButton/NavigateButton';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import FollowButton from '../../components/FollowButton/FollowButton';
import MessageButton from '../../components/MessageButton/MessageButton';

import './ProfilePage.css';

function ProfilePage() {
    const { userId } = useParams();  // Get the userId from the route params if any
    const [loading, IsLoading] = useState(true);

    //is messagable
    const [messagableUsers, setMessageableUsers] = useState([]);

    //data
    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState("https://via.placeholder.com/300")
    const [bannerImage, setBannerImage] = useState("https://via.placeholder.com/300")
    const [followers, setFollowers] = useState([]);
    const [followees, setFollowees] = useState([]);

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
        axios.get("http://localhost:8000/users/get_user_data/", {
            params: { user_id: profileUserId },
        })
        .then((response) => {
            if (response.data.error === false) {
                setUser(response.data)
                if (response.data.profile_image)
                    setProfileImage(response.data.profile_image)
                if (response.data.banner_image)
                    setBannerImage(response.data.banner_image)  

                // Fetch followers
                axios.get("http://localhost:8000/profiles/get_followers/", {
                    params: { user_id: response.data.user_id },
                })
                .then((response) => {
                    setFollowers(response.data);
                })
                .catch(err => console.error('Error fetching followers data:', err));

                // Fetch followees (users this user is following)
                axios.get("http://localhost:8000/profiles/get_followees/", {
                    params: { user_id: response.data.user_id },
                })
                .then(response => {
                    setFollowees(response.data);
                })
                .catch(err => console.error("Error fetching followees data:", err));
            } else {
                console.log(response.data.response);
            }

            //get messagable users
            axios.get("http://localhost:8000/messaging/messagable_users/", {
                params: { user_id: token.user_id },
            })
            .then((response) => {
            setMessageableUsers(response.data)
            })
            .catch((err) => console.error('Error fetching post data:', err))

            IsLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
            IsLoading(false);
        });
    }, [userId, loggedInUserId]);


    function isValidImageUrl(url) {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false); // Failed to load
          img.src = url;
        });
      }
      
    isValidImageUrl(bannerImage).then((isValid) => {
    if (!isValid) {
        setBannerImage("https://via.placeholder.com/300")
    }
    });

    return (
        <div className="profile-page">
            <Navbar />
            <SideBar />
            {user ? (
                <div className="profile-container">
                    <div className="profile-header">
                        <div className="customized-container">
                            <div className="img-profile"><ProfileImage isSmall={false} src={profileImage}></ProfileImage></div>
                            <img className="img-banner newspace-border" 
                            src={bannerImage}
                            ></img>
                        </div>
                        <div className="username-follow-container">
                            <div className="fs-2 fw-bold">{user.username}</div>
                            <span onClick={() => setShowFollowers(true)} className="follower-count">
                                {followers.length} Followers
                            </span>
                            <span onClick={() => setShowFollowees(true)} className="following-count">
                                {followees.length} Following
                            </span>
                            Joined on: {new Intl.DateTimeFormat('en-US').format(new Date(user.creation_date))}
                        </div>
                        <div className="bio">{user.profile_description}</div>
                        
                    </div>

                    {/*Follow and Messag Button*/}
                    {loggedInUserId != user.user_id && (
                        <div className="follow-message-btn-container">
                            <FollowButton
                                user_id={loggedInUserId}
                                followee_username={user.username}
                                followee_id={user.user_id}
                            ></FollowButton>
                            {messagableUsers.find((messagableUser) => messagableUser.user_id === user.user_id) && (
                                <MessageButton
                                    userToMessage={user}
                                ></MessageButton>
                            )}
                        </div>
                    )}
                    
                    {/* Followers Modal */}
                    {showFollowers && (
                        <Modal onClose={() => setShowFollowers(false)}>
                            <h2>Followers</h2>
                            <div class="follow-list">
                                {followers.map((follower) => (
                                    <NavigateButton
                                        buttonText={follower.username}
                                        path= {"/profile/"+follower.user_id}
                                        bootstrap="shadow border border-opacity-100"
                                    ></NavigateButton>
                                ))}
                            </div>
                        </Modal>
                    )}
                    {/* Following Modal */}
                    {showFollowees && (
                        <Modal onClose={() => setShowFollowees(false)}>
                            <h2>Following</h2>
                            <div class="follow-list">
                                {followees.map((followee) => (
                                    <NavigateButton
                                        buttonText={followee.username}
                                        path= {"/profile/"+followee.user_id}
                                        bootstrap="border border-opacity-100"
                                    ></NavigateButton>
                                ))}
                            </div>
                        </Modal>
                    )}
                    {/* Display User Posts */}
                    <h2>{user.username}'s Posts</h2>
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
