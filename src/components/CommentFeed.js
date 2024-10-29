import "./CommentFeed.css"

function CommentFeed(props) {
    const {commentFeed, openModalSetter} = props

    return (
        <div className="comments-container">
            <div className="comments-feed">
                {commentFeed.map(comment => (
                    <div className="comment">
                        <h5>{comment.username}</h5>
                        <p>{comment.comment}</p>
                    </div>
                )).reverse()}
            </div> 
            <button className="comment-btn" onClick={openModalSetter}>Comment</button>
        </div>
        
    )
}

export default CommentFeed