import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from 'axios';
import "./MessagesPage.css"; 

function MessagesPage() {
    const [message, setMessage] = useState("");
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);  // Store the selected user for creating chat

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    // Handle message input change
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    // Send a message via the selected chat
    const handleSendMessage = () => {
        if (selectedChat) {
            axios.post('http://localhost:8000/api/messages/send/', {
                chat: selectedChat,
                text: message,
                receiver: selectedUser.id,  // Adjust the receiver as needed
            })
            .then((response) => {
                setMessages([...messages, { text: message, type: 'sent' }]);
                setMessage("");  // Clear the message input
            })
            .catch((error) => {
                console.error("Error sending message:", error);
            });
        }
    };

    // Handle user click: Get chat info or prompt to create chat if not found
    const handleUserClick = (user) => {
        setSelectedUser(user);  // Set selected user to send messages later

        axios.post('http://localhost:8000/api/chat/get/', {
            user1_id: 1,  // Replace with actual logged-in user ID
            user2_id: user.id,  // Selected user ID
        })
        .then((response) => {
            const chatId = response.data.chat_id;
            // Fetch messages for the chat
            axios.get(`http://localhost:8000/api/messages/chat/${chatId}/`)
                .then((response) => {
                    setMessages(response.data.response);  // Set messages from API
                    setSelectedChat(chatId);  // Store the chat ID
                })
                .catch((error) => {
                    console.error("Error fetching messages:", error);
                });
        })
        .catch((error) => {
            if (error.response && error.response.status === 404) {
                console.log("No chat found, user can create a new chat.");
                // No chat found, prompt the user to create a new chat
                setSelectedChat(null);  // No chat exists yet
            } else {
                console.error("Error fetching chat info:", error);
            }
        });
    };

    // Handle creating a new chat
    const handleCreateChat = () => {
        if (selectedUser) {
            axios.post('http://localhost:8000/api/chat/create/', {
                user1_id: 1,  // Replace with actual logged-in user ID
                user2_id: selectedUser.id,  // Selected user ID
            })
            .then((response) => {
                const chatId = response.data.chat_id;
                setSelectedChat(chatId);  // Set the newly created chat ID
                setMessages([]);  // Start with no messages in the new chat
                console.log("Chat created successfully:", chatId);
            })
            .catch((error) => {
                console.error("Error creating chat:", error);
            });
        }
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
                    {selectedUser && !selectedChat && (
                        <div className="create-chat">
                            <h3>No chat found with {selectedUser.name}. Would you like to create a new chat?</h3>
                            <button onClick={handleCreateChat}>Create Chat</button>
                        </div>
                    )}
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
