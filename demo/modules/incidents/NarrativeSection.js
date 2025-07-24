const NarrativeSection = () => {
    const [isListening, setIsListening] = React.useState(false);

    React.useEffect(() => {
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }, [isListening]);

    return (
        <div style={{position: 'relative'}}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--dark)' }}>
                    Event Narrative <span style={{color: 'var(--danger)'}}>*</span>
                </label>
                <button 
                    onClick={() => setIsListening(!isListening)} 
                    style={{ 
                        background: isListening ? 'var(--danger)' : 'var(--light-gray)', 
                        color: isListening ? 'white' : 'var(--dark)', 
                        border: 'none', 
                        width: '32px',
                        height: '32px', 
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        position: 'relative'
                    }} 
                    title="Use Speech-to-Text"
                >
                    <i data-feather="mic" style={{ width: '14px', height: '14px' }}></i>
                    {isListening && (
                        <span style={{
                            position: 'absolute', 
                            top: '0', 
                            right: '40px', 
                            background: 'var(--dark)', 
                            color: 'white', 
                            padding: '6px 10px', 
                            borderRadius: '4px', 
                            fontSize: '11px',
                            fontWeight: '600',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            whiteSpace: 'nowrap'
                        }}>
                            Listening...
                        </span>
                    )}
                </button>
            </div>
            <textarea 
                defaultValue="E-1 arrived on scene at 14:06 to find a two-and-a-half story wood-frame single-family dwelling..." 
                rows={12}
                style={{ 
                    width: '100%', 
                    padding: '10px', 
                    border: `1px solid var(--light-gray)`, 
                    borderRadius: '6px', 
                    fontSize: '14px', 
                    resize: 'vertical', 
                    color: 'var(--dark)', 
                    background: 'var(--light)' 
                }}
            />
        </div>
    );
};