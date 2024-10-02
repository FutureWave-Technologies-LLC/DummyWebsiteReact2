import Navbar from "../components/Navbar"
import SideBar from "../components/Sidebar"
import PostFeed from "../components/PostFeed"
import NotificationBar from "../components/NotificationBar"

function HomePage() {
    return (
        <div className="home-page">
            <Navbar></Navbar>
            <SideBar></SideBar>
            <PostFeed></PostFeed>
            <NotificationBar></NotificationBar>
        </div>
    )
}

export default HomePage