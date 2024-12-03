import { useNavigate } from 'react-router-dom';

function NavigateButton(props) {
  const { buttonText, path, bootstrap, iconClass } = props;
  
  const navigate = useNavigate();

  const handleClick = () => {
    if (path.includes("https://")) {
      window.location.href = path;
    } else {
      navigate(path);
      window.location.reload();
    }
  };

  return (
    <button className={`${bootstrap} sub1-button ui-shadow`} onClick={handleClick}>
      {iconClass && <i className={iconClass}></i>} {/* Render the icon if iconClass is provided */}
      {buttonText}
    </button>
  );
}

export default NavigateButton;

// import { useNavigate } from 'react-router-dom';

// function NavigateButton(props) {
//   const {buttonText, path, bootstrap} = props
  
//   const navigate = useNavigate();

//   const handleClick = () => {
//     if (path.includes("https://")) {
//       window.location.href = path
//     } else {
//       navigate(path);
//       window.location.reload();
//     }
      
//   };

//   return (
//     <button className={bootstrap} onClick={handleClick}>
//           {buttonText}
//     </button>
//   )
// }

// export default NavigateButton;