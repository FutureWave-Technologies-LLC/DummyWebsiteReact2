import './Navbar.css'

function Navbar() {
    return (
        <div className="navbar">
            <h2>New Space</h2>
            <input
                className="search-bar"
                placeholder="Search">
            </input>
            <h2>Hello, User!</h2>
        </div>
    )
}

export default Navbar