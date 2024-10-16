import Navbar from "../components/Navbar"
import SideBar from "../components/Sidebar"
import NotificationBar from "../components/NotificationBar"

function Search() {
    return (
        <div className="home-page">
            <Navbar></Navbar>
            <SideBar></SideBar>
            <NotificationBar></NotificationBar>
        </div>
    )
}

export default Search