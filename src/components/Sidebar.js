import './Sidebar.css'
import NavigateButton from '../components/NavigateButton.js'
import { useAuth } from "../hooks/AuthProvider"

function SideBar() {
    const auth = useAuth();

    return (
        <div className="sidebar">
            <NavigateButton
                buttonText="Home"
                path="/home"
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
                path="/"
                bootstrap="border border-opacity-100 bg-danger"
            ></NavigateButton>
        </div>
    )
}

export default SideBar