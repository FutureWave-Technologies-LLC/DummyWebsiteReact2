import React, { useState } from 'react';
import axios from 'axios';

import CredentialInput from '../components/CredentialInput';

function SignUpPage() {
    const [fname, setfName] = useState("")
    const [lname, setlName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function hasNoWhiteSpace(s) {
        return !(s.indexOf(' ') >= 0)
      }

    function submitCredentials() {
        
        if (hasNoWhiteSpace(username) && hasNoWhiteSpace(password)) {
            axios.post("http://3.142.185.208:8000/api/users/", {
                username: username,
                password: password,
                //TODO: key-values for fname and lname
            })
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error('Error posting data:', error);
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

            <button onClick={submitCredentials}>Sign Up</button>
        </div>
    )
}

export default SignUpPage