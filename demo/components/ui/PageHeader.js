const PageHeader = ({ title, children, isNightMode, onNightModeToggle }) => {
    const headerActionsStyle = {
        display: 'flex',
        gap: '15px'
        // No margin needed here
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
        // This is the main container. It uses flexbox to separate the title from the buttons.
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 0', width: '100%' }}>
            
            {/* Div for the title and metadata. This will stay on the left. */}
            <div>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: 'var(--dark)', margin: 0 }}>{title}</h2>
                {children}
            </div>
            
            {/* Div for the action buttons. This will stay on the right. */}
            <div style={headerActionsStyle}>
                 <button onClick={onNightModeToggle} style={buttonStyle} title="Toggle Night Mode">
                    {isNightMode ? '☀️' : '🌙'}
                </button>
            </div>
        </div>
    );
};