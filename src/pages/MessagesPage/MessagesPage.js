import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";

import "./MessagesPage.css";

function MessagesPage() {
    const location = useLocation();
    const userToMessage = location.state?.userToMessage;
    
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(userToMessage || null);

    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [canSendMessage, setCanSendMessage] = useState(true)

    const [isLoading, setIsLoading]= useState(false)

    const token = JSON.parse(localStorage.getItem("future-token"));

    useEffect(() => {
        //Get list of users that follow each other
        axios.get("http://3.17.148.157:8000/messaging/messagable_users/", {
            params: { user_id: token.user_id },
          })
          .then((response) => {
            setUsers(response.data)
          })
          .catch((err) => console.error('Error fetching post data:', err))
    }, []);

    useEffect(() => {
        fetchMessages()
    }, [selectedUser, token]);

     // Fetch messages when a user is selected or userToMessage is passed
     const fetchMessages = async () => {
        // console.log(selectedUser)
        if (selectedUser) {
            try {
                // setIsLoading(true)
                const response = await axios.get('http://3.17.148.157:8000/messaging/message', {
                    params: {
                           sender_id: token.user_id,
                           receiver_id: selectedUser.user_id  // Ensure token is correctly formatted
                    }
                });
                setMessages(response.data)
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        }
        // setIsLoading(false)
    };

    const handleSendMessage = async () => {
        if (selectedUser && inputMessage.trim()) {
            setCanSendMessage(false)
            console.log("Sending message to:", selectedUser.user_id, "Message content:", inputMessage);  // Debug log
            try {
                const response = await axios.post(
                    'http://3.17.148.157:8000/messaging/message/',
                    {
                        sender_id: token.user_id,
                        receiver_id: selectedUser.user_id,
                        message_text: inputMessage,
                    },
                );
                console.log("Message sent successfully:", response.data);  // Debug log
                setMessages([...messages, response.data])
                setInputMessage("")
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
        setMessages("")
        setSelectedUser(user)
    };

    return (
        <div className="messages-page">
            <Navbar />
            <Sidebar />
            
            <div className="messaging-content">
                {/* Userlist to have a conversation */}
                <div className="conversation-list">
                    <div className="conversation-list-header">Conversations</div>
                    {/* Render available users for conversation here if applicable */}
                    {users.map((user) => (
                        <button 
                            className="sub1-button conversation-item" 
                            onClick={() => handleUserClick(user)}
                            disabled={isLoading}
                        > {user.username}</button>
                     ))}
                </div>

                {/* The actual conversation */}
                <div className="chat-area">
                    {selectedUser ? (
                        <>
                            <div className="chat-header">
                                <span>{selectedUser.username}</span>
                            </div>
                            <div className="chat-messages ui-shadow">
                                {messages.length > 0 ? messages.map((msg, index) => (
                                    <div key={index} className={`message ${msg.sender === token.user_id ? 'sent' : 'received'}`}>
                                        {msg.sender === token.user_id ? "You:": selectedUser.username+":"} {msg.message_text}
                                    </div>
                                )) : <p>No messages in this conversation.</p>}
                            </div>
                            <div className="message-input">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    disabled={isLoading}
                                    onChange={e=>setInputMessage(e.target.value)}
                                    placeholder="Type your message..."
                                />
                                <button className="ui shadow" disabled={!canSendMessage || isLoading} onClick={handleSendMessage}>Send</button>
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
