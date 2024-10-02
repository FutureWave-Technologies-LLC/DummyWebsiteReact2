import { useState } from "react"
import Notification from "./Notification"

import "./NotificationBar.css"

function NotificationBar() {
    const [notificationFeed, setNotificationFeed] = useState([
        {
            user:"Joe Roe",
            text:"made a new posted!"
        }
    ])

    function createNotificationFeed() {
        //use API
    }

    return (
        <div className="notification-bar">
            {notificationFeed.map(notification => (
                <Notification
                    user={notification.user}
                    text={notification.text}
                ></Notification>
            ))}
        </div>
    )
}

export default NotificationBar