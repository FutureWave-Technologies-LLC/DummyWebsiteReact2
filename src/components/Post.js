import "./Post.css"

function Post(props) {
    const {is_mini, post_id, user, media, title, description} = props

    //Mini Post is a button
    if (is_mini) {
        var charLimit = 50;
        //shorten description if it exceeds char limit
        function shortDescription(descriptionText) {
            let newDescriptionText = descriptionText
            if (descriptionText.length > charLimit) {
                newDescriptionText = descriptionText.substring(0, charLimit) + "..."
            }
            return newDescriptionText
        }

        function navigateToPost() {
            //TODO: Navigate to Post page filled with respective post info
        }

        return (
            <button onClick={navigateToPost} className="mini post" id={post_id}>
                <h2>{title}</h2>
                <p>Posted by: {user}</p>
                <p>{shortDescription(description)}</p>
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