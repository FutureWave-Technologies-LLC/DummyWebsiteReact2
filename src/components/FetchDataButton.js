import axios from 'axios';

//TODO: Somehow print data to main App.js (done)
function FetchDataButton(props) {
    const {buttonText, API_URL, setDataMethod} = props
    //const [data, setData] = useState([]);  // State to store the fetched data

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