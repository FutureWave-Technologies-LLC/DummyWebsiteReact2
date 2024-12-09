import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Post from "../Post"

const MockPost = () => {
    return (
        <BrowserRouter>
            {/* <Post
                is_mini={true}
                post_id={1}
                username={"bryce"}
                title={"post title"}
                description={"post description"}
                date={"2024-11-12 19:49:17.951976"}
            /> */}
            <Post
                post_id={1}
                username={"bryce"}
                user_id={1}
                media={null}
                title={"title"}
                description={"description"}
                date={"2024-11-12 19:49:17.951976"}
                likesCount = {3}
                userLiked = {false}
                LikeHandler = {null}
            ></Post>
            <Post/>
        </BrowserRouter>
    )
}

test('Renders Post, Find Like Button', async () => {
    render(<MockPost/>)
    const postElement = screen.getByRole("button", {name: "Likes"})
    expect(postElement).toBeInTheDocument()
})