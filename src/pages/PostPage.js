import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Navbar from "../components/Navbar"
import SideBar from "../components/Sidebar"
import Post from "../components/Post"
import CommentFeed from "../components/CommentFeed"
import Modal from '../components/Modal'

import "../css/pages/PostPage.css"

function PostPage() {
    const { postId } = useParams()
    const [post, setPost] = useState()
    const [commentFeed, setCommentFeed] = useState([])
    
    const [comment, setComment] = useState("")
    const [canComment, setCanComment] = useState(true)
    const [showCommentModal, setShowCommentModal] = useState(false)
    const [successPost, setSuccessPost] = useState()

    const token = JSON.parse(localStorage.getItem("future-token"))

    useEffect(() => {
        //get post info based on postId
        axios.get("http://3.142.185.208:8000/posts/post/", {
            params: { post_id: postId },
        })
        .then((response) => {
            setPost(response.data)
        })
        .catch(err => console.error('Error fetching followers data:', err));
        getCommentFeed()
    }, [postId]);

    function promptNotification(boolean) {
        setSuccessPost(boolean)
        setTimeout(() => setSuccessPost(), 3000)
    }

    function getCommentFeed() {
        //get comments for post based on postId
        axios.get("http://3.142.185.208:8000/posts/comments/", {
            params: { post_id: postId },
        })
        .then((response) => {
            setCommentFeed(response.data)
        })
        .catch(err => console.error('Error fetching comment feed:', err));
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (comment.trim() != "") {
            setCanComment(false)
            console.log(comment)
            try {
                await axios.post('http://3.142.185.208:8000/posts/comments/', {
                    user_id: token.user_id,
                    post_id: postId,
                    comment: comment
                })
                setComment("")
                getCommentFeed()
                promptNotification(true)
                
            } catch (error) { 
                promptNotification(false)
            }
            setCanComment(true)
        } else {
            promptNotification(false)
        }
    };

    return (
        <div className="post-page">
            <Navbar></Navbar>
            <SideBar></SideBar>
            {showCommentModal && (
                <Modal onClose={() => setShowCommentModal(false)}>
                    <form className='comment-modal' onSubmit={handleCommentSubmit}>
                        <h2>Write Your Comment</h2>
                        <input 
                            placeholder="Type your comment here..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button disabled={!canComment} type="submit">Comment</button>
                        {successPost == false && <p className="error">Failed to submit your comment. Please try again.</p>}
                        {successPost == true && <p className="success">Your comment has been successfully posted!</p>}
                    </form>
                </Modal>
            )}
            { post && (
                <Post
                    is_mini={false}
                    post_id={post.post_id}
                    username={post.username}
                    user_id={post.user_id}
                    media={post.media}
                    title={post.title}
                    description={post.description}
                    date={post.creation_date}
                ></Post>
            )}
            <CommentFeed
                commentFeed={commentFeed}
                openModalSetter={() => setShowCommentModal(true)}
            ></CommentFeed>
            
        </div>
    )
}

export default PostPage