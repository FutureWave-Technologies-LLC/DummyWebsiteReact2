import { Link } from 'react-router-dom';

import "./CommentFeed.css"

function CommentFeed(props) {
    const {commentFeed, openModalSetter} = props

    return (
        <div className="comments-container">
            <div className="comments-feed">
                {commentFeed.map(comment => (
                    <div className="comment">
                        <h5>
                            <Link to={"/profile/"+comment.user_id}>{comment.username}</Link>
                        </h5>
                        <p>{comment.comment}</p>
                    </div>
                )).reverse()}
            </div> 
            <button className="comment-btn" onClick={openModalSetter}>Comment</button>
        </div>
        
    )
}

export default CommentFeed