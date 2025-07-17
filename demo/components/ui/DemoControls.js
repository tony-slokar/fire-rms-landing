const DemoControls = ({ isNightMode, onNightModeToggle, onFullScreenToggle, onNavToggle }) => {
    const controlWrapperStyle = {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(5px)',
        borderRadius: '25px',
        padding: '10px',
        display: 'flex',
        gap: '10px',
        zIndex: 2000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
    };

    const buttonStyle = {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '20px',
        cursor: 'pointer',
        padding: '5px',
        lineHeight: 1
    };

    return (
        <div style={controlWrapperStyle}>
            <button onClick={onNightModeToggle} style={buttonStyle} title="Toggle Night Mode">
                {isNightMode ? '☀️' : '🌙'}
            </button>
            <button onClick={onNavToggle} style={buttonStyle} title="Toggle Sidebar">
                {'☰'}
            </button>
            <button onClick={onFullScreenToggle} style={buttonStyle} title="Toggle Full Screen">
                {'↔️'}
            </button>
        </div>
    );
};
