import "./Post.css"

function Post(props) {
    const {is_mini, post_id, user, media, title, description} = props

    return (
        <div className={is_mini ? "mini post" : "main post"} id={post_id}>
            <h2>{title}</h2>
            <p>Posted by: {user}</p>
            <p>{description}</p>
            {!is_mini && (
                <div>
                    *This text shows if it is not a mini post*
                </div>
            )}
        </div>
    )
}

export default Post