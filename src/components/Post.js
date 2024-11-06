import { useNavigate, Link } from 'react-router-dom';

import "../css/components/Post.css"

function Post(props) {
    const {is_mini, post_id, username, user_id, media, title, description, date} = props
    const navigate = useNavigate();
    //Mini Post is a button
    if (is_mini) {
        var charLimit = 90;
        
        //shorten description if it exceeds char limit
        function shortDescription(descriptionText) {
            let newDescriptionText = descriptionText
            if (descriptionText.length > charLimit) {
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
                <p>Posted by: {username}</p>
                <p>{shortDescription(description)}</p>
            </button>
        )
    //Normal post is div container
    } else {
        const options = {
            timeZone: 'America/Los_Angeles',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        // Format the date as "MM-DD-YYYY HH:MM AM/PM"
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(date));
        return (
            <div>
                <div className="normal post" id={post_id}>
                    <h2>{title}</h2>
                    <i>{formattedDate}</i>
                    <p>
                        Posted by:{' '}
                        <Link to={"/profile/"+user_id}>{username}</Link>
                    </p>
                    <p>{description}</p>
                </div>
            </div>
            
        )
    }
    
}

export default Post