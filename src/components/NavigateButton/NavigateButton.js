import { useNavigate } from 'react-router-dom';

function NavigateButton(props) {
  const { buttonText, path, bootstrap, iconClass } = props;
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
    window.location.reload();
  };

  return (
    <button className={`${bootstrap} main-button ui-shadow`} onClick={handleClick}>
      {iconClass && <i className={iconClass}></i>} {/* Render the icon if iconClass is provided */}
      {buttonText}
    </button>
  );
}

export default NavigateButton;