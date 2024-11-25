import { Link } from 'react-router-dom';
import Media from '../Media/Media';

import "./Post.css"

function Post(props) {
    const {post_id,
        username, 
        user_id, title, 
        description, 
        date, 
        media,
        likesCount,
        userLiked,
        LikeHandler} = props

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
                <button onClick={LikeHandler}>
                    {likesCount} Likes
                    <i className= {userLiked ? "uil-thumbs-up" : "uil-thumbs-down"}></i>
                </button>
            </div>
        </div>
        
    )
    
}

export default Post