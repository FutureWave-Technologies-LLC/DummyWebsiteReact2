import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Navbar from "../components/Navbar"
import SideBar from "../components/Sidebar"
import NotificationBar from "../components/NotificationBar"
import Post from "../components/Post"
import CommentFeed from "../components/CommentFeed"

import "./PostPage.css"

function PostPage() {
    const { postId } = useParams()
    const [post, setPost] = useState()
    const [comments, setComments] = useState([
        {user: "Alice Roe", commentText: "Wow, so cool"},
        {user: "Alice Roe", commentText: "Wow, so cool"},
        {user: "Alice Roe", commentText: "Wow, so cool"},
        {user: "Alice Roe", commentText: "Wow, so cool"},
    ])

    useEffect(() => {
        //get post info based on postId
         // Fetch followers
         axios.get("http://localhost:8000/api/get_post/", {
            params: { post_id: postId },
        })
        .then((response) => {
            setPost(response.data)
        })
        .catch(err => console.error('Error fetching followers data:', err));
    }, [postId]);

    console.log(post)
    return (
        <div className="post-page">
            <Navbar></Navbar>
            <SideBar></SideBar>
            { post && (
                <Post
                    is_mini={false}
                    post_id={post.post_id}
                    username={post.username}
                    media={post.media}
                    title={post.title}
                    description={post.text}
                ></Post>
            )}
            <CommentFeed
                commentArray={comments}
            ></CommentFeed>
            <NotificationBar></NotificationBar>
        </div>
    )
}

export default PostPage