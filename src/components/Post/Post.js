import Media from '../Media/Media';
import ProfileButton from '../ProfileButton/ProfileButton';

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
            <div className="post post-bg" id={post_id}>
                <h2>{title}</h2>
                {date && (
                    <i>{new Intl.DateTimeFormat('en-US', options).format(new Date(date))}</i>
                )}
                <p>
                    Posted by:{' '}
                    <ProfileButton
                        username={username}
                        user_id={user_id}
                        classNames={"main-color"}
                    ></ProfileButton>                    
                </p>
                <p className="description">{description}</p>
                {media && (
                    <Media url={media}></Media>
                )}
            </div>
            <div className="like-container post-bg">
                <button className={`sub1-button ui-shadow ${userLiked ? "" : "not-liked"}`} onClick={LikeHandler}>
                    <i className= {"uil-thumbs-up"}></i>
                    {likesCount} {likesCount == 1 ? "Like": "Likes"}
                </button>
            </div>
        </div>
        
    )
    
}

export default Post