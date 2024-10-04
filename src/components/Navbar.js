import './Navbar.css'

import { useAuth } from "../hooks/AuthProvider"

function Navbar() {
    const user = useAuth()
    return (
        <div className="navbar">
            <h2>New Space</h2>
            <input
                className="search-bar"
                placeholder="Search">
            </input>
            { user && (
                <h2>Hello, {user.username}!</h2>
            )}
            
        </div>
    )
}

export default Navbar