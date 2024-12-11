import { useNavigate } from 'react-router-dom';

import ProfileButton from '../ProfileButton/ProfileButton'

import ProfileImage from '../ProfileImage/ProfileImage';
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
    } = props

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
        <div className={`${is_main_comment == true ? "main": ""} comment sub2-color ui-shadow`}>
            <div>
                <div className="comment-header">
                    <ProfileImage isSmall={true} src={profile_image}></ProfileImage>
                    <ProfileButton
                        username={username}
                        user_id={user_id}
                        classNames={"sub1-button comment-profile"}
                    ></ProfileButton>
                </div>
                {creation_date && (
                    <i className='date'>{new Intl.DateTimeFormat('en-US', options).format(new Date(creation_date))}</i>)}
            </div>
            {comment}
            { is_reply == false && (
                <button className="newspace-style-2 reply-btn" onClick={() => {navigate("/post/"+post_id+"/"+comment_id)}}>Replies</button>
            )}
            
        </div>
    )
}

export default Comment