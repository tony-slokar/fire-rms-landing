const ToggleSwitch = ({ label, enabled, setEnabled }) => {
    const toggleContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--light)',
        padding: '12px',
        border: `1px solid var(--light-gray)`,
        borderRadius: '6px'
    };
    
    const labelStyle = {
        color: 'var(--dark)',
        fontWeight: 500
    };

    const switchTrackStyle = {
        position: 'relative',
        display: 'inline-block',
        width: '40px',
        height: '24px'
    };

    const switchSliderStyle = {
        position: 'absolute',
        cursor: 'pointer',
        top: 0, left: 0, right: 0, bottom: 0,
        background: enabled ? 'var(--primary)' : 'var(--light-gray)',
        transition: '.4s',
        borderRadius: '34px'
    };

    const switchKnobStyle = {
        position: 'absolute',
        height: '18px',
        width: '18px',
        left: '3px',
        bottom: '3px',
        background: 'white',
        transition: '.4s',
        borderRadius: '50%',
        transform: enabled ? 'translateX(16px)' : 'translateX(0)'
    };

    return (
        <div style={toggleContainerStyle}>
            <label style={labelStyle}>{label}</label>
            <label style={switchTrackStyle}>
                <input type="checkbox" checked={enabled} onChange={() => setEnabled(!enabled)} style={{opacity: 0, width: 0, height: 0}} />
                <span style={switchSliderStyle}>
                    <span style={switchKnobStyle}></span>
                </span>
            </label>
        </div>
    );
};