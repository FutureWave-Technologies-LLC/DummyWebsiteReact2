import './SettingsComponent.css';

function SettingsComponent(props) {
    const {title, onChange, value, disabled, placeholder, isPassword, shortInput} = props
    return (
        <div className="setting">
            <h3>{title}</h3>
            <input 
                type={isPassword ? "password": "text"}
                className={shortInput ? "short-input" : ""}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                disabled={disabled}
            ></input>
        </div>
        
    )
}

export default SettingsComponent;