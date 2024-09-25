
function CredentialInput(props) {
    const {type, setterMethod, stateValue, placeHolder} = props

    function handleInput(event) {
        setterMethod(event.target.value)
    }

    return (
        <input 
            type={type} 
            onChange={handleInput}
            value={stateValue}
            placeholder={placeHolder} 
            minLength="3"
            maxLength="15">
        </input>
    )
}

export default CredentialInput;