import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../hooks/AuthProvider";

function SignUpPage() {
    const [fname, setfName] = useState("")
    const [lname, setlName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()
    const auth = useAuth()

    useEffect(() => {
        if (auth.token) {
            navigate("/home")
        }
    }, [navigate])

    function hasNoWhiteSpace(s) {
        return !(s.indexOf(' ') >= 0)
    }

    function submitCredentials() {
        
        if (hasNoWhiteSpace(username) && hasNoWhiteSpace(password)
             && hasNoWhiteSpace(fname) && hasNoWhiteSpace(lname)) {
            axios.post("http://3.142.185.208:8000/api/sign_up/", {
                username: username,
                password: password,
                first_name: fname,
                last_name: lname,
            })
                .then((response) => {
                    if (response.data.error == true){
                        console.log(response.data.response)
                        setError(response.data.response)
                    }
                    else {
                        window.location.href = 'http://18.222.224.80:3000/sign-in/?response=Created'
                    }
                })
                .catch((error) => {
                    console.error('Error posting data:', error);
                    setError('Unable to create user')
                });
        } else {
            alert ("no whitespace")
        }
    }

    return (
        <div className="App">
            <h1>Sign Up</h1>
            <div>
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
            </div>
            <div>
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
            </div>
            {error && <h3 style = {{color:"red"}}>{error}</h3>}
            <button onClick={submitCredentials}>Sign Up</button>
        </div>
    )
}

export default SignUpPage