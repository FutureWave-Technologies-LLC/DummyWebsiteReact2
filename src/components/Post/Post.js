import React, { useState } from "react"
import { useNavigate, Link } from 'react-router-dom';
import Media from '../Media/Media';

import "./Post.css"

function Post(props) {
    const {is_mini, post_id, username, user_id, media, title, description, date} = props
    const navigate = useNavigate();

    const options = {
        timeZone: 'America/Los_Angeles',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    }

    //Mini Post is a button
    if (is_mini) {
        var charLimit = 120;
        
        //shorten description if it exceeds char limit
        function shortDescription(descriptionText) {
            let newDescriptionText = descriptionText
            if (descriptionText.length > charLimit) {
                newDescriptionText = descriptionText.substring(0, charLimit) + "..."
            }
            return newDescriptionText
        }

        function navigateToPost() {
            navigate("/post/"+post_id);
        }

        return (
            <button onClick={navigateToPost} className="mini post" id={post_id}>
                <h2>{title}</h2>
                {date && (
                    <i>{new Intl.DateTimeFormat('en-US', options).format(new Date(date))}</i>
                )}
                <p>Posted by: {username}</p>
                <p className="description">{shortDescription(description)}</p>
            </button>
        )
    //Normal post is div container
    } else {
        
        return (
            <div>
                <div className="normal post" id={post_id}>
                    <h2>{title}</h2>
                    {date && (
                        <i>{new Intl.DateTimeFormat('en-US', options).format(new Date(date))}</i>
                    )}
                    <p>
                        Posted by:{' '}
                        <Link to={"/profile/"+user_id}>{username}</Link>
                    </p>
                    <p className="description">{description}</p>
                    {media && (
                        <Media url={media}></Media>
                    )}
                </div>
                <div className="like-container">
                    <button>Like</button>
                </div>
            </div>
            
        )
    }
    
}

export default Post