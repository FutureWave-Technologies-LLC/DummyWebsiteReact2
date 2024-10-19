import { useSearchParams } from "react-router-dom"
import React, {useState, useEffect } from 'react';
import Navbar from "../components/Navbar"
import SideBar from "../components/Sidebar"
import NotificationBar from "../components/NotificationBar"
import axios from 'axios'

function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [queryResult, setQueryResult] = useState([])

    const q = searchParams.get('q')

    useEffect(() => {
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
    }, [])
      
    return (
        <div>
            <Navbar></Navbar>
            <SideBar></SideBar>
            {(!queryResult.error && ( queryResult.map(user => (
                //TODO: COMPONENT WITH FOLLOW BUTTON
                <p>{user.username}</p>
            )))) || <p>{queryResult.Response}</p>}

            <NotificationBar></NotificationBar>
        </div>
    )
}

export default Search