import { Link } from 'react-router-dom';

import "../css/components/CommentFeed.css"

function CommentFeed(props) {
    const {commentFeed, openModalSetter} = props

    const options = {
        timeZone: 'America/Los_Angeles',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };

    return (
        <div className="comments-container">
            <div className="comments-feed">
                {commentFeed.length > 0 ? (commentFeed.map(comment => (
                    <div className="comment">
                        <div className="comment-header">
                            <h5><Link to={"/profile/"+comment.user_id}>{comment.username}</Link></h5>
                            {comment.creation_date && (
                                <i className='date'>{new Intl.DateTimeFormat('en-US', options).format(new Date(comment.creation_date))}</i>)}
                            
                        </div>
                        {comment.comment}
                    </div>
                    
                )).reverse()) : (
                    <p>No comments.</p>
                )}
            </div> 
            <button className="comment-btn" onClick={openModalSetter}>Comment</button>
        </div>
        
    )
}

export default CommentFeed