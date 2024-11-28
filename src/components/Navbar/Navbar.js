import { useNavigate, useSearchParams } from "react-router-dom";
import React, {useEffect, useState } from 'react';
import { useAuth } from "../../hooks/AuthProvider"


import './Navbar.css'

function Navbar() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
    const [greetings, setGreetings] = useState("Hello")
    const navigate = useNavigate()

    const token = JSON.parse(localStorage.getItem("future-token"))
    const user = useAuth()

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchParams({ q: searchQuery })
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
        window.location.reload();
    }

    useEffect(() => {
        const currentHour = new Date().getHours()
        if(currentHour < 12) {
            setGreetings("Good Morning")
        }else if (currentHour < 16) {
            setGreetings("Good Afternoon")
        }else if (currentHour < 24) {
            setGreetings("Good Evening")
        }
    }, [])
    

    return (
        <form className="navbar" onSubmit={handleSubmit}>
            <h2 className = "nunito-font">New Space</h2>
            <div className = "search-container">
                <input
                    className="search-bar"
                    placeholder="Search A User"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                ></input>
                <button 
                    className="search-btn border border-opacity-100" 
                    type="submit"
                >Search</button>
            </div>
            { user && (
                <h2 className = "nunito-font"> {greetings}, {token.username}!</h2>
            )}
        </form>
    )
}

export default Navbar