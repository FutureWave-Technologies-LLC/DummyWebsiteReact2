import './SettingsComponent.css';

function SettingsComponent(props) {
    const {title, onChange, value, disabled} = props
    return (
        <div className="setting">
            <h3>{title}</h3>
            <input className="settings-input" 
                placeholder='"https://via.placeholder.com/300"'
                onChange={onChange}
                value={value}
                disabled={disabled}
            ></input>
        </div>
        
    )
}

export default SettingsComponent;