const PageHeader = ({ title, children, isNightMode, onNightModeToggle, onFullScreenToggle }) => {
    const headerActionsStyle = {
        display: 'flex',
        gap: '15px'
    };

    const buttonStyle = {
        background: 'var(--light-gray)',
        border: 'none',
        color: 'var(--dark)',
        fontSize: '16px',
        cursor: 'pointer',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: 'var(--dark)', margin: 0, marginBottom: '5px' }}>{title}</h2>
                {children}
            </div>
            <div style={headerActionsStyle}>
                 <button onClick={onNightModeToggle} style={buttonStyle} title="Toggle Night Mode">
                    {isNightMode ? '☀️' : '🌙'}
                </button>
                 <button onClick={onFullScreenToggle} style={buttonStyle} title="Toggle Full Screen">
                    {'↔️'}
                </button>
            </div>
        </div>
    );
};
