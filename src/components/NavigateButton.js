import { useNavigate } from 'react-router-dom';

function NavigateButton(props) {
  const {buttonText, path} = props
  
  const navigate = useNavigate();

  const handleClick = () => {
    if (path.includes("https://")) {
      window.location.href = path
    } else {
      navigate(path);
    }
      
  };

  return (
    <button onClick={handleClick}>
          {buttonText}
    </button>
  )
}

export default NavigateButton;