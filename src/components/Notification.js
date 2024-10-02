import "./Notification.css"

function Notification(props) {
    const {user, text} = props

    return (
        <button className="notification">{user} {text}</button>
    )
}

export default Notification