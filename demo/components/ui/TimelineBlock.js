const TimelineBlock = ({ icon, title, timestamp, children, isAwaitingInput = false }) => {
    const lineStyle = {
        width: '2px',
        backgroundColor: 'var(--light-gray)', // Changed from colors.lightGray
        flexShrink: 0,
        marginLeft: '19px',
        minHeight: '30px'
    };

    const iconWrapperStyle = {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: isAwaitingInput ? 'var(--primary)' : 'var(--secondary)', // Changed
        color: 'white', // Unchanged
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        flexShrink: 0,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* --- Timeline Gutter --- */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={iconWrapperStyle}>{icon}</div>
                <div style={lineStyle}></div>
            </div>
            
            {/* --- Content Card --- */}
            <div style={{ flex: 1, marginLeft: '20px', paddingBottom: '30px' }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                    <h3 style={{ margin: 0, color: 'var(--dark)' }}>{title}</h3> {/* Changed */}
                    {timestamp && <span style={{color: 'var(--gray)', fontSize: '12px', fontWeight: 'bold'}}>{timestamp}</span>} {/* Changed */}
                </div>
                <div style={{ background: 'var(--light)', padding: '20px', borderRadius: '8px', border: `1px solid var(--light-gray)`, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}> {/* Changed */}
                    {children}
                </div>
            </div>
        </div>
    );
};
