import { useState } from "react"

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
                <button className="notification">
                    {notification.user} {notification.text}
                </button>
            ))}
        </div>
    )
}

export default NotificationBar