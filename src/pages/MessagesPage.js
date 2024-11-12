import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";

import "../css/pages/MessagesPage.css";

function MessagesPage() {
    const location = useLocation();
    const userToMessage = location.state?.userToMessage;
    const [message, setMessage] = useState("");
    const [selectedUser, setSelectedUser] = useState(userToMessage || null);
    const [messages, setMessages] = useState([]);
    const [canSendMessage, setCanSendMessage] = useState(true)
    const token = JSON.parse(localStorage.getItem("future-token"));

    // Fetch messages when a user is selected or userToMessage is passed
    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedUser) {
                try {
                    const response = await axios.get('http://localhost:8000/messaging/message', {
                        params: {
                               sender_id: token.user_id,
                               receiver_id: selectedUser.user_id  // Ensure token is correctly formatted
                        }
                    });
                    const filteredMessages = response.data
                    console.log(filteredMessages)
                    setMessages(filteredMessages);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            }
        };
        fetchMessages();
    }, [selectedUser, token]);

    const handleSendMessage = async () => {
        if (selectedUser && message.trim()) {
            setCanSendMessage(false)
            console.log("Sending message to:", selectedUser.user_id, "Message content:", message);  // Debug log
            try {
                const response = await axios.post(
                    'http://localhost:8000/messaging/message/',
                    {
                        sender_id: token.user_id,
                        receiver_id: selectedUser.user_id,
                        message_text: message,
                    },
                );
                console.log("Message sent successfully:", response.data);  // Debug log
                setMessages([...messages, response.data])
                setMessage("")
            } catch (error) {
                console.error("Error sending message:", error)
                alert("Failed to send the message. Please try again.")
            }
            setCanSendMessage(true)
        } else {
            console.log("Selected user or message is missing");  // Debug log
        }
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    return (
        <div className="messages-page">
            <Navbar />
            <Sidebar />
            <div className="main-content">
                <div className="conversation-list">
                    <div className="conversation-list-header">Conversations</div>
                    <ul>
                        {/* Render available users for conversation here if applicable */}
                        {/* Example: users.map((user) => (
                            <li key={user.name} className="conversation-item" onClick={() => handleUserClick(user)}>
                                {user.name}
                            </li>
                        )) */}
                    </ul>
                </div>
                <div className="chat-area">
                    {selectedUser ? (
                        <>
                            <div className="chat-header">
                                <span>{selectedUser.username}</span>
                            </div>
                            <div className="chat-messages">
                                {messages.length > 0 ? messages.map((msg, index) => (
                                    <div key={index} className={`message ${msg.sender === token.user_id ? 'sent' : 'received'}`}>
                                        {msg.sender === token.user_id ? "You:": selectedUser.username+":"} {msg.message_text}
                                    </div>
                                )).reverse() : <p>No messages yet</p>}
                            </div>
                            <div className="message-input">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={e=>setMessage(e.target.value)}
                                    placeholder="Type your message..."
                                />
                                <button disabled={!canSendMessage} onClick={handleSendMessage}>Send</button>
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
