import './Sidebar.css'
import NavigateButton from '../components/NavigateButton.js';

function SideBar() {
    return (
        <div className="sidebar">
            <NavigateButton
                buttonText="Home"
                path="/home"
                bootstrap="border border-opacity-100"
            ></NavigateButton>
            <NavigateButton
                buttonText="Messages"
                path="/"
                bootstrap="border border-opacity-100"
            ></NavigateButton>
            <NavigateButton
                buttonText="Create Post"
                path="/CreatePost"
                bootstrap="border border-opacity-100"
            ></NavigateButton>
        </div>
    )
}

export default SideBar