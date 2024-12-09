import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import axios from "axios";

import "./MessagesPage.css";

function MessagesPage() {
    const location = useLocation();
    const userToMessage = location.state?.userToMessage;
    
    const [socket, setSocket] = useState(null)

    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(userToMessage || -1);

    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [canSendMessage, setCanSendMessage] = useState(false)

    const token = JSON.parse(localStorage.getItem("future-token"));

    const divRef = useRef(null);

    useEffect(() => {
        //Get list of users that follow each other
        axios.get("http://localhost:8000/messaging/messagable_users/", {
            params: { user_id: token.user_id },
          })
          .then((response) => {
            setUsers(response.data)
          })
          .catch((err) => console.error('Error fetching post data:', err))
    }, []);

    useEffect(() => {
        setCanSendMessage(false)
        //get message history
        axios.get("http://localhost:8000/messaging/message/", {
            params: { 
                sender_id: token.user_id,
                receiver_id: selectedUser.user_id
             },
        })
        .then((response) => {
            setMessages(response.data)
            setCanSendMessage(true)
        })
        .catch((err) => console.error('Error fetching post data:', err))

        //Websocket implementation
        if (selectedUser != -1) {
            console.log(token.user_id, selectedUser.user_id)
            const wsUrl = `ws://localhost:8000/ws/chat/${token.user_id}/${selectedUser.user_id}/`;
            const chatSocket = new WebSocket(wsUrl);

            if (chatSocket.readyState === 0) {
                console.log("WebSocket is connecting", selectedUser.user_id);
            }

            chatSocket.onopen = () => {
                console.log("WebSocket connection opened.", selectedUser.user_id);
            };

            chatSocket.onmessage = (event) => {
                const data = JSON.parse(event.data)
                // console.log("Update message feed", [...messages, data])
                
                setMessages((prevMessages) => [...prevMessages, data])
                setCanSendMessage(true)
            };
    
            chatSocket.onclose = () => {
                console.log("WebSocket connection closed.", selectedUser.user_id);
            };
            setSocket(chatSocket)
    
            // Cleanup on component unmount
            return () => chatSocket.close();
        }
    }, [token.user_id, selectedUser.user_id]);

    //scroll to the bottom, latest message 
    useEffect(() => {
        if (divRef.current) { divRef.current.scrollIntoView({ behavior: 'smooth' }) }
    }, [canSendMessage])
    
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (socket && selectedUser && inputMessage.trim()) {
            setCanSendMessage(false)
            console.log("Sending to ID", selectedUser.user_id, "MESSAGE:", inputMessage);  // Debug log
            try {
                //send JSON string for consumer to take
                socket.send(JSON.stringify({
                    sender_id: token.user_id,
                    receiver_id: selectedUser.user_id,
                    message_text: inputMessage
                }))
                console.log("Message sent successfully!");  
                setInputMessage("")
            } catch (error) {
                console.error("Error sending message:", error)
                alert("Failed to send the message. Please try again.")
            }
        } else {
            console.log("Selected user or message is missing");
        }
    }
    
    const handleUserClick = (user) => {
        if (user != selectedUser) {
            setMessages("")
            setSelectedUser(user)
        }
    }

    return (
        <div className="messages-page">
            <Navbar />
            <Sidebar />
            <div className="messaging-content">
                {/* Userlist to have a conversation */}
                <div className="conversation-list">
                    <div className="conversation-list-header">Conversations</div>
                    {/* Render available users for conversation here if applicable */}
                    {users ? users.map((user) => (
                        <button 
                            className="main-button conversation-user-btn" 
                            onClick={() => handleUserClick(user)}
                            disabled={!canSendMessage}> 
                            <div className="conversation-item">
                                <ProfileImage isSmall={true} src={user.profile_image}></ProfileImage>
                                <p>{user.username}</p>
                            </div>
                            
                        </button>
                     )) : ( <p>You must have mutual following to message a user.</p> )}
                </div>

                {/* The actual conversation */}
                <div className="chat-area">
                    {selectedUser != -1 ? (
                        <form onSubmit={handleSendMessage}>
                            <div className="chat-header">
                                <span>{selectedUser.username}</span>
                            </div>
                            <div className="chat-messages ui-shadow">
                               
                                {messages.length > 0 ? messages.map((msg, index) => (
                                    <div key={index} className={`message ${msg.sender_id === token.user_id ? 'sent' : 'received'}`}>
                                        {msg.sender_id === token.user_id ? "You:": selectedUser.username+":"} {msg.message_text}
                                    </div>
                                )) : (<p>No messages in this conversation.</p>)}
                                <div ref={divRef} />
                            </div>
                            <div className="message-input">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    disabled={!canSendMessage}
                                    onChange={e=>setInputMessage(e.target.value)}
                                    placeholder="Type your message"
                                />
                                <button type="submit" className="ui-shadow send-btn" disabled={!canSendMessage}>Send</button>
                            </div>
                        </form>
                    ) : (<h1>Select a user to message</h1>)}
                </div>
            </div>
        </div>
    );
}

export default MessagesPage;
