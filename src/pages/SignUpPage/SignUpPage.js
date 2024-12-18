import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import "./SignUpPage.css"; 

function SignUpPage() {
    const [fname, setfName] = useState("")
    const [lname, setlName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    function hasNoWhiteSpace(s) {
        return !(s.indexOf(' ') >= 0)
      }

    function submitCredentials() {
        
        if (hasNoWhiteSpace(username) && hasNoWhiteSpace(password)
             && hasNoWhiteSpace(fname) && hasNoWhiteSpace(lname)) {
            axios.post("http://3.17.148.157:8000/users/sign_up/", {
                username: username,
                password: password,
                first_name: fname,
                last_name: lname,
            })
                .then((response) => {
                    if (response.data.error === true){
                        console.log(response.data.response)
                        setError(response.data.response)
                    }
                    else {
                        navigate("/login");
                        //window.location.href = 'http://18.222.224.80:3000/login/?response=Created'
                    }
                })
                .catch((error) => {
                    console.error('Error posting data:', error);
                    setError('Unable to create user')
                });
            setTimeout(() => setError(''), 3000); 
        } else {
            alert ("no whitespace")
        }
    }

    return (
        <section>
        <div className="signup-container">
        <div className = "signup-form">
            <h1 className="text-white">Register Here!</h1>
                <input
                    type="text"
                    id="firstname"
                    value={fname}
                    placeholder="First Name"
                    onChange={(e) => setfName(e.target.value)}
                />
                <input
                    type="text"
                    id="lastname"
                    value={lname}
                    placeholder="Last Name"
                    onChange={(e) => setlName(e.target.value)}
                />
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
            <div className = "signup-form">
            <button className ="signup-button" onClick={submitCredentials}>Sign Up</button>
            </div>
            <div className = "login-link">
                Already have an account?{' '}
                <Link to="/login">Log In</Link>
                </div>
            </div>
        </div>

    </section>
    )
}

export default SignUpPage