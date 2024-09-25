import React, { useState } from 'react';

import CredentialInput from '../components/CredentialInput';

function SignUpPage() {
    const [fname, setFName] = useState("")
    const [lname, setLName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
      }

    function submitCredentials() {
        
        if (!hasWhiteSpace(username) && !hasWhiteSpace(password)) {
            //TODO: POST CREDENTIALS TO DB
            alert(username + "/" + password)
        } else {
            alert ("no whitespace")
        }
        
    }

    return (
        <div className="sign-up">
            <h1>Sign Up</h1>
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

            <button onClick={submitCredentials}>Sign Up</button>
        </div>
    )
}

export default SignUpPage