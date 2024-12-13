import NavigateButton from '../NavigateButton/NavigateButton';
import { useAuth } from "../../hooks/AuthProvider";

import './Sidebar.css';

function SideBar() {
    const token = JSON.parse(localStorage.getItem("future-token"));
    const auth = useAuth();

    return (
        <div className="sidebar newspace-border">
            <NavigateButton
                buttonText="Home"
                path="/home"
                bootstrap="rounded"
                iconClass="uil uil-home"
            />
            <NavigateButton
                buttonText="Your Profile"
                path={`/profile/${token.user_id}`}
                bootstrap="rounded"
                iconClass="uil uil-user"
            />
            <NavigateButton
                buttonText="Messages"
                path="/messages"
                bootstrap="rounded"
                iconClass="uil uil-envelope"
            />
            <NavigateButton
                buttonText="Create Post"
                path="/create-post"
                bootstrap="rounded"
                iconClass="uil uil-plus-circle"
            />
            <NavigateButton
                buttonText="User Settings"
                path="/settings"
                bootstrap="rounded"
                iconClass="uil uil-cog"
            />
            <button onClick={() => auth.logOut()} className="log-out rounded main-button ui-shadow">
                <i className="uil uil-sign-out-alt"></i> Log Out
            </button>
            <NavigateButton
                buttonText="Dummy page"
                path="/dum"
                bootstrap="bg-danger rounded"
                iconClass="uil uil-page"
            />
        </div>
    );
}

export default SideBar