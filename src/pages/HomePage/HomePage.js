import Navbar from "../../components/Navbar/Navbar"
import SideBar from "../../components/Sidebar/Sidebar"
import PostFeed from "../../components/PostFeed/PostFeed"

import "./HomePage.css"

function HomePage() {
    return (
        <div className="home-container">
            <Navbar></Navbar>
            <SideBar></SideBar>
            <PostFeed allPosts={true}></PostFeed>
        </div>
    )
}

export default HomePage