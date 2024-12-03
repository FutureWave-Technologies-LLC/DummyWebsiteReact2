import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Comment from '../Comment/Comment';
import "./CommentFeed.css"
import Modal from '../../components/Modal/Modal'

function CommentFeed(props) {
    const {postId, commentId} = props

    const [isReplyFeed, setIsReplyFeed] = useState(false)

    const [commentFeed, setCommentFeed] = useState([])

    const [modalInput, setModalInput] = useState("")
    const [canUseModal, setCanUseModal] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [successPost, setSuccessPost] = useState()

    const token = JSON.parse(localStorage.getItem("future-token"))

    useEffect(() => {
        getCommentFeed()
        
    }, [commentId]);

    function promptNotification(boolean) {
        setSuccessPost(boolean)
        setTimeout(() => setSuccessPost(), 3000)
    }

    function getCommentFeed() {
        //get replies for a comment basd on commentId
        setCommentFeed([])
        if (commentId) {
            setIsReplyFeed(true)
            axios.get("http://3.17.148.157:8000/posts/replies/", {
                params: { comment_id: commentId },
            })
            .then((response) => {
                setCommentFeed(response.data)
            })
            .catch(err => console.error('Error fetching comment feed:', err));
        //get comments for post based on postId
        } else {
            setIsReplyFeed(false)
            axios.get("http://3.17.148.157:8000/posts/comments/", {
                params: { post_id: postId },
            })
            .then((response) => {
                setCommentFeed(response.data)
            })
            .catch(err => console.error('Error fetching comment feed:', err));
        }
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (modalInput.trim() != "") {
            setCanUseModal(false)
            try {
                if (commentId) {
                    await axios.post('http://3.17.148.157:8000/posts/replies/', {
                        user_id: token.user_id,
                        comment_id: commentId,
                        reply: modalInput
                    })
                } else {
                    await axios.post('http://3.17.148.157:8000/posts/comments/', {
                        user_id: token.user_id,
                        post_id: postId,
                        comment: modalInput
                    })
                    
                }
                
                setModalInput("")
                getCommentFeed()
                promptNotification(true)
                
            } catch (error) { 
                promptNotification(false)
            }
            setCanUseModal(true)
        } else {
            promptNotification(false)
        }
    }

    return (
        <div className="comments-container main-color">
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form className='comment-modal' onSubmit={handleCommentSubmit}>
                        <h2>Write Your {commentId ? "Reply": "Comment"}</h2>
                        <input 
                            placeholder={`Type your ${commentId ? "reply" : "comment"} here...`}
                            value={modalInput}
                            onChange={(e) => setModalInput(e.target.value)}
                        />
                        <button disabled={!canUseModal} type="submit">{commentId ? "Reply": "Comment"}</button>
                        {successPost == false && <p className="error">Failed to submit your {commentId ? "reply": "comment"}. Please try again.</p>}
                        {successPost == true && <p className="success">Your {commentId ? "reply": "comment"} has been successfully posted!</p>}
                    </form>
                </Modal>
            )}

            <div className="comments-feed fade-edge">
                {commentFeed.length > 0 ? ((commentId ? commentFeed : [...commentFeed].reverse())
                .map(comment => (
                    <Comment
                        is_main_comment = {comment.main_comment}
                        is_reply = {isReplyFeed}
                        username = {comment.username}
                        user_id = {comment.user_id}
                        profile_image = {comment.profile_image}
                        comment = {comment.comment || comment.reply}
                        creation_date = {comment.creation_date}
                        comment_id = {comment.comment_id}
                        post_id = {postId}
                    ></Comment>
                    
                ))) : (
                    <p>No {commentId ? "replies": "comments"} available.</p>
                )}
            </div> 
            <button className="sub1-button ui-shadow" onClick={() => setShowModal(true)}>{commentId ? "Reply": "Comment"}</button>
        </div>
        
    )
}

export default CommentFeed