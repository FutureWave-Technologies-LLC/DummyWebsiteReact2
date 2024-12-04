import './ProfileImage.css';

function ProfileImage(props) {
    const {isSmall, src} = props
    
    return (
        <img 
            className={`profile-image ${isSmall ? "small-profile" : ""}`} 
            src={src ? src : "https://via.placeholder.com/300"}
        ></img>   
    )
}

export default ProfileImage