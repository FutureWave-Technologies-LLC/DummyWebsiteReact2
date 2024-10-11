import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from 'axios';
import "./MessagesPage.css"; 
import { useAuth } from "../hooks/AuthProvider"

function MessagesPage() {
    const token = JSON.parse(localStorage.getItem("future-token"))
    const [message, setMessage] = useState("");
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const websocketRef = useRef(null);  // WebSocket reference

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    // Handle WebSocket connection
    const connectWebSocket = (chatId) => {
        const wsUrl = `ws://localhost:8000/ws/chat/${chatId}/`;
        websocketRef.current = new WebSocket(wsUrl);

        websocketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, { text: data.message, type: 'received' }]);
        };

        websocketRef.current.onclose = () => {
            console.log("WebSocket connection closed");
        };
    };

    // Handle message input change
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    // Send a message via WebSocket
    const handleSendMessage = () => {
        if (websocketRef.current && selectedChat) {
            websocketRef.current.send(JSON.stringify({
                'message': message
            }));
            setMessages([...messages, { text: message, type: 'sent' }]);
            setMessage("");  // Clear the message input
        }
    };

    // Handle user click: Get chat info or create chat if not found
    const handleUserClick = (user) => {
        setSelectedUser(user);

        axios.post('http://localhost:8000/api/chat_get/', {
            user1_id: token.token_id,  // Replace with actual logged-in user ID
            user2_id: user.id,  // Selected user ID
        })
        .then((response) => {
            const chatId = response.data.chat_id;
            connectWebSocket(chatId);  // Connect to WebSocket
            setSelectedChat(chatId);  // Store the chat ID
        })
        .catch((error) => {
            if (error.response && error.response.status === 404) {
                setSelectedChat(null);  // No chat exists yet
            } else {
                console.error("Error fetching chat info:", error);
            }
        });
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
                    {selectedChat && (
                        <>
                            <div className="chat-header">
                                <span>Chat with {selectedUser.name}</span>
                            </div>
                            <div className="chat-messages">
                                {messages.length > 0 ? messages.map((msg, index) => (
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
                    )}
                    {!selectedUser && (
                        <h1>Select a user to start messaging</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MessagesPage;
