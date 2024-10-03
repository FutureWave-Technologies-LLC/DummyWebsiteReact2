import Navbar from "../components/Navbar"
import SideBar from "../components/Sidebar"
import NotificationBar from "../components/NotificationBar"
import Post from "../components/Post"

function PostPage() {
    const testPost = {
        post_id: 0,
        user: "Joe Roe",
        media: "",
        title: "This is a post",
        description: "My description goes here..."
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
            <NotificationBar></NotificationBar>
        </div>
    )
}

export default PostPage