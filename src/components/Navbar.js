import './Navbar.css'

import { useAuth } from "../hooks/AuthProvider"

function Navbar() {
    const token = JSON.parse(localStorage.getItem("future-token"))
    const user = useAuth()
    return (
        <div className="navbar">
            <h2>New Space</h2>
            <input
                className="search-bar"
                placeholder="Search">
            </input>
            { user && (
                <h2>Hello, {token.username}!</h2>
            )}
            
        </div>
    )
}

export default Navbar