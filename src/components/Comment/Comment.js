import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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

    function handleNavigateReply() {
        navigate("/post/"+post_id+"/"+comment_id)
    }

    return (
        <div className={is_main_comment == true ? "main comment": "comment"}>
            <div>
                <div className="comment-header">
                    <img className="small-profile-image" src={profile_image}></img>
                    <h5><Link to={"/profile/"+user_id}>{username}</Link></h5>
                </div>
                {creation_date && (
                    <i className='date'>{new Intl.DateTimeFormat('en-US', options).format(new Date(creation_date))}</i>)}
            </div>
            <div>{comment}</div>
            { is_reply == false && (
                <button className="newspace-style-2 reply-btn" onClick={handleNavigateReply}>Replies</button>
            )}
            
        </div>
    )
}

export default Comment