import axios from 'axios';

// buttonText: The text on the button
// API_URL: Django API URL used to post data with
// dataToPost: data to post via axios
//If post successful, prints the response to console
function PostDataButton(props) {
    const {buttonText, API_URL, dataToPost} = props

    const postData = () => {
        axios.post(API_URL, dataToPost)
          .then((response) => {
            console.log(response.data)
          })
          .catch((error) => {
            console.error('Error posting data:', error);
          });
      };

    return (
       <button onClick={postData}>{buttonText}</button> 
    )
}

export default PostDataButton