import "./Post.css"

function Post(props) {
    const {is_mini, post_id, user, media, title, description} = props

    //Mini Post is a button
    if (is_mini) {
        return (
            <button className="mini post" id={post_id}>
                <h2>{title}</h2>
                <p>Posted by: {user}</p>
                <p>{description}</p>
            </button>
        )
    //Normal post is div container
    } else {
        return (
            <div>
                <div className="normal post" id={post_id}>
                    <h2>{title}</h2>
                    <p>Posted by: {user}</p>
                    <p>{description}</p>
                </div>
            </div>
            
        )
    }
    
}

export default Post