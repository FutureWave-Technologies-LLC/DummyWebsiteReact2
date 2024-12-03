import { useNavigate } from 'react-router-dom';

import "./ProfileButton.css"

function ProfileButton(props) {
    const {username, user_id, classNames} = props
    const navigate = useNavigate();
    return (
        <button 
            className={`${classNames} profile-btn`}
            onClick={() => {navigate("/profile/"+user_id)}}
        >{username}</button>
    )

}

export default ProfileButton;