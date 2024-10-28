import NavigateButton from '../components/NavigateButton.js';

function DefaultPage () {
    return(
        <div>
            <h1>New Space</h1>
            <NavigateButton
                buttonText="Sign Up"
                path="/sign-up"
            ></NavigateButton>

            <NavigateButton
                buttonText="Login In"
                path="/login"
            ></NavigateButton>
        </div>
    )
}

export default DefaultPage;