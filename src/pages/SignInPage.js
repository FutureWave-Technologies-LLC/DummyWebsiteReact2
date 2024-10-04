import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignInPage.css'; 
import axios from 'axios';

const SignInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = () => {
        axios.post("http://3.142.185.208:8000/api/login_page/", {
            username: username,
            password: password,
    })
    .then((response) => {
        if (response.data.error == true){
            console.log(response.data.response)
            setError(response.data.response)
        }
        else {
            window.location.href = 'http://18.222.224.80:3000/home/'
        }
    })
    .catch((error) => {
        console.error('Error posting data:', error);
    });
}

    const queryParams = new URLSearchParams(window.location.search)
    const term = queryParams.get("response")
    console.log(term)
    return (
        <div className="signin-container">
            {term &&<h3>User Created!</h3>}
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
                {error && <h3 style = {{color:"red"}}>{error}</h3>}
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