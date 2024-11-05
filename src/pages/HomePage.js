import Navbar from "../components/Navbar"
import SideBar from "../components/Sidebar"
import NotificationBar from "../components/NotificationBar"
import PostFeed from "../components/PostFeed"


import "../css/pages/HomePage.css"

function HomePage() {
    return (
        <div className="home-container">
            <Navbar></Navbar>
            <SideBar></SideBar>
            <PostFeed></PostFeed>
        </div>
    )
}

export default HomePage