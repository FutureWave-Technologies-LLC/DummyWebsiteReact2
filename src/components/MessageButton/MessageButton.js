import { useNavigate } from "react-router-dom";

function MessageButton(props) {
    const {userToMessage} = props

    const navigate = useNavigate();

    return (
        <button 
            className="sub1-button" 
            onClick={() => navigate("/messages", { state: { userToMessage: userToMessage } })}
        >Message</button>
    )
}

export default MessageButton;