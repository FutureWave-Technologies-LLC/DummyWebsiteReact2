import './Sidebar.css'
import NavigateButton from '../components/NavigateButton.js'
import { useAuth } from "../hooks/AuthProvider"

function SideBar() {
    const token = JSON.parse(localStorage.getItem("future-token"))
    const auth = useAuth();

    return (
        <div className="sidebar">
            <NavigateButton
                buttonText="Home"
                path="/home"
                bootstrap="border border-opacity-100"
            ></NavigateButton>
            <NavigateButton
                buttonText="Your Profile"
                path= {"/profile/"+token.user_id}
                bootstrap="border border-opacity-100"
            ></NavigateButton>
            <NavigateButton
                buttonText="Messages"
                path="/messages"
                bootstrap="border border-opacity-100"
            ></NavigateButton>
            <NavigateButton
                buttonText="Create Post"
                path="/create-post"
                bootstrap="border border-opacity-100"
            ></NavigateButton>
            <button 
                onClick={() => auth.logOut()} 
                className="log-out border border-opacity-100"
            >Log Out</button>
            <NavigateButton
                buttonText="Dummy page"
                path="/dum"
                bootstrap="border border-opacity-100 bg-danger"
            ></NavigateButton>
        </div>
    )
}

export default SideBar