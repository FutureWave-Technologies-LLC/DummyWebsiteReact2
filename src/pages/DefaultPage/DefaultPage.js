import NavigateButton from '../../components/NavigateButton/NavigateButton';

import "./DefaultPage.css"

function DefaultPage () {
    return(
        <section>
            <div className="default-page">
                <h1>New Space</h1>
                <div>
                    <NavigateButton
                        buttonText="Sign Up"
                        path="/sign-up"
                    ></NavigateButton>

                    <NavigateButton
                        buttonText="Log In"
                        path="/login"
                    ></NavigateButton>
                </div>
            </div>
        </section>
    )
}

export default DefaultPage;