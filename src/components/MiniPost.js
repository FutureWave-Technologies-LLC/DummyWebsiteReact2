import "./MiniPost.css"

function Post(props) {
    const {post_id, user, media, title, description} = props

    return (
        <div className="mini-post" id={post_id}>
            <h2>{title}</h2>
            <p>Posted by: {user}</p>
            <p>{description}</p>
        </div>
    )
}

export default Post