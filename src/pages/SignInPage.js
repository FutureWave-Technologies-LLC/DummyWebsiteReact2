import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignInPage.css'; 

const SignInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        // Handle sign in logic here
    };

    return (
        <div className="signin-container">
            <h2>Welcome Back!</h2>
            <form className="signin-form">
                <input
                    type="text"
                    id="username"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="button" onClick={handleSignIn}>
                    Sign In
                </button>
            </form>

            <p>
                Don't have an account?{' '}
                <Link to="/sign-up">Create an account</Link>
            </p>
        </div>
    );
};

export default SignInPage;