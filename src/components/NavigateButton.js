import { useNavigate } from 'react-router-dom';

function NavigateButton(props) {
  const {buttonText, path, bootstrap} = props
  
  const navigate = useNavigate();

  const handleClick = () => {
    if (path.includes("https://")) {
      window.location.href = path
    } else {
      navigate(path);
      window.location.reload();
    }
      
  };

  return (
    <button className={bootstrap} onClick={handleClick}>
          {buttonText}
    </button>
  )
}

export default NavigateButton;