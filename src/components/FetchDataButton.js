import axios from 'axios';


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
        <button onClick={fetchData}>{buttonText}</button>
    )
}

export default FetchDataButton;