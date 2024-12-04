import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/Sidebar/Sidebar";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import ProfileButton from "../../components/ProfileButton/ProfileButton";
import FollowButton from '../../components/FollowButton/FollowButton';
import MessageButton from "../../components/MessageButton/MessageButton";

import './SearchPage.css';

function Search() {
    const [searchParams] = useSearchParams();
    const [queryResult, setQueryResult] = useState([]);
    const [messagableUsers, setMessageableUsers] = useState([]);

    const token = JSON.parse(localStorage.getItem("future-token"));

    useEffect(() => {
        // Fetch users that match with query
        axios.get("http://3.17.148.157:8000/users/search_users/", {
            params: {
                query: searchParams.get('q'),
            }
        })
        .then((response) => {
            setQueryResult(response.data)
        })
        .catch((error) => {
            console.error('Error fetching query result:', error);
        });

        //get messagable users
        axios.get("http://3.17.148.157:8000/messaging/messagable_users/", {
            params: { user_id: token.user_id },
        })
        .then((response) => {
        setMessageableUsers(response.data)
        })
        .catch((err) => console.error('Error fetching post data:', err))
    }, []);

    console.log(messagableUsers)
    console.log(queryResult)

    return (
        <div className="search-container">
            <Navbar></Navbar>
            <SideBar></SideBar>
            <div className="search-content">
                {(!queryResult.error && queryResult.map(user => (
                    <div key={user.user_id} className="user-item main-color">
                        <div className="profile-side">
                            <ProfileButton
                                username={user.username}
                                user_id={user.user_id}
                                classNames={"main-color"}
                            ></ProfileButton>
                            <ProfileImage isSmall={true} src={user.profile_image}></ProfileImage>
                        </div>
                        {user.username !== token.username && (
                            <div className="action-side">
                                <div>
                                    <FollowButton
                                        user_id={token.user_id}
                                        followee_username={user.username}
                                        followee_id={user.user_id}
                                    ></FollowButton>
                                    {messagableUsers.find((messagableUser) => messagableUser.user_id === user.user_id) && (
                                        <MessageButton
                                            userToMessage={user}
                                        ></MessageButton>
                                    )}
                                </div>
                            </div>
                        ) || (<p>This is you</p>) } 
                    </div>
                ))) || <p>{queryResult.Response}</p>}
            </div>
        </div>
    );
}

export default Search;
