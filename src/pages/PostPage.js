import Navbar from "../components/Navbar"
import SideBar from "../components/Sidebar"
import NotificationBar from "../components/NotificationBar"
import Post from "../components/Post"
import CommentFeed from "../components/CommentFeed"

function PostPage() {
    //This object is ONLY here to visualize the post and comment feed
    //Will be deleted later.
    const testPost = {
        post_id: 0,
        user: "Joe Roe",
        media: "",
        title: "This is a post",
        description: "My description goes here.",
        comments: [
            {user: "Alice Roe", commentText: "Wow, so cool"},
            {user: "Alice Roe", commentText: "Wow, so cool"},
            {user: "Alice Roe", commentText: "Wow, so cool"},
            {user: "Alice Roe", commentText: "Wow, so cool"},
        ]
    }

    return (
        <div>
            <Navbar></Navbar>
            <SideBar></SideBar>
            <Post
                is_mini={false}
                post_id={testPost.post_id}
                user={testPost.user}
                media={testPost.media}
                title={testPost.title}
                description={testPost.description}
            ></Post>
            <CommentFeed
                commentArray={testPost.comments}
            ></CommentFeed>
            <NotificationBar></NotificationBar>
        </div>
    )
}

export default PostPage