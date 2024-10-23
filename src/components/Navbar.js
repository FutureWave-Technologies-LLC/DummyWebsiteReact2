import { useNavigate, useSearchParams } from "react-router-dom";
import React, {useState } from 'react';
import { useAuth } from "../hooks/AuthProvider"


import './Navbar.css'

function Navbar() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const navigate = useNavigate()

    const token = JSON.parse(localStorage.getItem("future-token"))
    const user = useAuth()

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchParams({ q: searchQuery })
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
        window.location.reload();
        
    }

    return (
        <form className="navbar" onSubmit={handleSubmit}>
            <h2>New Space</h2>
            <input
                className="search-bar"
                placeholder="Search"
                onChange={(event) => setSearchQuery(event.target.value)}
            ></input>
            <button 
                className="search-btn border border-opacity-100" 
                type="submit"
            >Search</button>
            { user && (
                <h2>Hello, {token.username}!</h2>
            )}
        </form>
    )
}

export default Navbar