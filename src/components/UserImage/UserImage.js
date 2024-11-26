import './UserImage.css';

function UserImage(props) {
    const {isSmall, src} = props
    
    return (
        <img 
            className={isSmall ? "small-profile-image" : "profile-image"} 
            src={src ? src : "https://via.placeholder.com/300"}
        ></img>   
    )
}

export default UserImage