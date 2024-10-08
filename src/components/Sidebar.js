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
                path="/messages"
                bootstrap="border border-opacity-100"
            ></NavigateButton>
            <NavigateButton
                buttonText="Create Post"
                path="/create-post"
                bootstrap="border border-opacity-100"
            ></NavigateButton>
            <NavigateButton
                buttonText="Dummy page"
                path="/"
                bootstrap="border border-opacity-100 bg-danger"
            ></NavigateButton>
        </div>
    )
}

export default SideBar