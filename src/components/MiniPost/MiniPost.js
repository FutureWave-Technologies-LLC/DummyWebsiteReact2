import { useNavigate } from 'react-router-dom';

import "./MiniPost.css"

function Post(props) {
    var charLimit = 120;
    const {post_id, username, title, description, date} = props
    const navigate = useNavigate();

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

    //shorten description if it exceeds char limit
    function shortDescription(descriptionText) {
        let newDescriptionText = descriptionText
        if (descriptionText && descriptionText.length > charLimit) {
            newDescriptionText = descriptionText.substring(0, charLimit) + "..."
        }
        return newDescriptionText
    }

    function navigateToPost() {
        navigate("/post/"+post_id);
    }

    return (
        <button onClick={navigateToPost} className="mini post" id={post_id}>
            <h2>{title}</h2>
            {date && (
                <i>{new Intl.DateTimeFormat('en-US', options).format(new Date(date))}</i>
            )}
            <p>Posted by: {username}</p>
            <p className="description">{shortDescription(description)}</p>
        </button>
    )
    
}

export default Post