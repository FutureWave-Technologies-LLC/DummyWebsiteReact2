import "./CommentFeed.css"

function CommentFeed(props) {
    const {commentArray} = props

    return (
        <div className="comments-feed">
            <h4>Comments</h4>
            {commentArray.map(comment => (
                <div className="comment">
                    <h5>{comment.user}</h5>
                    <p>{comment.commentText}</p>
                </div>
            ))}
            
        </div> 
    )
}

export default CommentFeed