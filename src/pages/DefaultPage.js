import NavigateButton from '../components/NavigateButton.js';

function DefaultPage () {
    return(
        <section>
            <h1>New Space</h1>
            <NavigateButton
                buttonText="Sign Up"
                path="/sign-up"
            ></NavigateButton>

            <NavigateButton
                buttonText="Log In"
                path="/login"
            ></NavigateButton>
        </section>
    )
}

export default DefaultPage;