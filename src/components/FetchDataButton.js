import axios from 'axios';
import "./../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './customButton.css';

// buttonText: The text on the button
// API_URL: Django API URL used to fetch data with
// setDataMethod: useState's setterMethod
function FetchDataButton(props) {
    const {buttonText, API_URL, setDataMethod} = props

    // Function to fetch data from Django API
    const fetchData = () => {
        axios.get(API_URL)  // Update with your Django API URL
        .then((response) => {
            setDataMethod(response.data);  // Store the API response in the state
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    };
    return (
        <button className='btn custom-btn ' onClick={fetchData}>{buttonText}</button>
    )
}

export default FetchDataButton;