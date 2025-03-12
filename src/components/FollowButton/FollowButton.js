import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FollowButton(props) {
    const {user_id, followee_username, followee_id} = props
    const [followingStatus, setFollowingStatus] = useState(false);

    useEffect(() => {
       //find if user is following the user to profile
        axios.get("https://d1ls0cg8xyipo0.cloudfront.net/profiles/following/", {
            params: {
                user_id: user_id,
                followee_id: followee_id,
            }
        })
        .then(response => {
            setFollowingStatus(response.data);
        })
        .catch(err => console.error("Error fetching ID:"+user_id+" followers:", err));
    }, []);

    // Handles Follow and Unfollow
    function toggleFollow() {
        axios.post("https://d1ls0cg8xyipo0.cloudfront.net/profiles/following/", {
            followee_username: followee_username,
            follower_id: user_id,
        })
        .then(response => {
            if (response.data.Followed) {
                setFollowingStatus(true)
            } else {
                setFollowingStatus(false)
            }
        })
        .catch(error => {
            console.error('Error following/unfollowing user:', error);
        });
    }

    return (
        <button className="sub1-button" onClick={() => toggleFollow()}>
            {followingStatus == true ? 'Unfollow' : 'Follow'}
        </button>
    )
}

export default FollowButton;