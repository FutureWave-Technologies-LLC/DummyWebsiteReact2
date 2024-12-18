import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../hooks/AuthProvider"

import "./LoginPage.css"; 

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    

    const navigate = useNavigate()
    const auth = useAuth()

    useEffect(() => {
        if (auth.token) {
            navigate("/home")
        }
    }, [navigate])

    const handleSignIn = async (e) => {
        e.preventDefault()
        axios.get("http://3.17.148.157:8000/users/login/", {
            params: {
                username: username,
                password: password,
            }
        })
        .then((response) => {
            if (response.data.error === true){
                console.log(response.data.response)
                setError(response.data.response)
                setTimeout(() => setError(''), 3000); 
            }
            else {
                //login successful
                auth.loginAction({username, password})
                return
            }
        })
        .catch((error) => {
            console.error('Error posting data:', error);
        });
    }

    const queryParams = new URLSearchParams(window.location.search)
    const term = queryParams.get("response")
    // console.log(term)
    return (
        <section>

        <div className="signin-container">
            {term &&<h3>User Created!</h3>}
            <form className="signin-form">
            <h2 className="text-white">Welcome Back!</h2>
                <input
                    className='credential-input'
                    type="text"
                    id="username"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className='credential-input'
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <h3 style = {{color:"red"}}>{error}</h3>}
                <div className='signin-form'>
                <button className="signin-button" onClick={handleSignIn}>
                    Sign In
                </button>
                </div>
                <div className = "register-link">
                    Don't have an account?{' '}
                    <Link to="/sign-up">Register</Link>
                </div>
            </form>
        </div>
        </section>
    );
};

export default LoginPage