import { render, screen } from '@testing-library/react';
import Post from '../Post'
import { BrowserRouter } from 'react-router-dom';

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
            <Post/>
        </BrowserRouter>
    )
}

test('renders a post and find like button', async () => {
    render(<MockPost/>)
    const postElement = screen.getByRole("button", {name: "Like"})
    expect(postElement).toBeInTheDocument()
})