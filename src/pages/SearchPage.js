import { useNavigate, useSearchParams } from "react-router-dom"
import React, {useState } from 'react';
import Navbar from "../components/Navbar"
import SideBar from "../components/Sidebar"
import NotificationBar from "../components/NotificationBar"
import axios from 'axios'

function Search() {
    var [hasSearched, setHasSearched] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [queryResult, setQueryResult] = useState([])

    const q = searchParams.get('q')

    if (hasSearched == false) {
        setHasSearched(true)
        axios.get("http://localhost:8000/api/search_users/", {
            params: {
                query: q,
            }
        })
        .then((response) => {
            setQueryResult(response.data)
        })
        .catch((error) => {
            console.error('Error getting data:', error);
        })
    }
      
    return (
        <div className="home-page">
            <Navbar></Navbar>
            <SideBar></SideBar>
            {(!queryResult.error && ( queryResult.map(user => (
                <p>{user.username}</p>
            )))) || <p>{queryResult.Response}</p>}

            <NotificationBar></NotificationBar>
        </div>
    )
}

export default Search