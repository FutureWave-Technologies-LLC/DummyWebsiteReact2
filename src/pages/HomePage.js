import Navbar from "../components/Navbar"
import SideBar from "../components/Sidebar"
import NotificationBar from "../components/NotificationBar"
import PostFeed from "../components/PostFeed"

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