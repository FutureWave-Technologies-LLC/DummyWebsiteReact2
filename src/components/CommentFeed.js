import { Link } from 'react-router-dom';

import "../css/components/CommentFeed.css"

function CommentFeed(props) {
    const {commentFeed, openModalSetter} = props

    return (
        <div className="comments-container">
            <div className="comments-feed">
                {commentFeed.length > 0 ? (commentFeed.map(comment => (
                    <div className="comment">
                        <h5>
                            <Link to={"/profile/"+comment.user_id}>{comment.username}</Link>
                        </h5>
                        <p>{comment.comment}</p>
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