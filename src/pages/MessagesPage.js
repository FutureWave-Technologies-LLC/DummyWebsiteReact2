import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./MessagesPage.css"; 

function MessagesPage() {
    const [message, setMessage] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState({});
    const users = [
        { name: "User1" },
        { name: "User2" },
        { name: "User3" }
    ]; 

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (selectedUser) {
            const newMessages = { ...messages };
            if (!newMessages[selectedUser.name]) {
                newMessages[selectedUser.name] = [];
            }
            newMessages[selectedUser.name].push({ text: message, type: 'sent' });
            setMessages(newMessages);
            setMessage("");
        }
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    return (
        <div className="messages-page">
            <Navbar />
            <Sidebar className="sidebar" />
            <div className="main-content">
                <div className="conversation-list">
                    <div className="conversation-list-header">Conversations</div>
                    <ul>
                        {users.map((user) => (
                            <li key={user.name} className="conversation-item" onClick={() => handleUserClick(user)}>
                                {user.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="chat-area">
                    {selectedUser ? (
                        <>
                            <div className="chat-header">
                                <span>{selectedUser.name}</span>
                                <div>
                                    {/* Add action button*/}
                                </div>
                            </div>
                            <div className="chat-messages">
                                {messages[selectedUser.name] ? messages[selectedUser.name].map((msg, index) => (
                                    <div key={index} className={`message ${msg.type}`}>{msg.text}</div>
                                )) : <p>No messages yet</p>}
                            </div>
                            <div className="message-input">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={handleMessageChange}
                                    placeholder="Type your message..."
                                />
                                <button onClick={handleSendMessage}>Send</button>
                            </div>
                        </>
                    ) : (
                        <h1>Select a user to start messaging</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MessagesPage;
