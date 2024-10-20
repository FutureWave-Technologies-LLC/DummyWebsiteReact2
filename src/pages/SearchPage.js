import { useSearchParams } from "react-router-dom"
import React, {useState, useEffect } from 'react';
import Navbar from "../components/Navbar"
import SideBar from "../components/Sidebar"
import './SearchPage.css';
import axios from 'axios'

function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [queryResult, setQueryResult] = useState([])

    const q = searchParams.get('q') || '';
    //hard code users to test
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Alice Johnson' },
        { id: 4, name: 'Bob Brown' },
        { id: 5, name: 'Alice Roe' },
    ]);
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [followedUsers, setFollowedUsers] = useState([]);

    useEffect(() => {
       /* axios.get("http://localhost:8000/api/search_users/", {
            params: {
                query: q,
            }
        })
        .then((response) => {
            setQueryResult(response.data)
        })
        .catch((error) => {
            console.error('Error getting data:', error);
        })*/
    // this is for the test
    const filtered = users.filter(user =>
        user.name.toLowerCase().includes(q.toLowerCase())
    );
    setFilteredUsers(filtered);
}, [q, users]);

    const handleFollow = (userId) => {
        setFollowedUsers([...followedUsers, userId]);
};
return (
    <div>
        <Navbar />
        <SideBar />
        <div className="main-content">
            {filteredUsers.map(user => (
                <div key={user.id} className="user-item">
                    <p className="user-name">{user.name}</p>
                    <button onClick={() => handleFollow(user.id)}>
                            {followedUsers.includes(user.id) ? 'Following' : 'Follow'}
                    </button>
                </div>
            ))}
        </div>
    </div>
);
};

export default Search
    /*return (
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

export default Search*/