import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavigateButton from '../NavigateButton/NavigateButton';

import UserImage from '../UserImage/UserImage';
import "./Comment.css"

function Comment(props) {
    const {is_main_comment,
        is_reply, 
        username, 
        user_id, 
        profile_image, 
        comment, 
        creation_date, 
        comment_id, 
        post_id,
        setCommentFeed} = props

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

    return (
        <div className={`${is_main_comment == true ? "main": ""} comment sub1-color ui-shadow`}>
            <div>
                <div className="comment-header">
                    <UserImage isSmall={true} src={profile_image}></UserImage>
                    <button 
                        className="sub1-button comment-profile"
                        onClick={() => {navigate("/profile/"+user_id)}}
                    >{username}</button>
                </div>
                {creation_date && (
                    <i className='date'>{new Intl.DateTimeFormat('en-US', options).format(new Date(creation_date))}</i>)}
            </div>
            <p>{comment}</p>
            { is_reply == false && (
                <button className="newspace-style-2 reply-btn" onClick={() => {navigate("/post/"+post_id+"/"+comment_id)}}>Replies</button>
            )}
            
        </div>
    )
}

export default Comment