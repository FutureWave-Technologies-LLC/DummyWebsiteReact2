import { useState } from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios'

import Navbar from "../components/Navbar"
import SideBar from "../components/Sidebar"
import NotificationBar from "../components/NotificationBar"

import "./ProfilePage.css"

function ProfilePage() {

    return (
        <div className="profile-page">
            <Navbar></Navbar>
            <SideBar></SideBar>
            <div className="profile">

            </div>
            <NotificationBar></NotificationBar>
        </div>
    )
}

export default ProfilePage