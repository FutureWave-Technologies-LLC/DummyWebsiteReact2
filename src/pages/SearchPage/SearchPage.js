import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/Sidebar/Sidebar";
import UserImage from "../../components/UserImage/UserImage";
import ProfileButton from "../../components/ProfileButton/ProfileButton";
import FollowButton from '../../components/FollowButton/FollowButton';
import MessageButton from "../../components/MessageButton/MessageButton";

import './SearchPage.css';

function Search() {
    const [searchParams] = useSearchParams();
    const [queryResult, setQueryResult] = useState([]);

    const navigate = useNavigate();

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
    }, []);

    // Navigate to messages page to start a conversation
    function navigateToMessages(user) {
        navigate("/messages", { state: { userToMessage: user } });
    }

    return (
        <div className="search-container">
            <Navbar></Navbar>
            <SideBar></SideBar>
            <div className="search-content">
                {(!queryResult.error && queryResult.map(user => (
                    <div key={user.user_id} className="user-item main-color">
                        <UserImage isSmall={true} src={user.profile_image}></UserImage>
                        <div className="right">
                            <ProfileButton
                                username={user.username}
                                user_id={user.user_id}
                                classNames={"main-color"}
                            ></ProfileButton> 
                            {user.username !== token.username && (
                                <div>
                                    <FollowButton
                                        user_id={token.user_id}
                                        followee_username={user.username}
                                        followee_id={user.user_id}
                                    ></FollowButton>
                                    <MessageButton
                                        userToMessage={user}
                                    ></MessageButton>
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
