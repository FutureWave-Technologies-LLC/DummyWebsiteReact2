import React, { useState } from 'react';
import axios from 'axios';

import CredentialInput from '../components/CredentialInput';

function SignUpPage() {
    const [fname, setfName] = useState("")
    const [lname, setlName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    function hasNoWhiteSpace(s) {
        return !(s.indexOf(' ') >= 0)
      }

    function submitCredentials() {
        
        if (hasNoWhiteSpace(username) && hasNoWhiteSpace(password)
             && hasNoWhiteSpace(fname) && hasNoWhiteSpace(lname)) {
            axios.post("http://3.142.185.208:8000/api/users/", {
                username: username,
                password: password,
                first_name: fname,
                last_name: lname,
                //TODO: key-values for fname and lname
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
                <CredentialInput
                    type="text"
                    setterMethod={setfName}
                    stateValue={fname}
                    placeHolder="First Name"
                ></CredentialInput>
                <CredentialInput
                    type="text"
                    setterMethod={setlName}
                    stateValue={lname}
                    placeHolder="Last Name"
                ></CredentialInput>
            </div>
            <div>
                <CredentialInput
                    type="text"
                    setterMethod={setUsername}
                    stateValue={username}
                    placeHolder="Username"
                ></CredentialInput>
                <CredentialInput
                    type="password"
                    setterMethod={setPassword}
                    stateValue={password}
                    placeHolder="Password"
                ></CredentialInput>
            </div>
            {error && <h3 style = {{color:"red"}}>{error}</h3>}
            <button onClick={submitCredentials}>Sign Up</button>
        </div>
    )
}

export default SignUpPage