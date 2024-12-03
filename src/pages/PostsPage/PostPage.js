import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Navbar from "../../components/Navbar/Navbar"
import SideBar from "../../components/Sidebar/Sidebar"
import Post from "../../components/Post/Post"
import CommentFeed from "../../components/CommentFeed/CommentFeed"
import Modal from '../../components/Modal/Modal'

import "./PostPage.css"

function PostPage() {
    const { postId, commentId } = useParams()
    const [post, setPost] = useState()

    const [likeResponse, setLikeResponse] = useState("")

    const token = JSON.parse(localStorage.getItem("future-token"))

    useEffect(() => {
        //get post info based on postId
        axios.get("http://3.17.148.157:8000/posts/post/", {
            params: { post_id: postId },
        })
        .then((response) => {
            setPost(response.data)
        })
        .catch(err => console.error('Error fetching post data:', err));
        getLikes()
    }, [postId]);

    function getLikes() {
        //get likes for post based on postId
        axios.get("http://3.17.148.157:8000/posts/likes/", {
            params: { post_id: postId,
                    user_id: token.user_id
             },
        })
        .then((response) => {
            setLikeResponse(response.data)
        })
        .catch(err => console.error('Error fetching like feed:', err));
    }

    const handleLike = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://3.17.148.157:8000/posts/likes/', {
                post_id: postId,
                user_id: token.user_id
            })
            getLikes()
        } catch (error) { 
            console.error('Error to like post:', error)
        }
    }

    return (
        <div className="post-page">
            <Navbar></Navbar>
            <SideBar></SideBar>

            { post && (
                <div>
                    <Post
                        post_id={post.post_id}
                        username={post.username}
                        user_id={post.user_id}
                        media={post.media}
                        title={post.title}
                        description={post.description}
                        date={post.creation_date}
                        likesCount = {likeResponse.total_likes}
                        userLiked = {likeResponse.user_liked}
                        LikeHandler = {handleLike}
                    ></Post>

                    <CommentFeed
                        postId = {postId}
                        commentId = {commentId}
                    ></CommentFeed>
                </div>
                
            )}
        </div>
    )
}

export default PostPage