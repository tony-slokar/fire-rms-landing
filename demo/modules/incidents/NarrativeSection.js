const NarrativeSection = () => {
    const [isListening, setIsListening] = React.useState(false);

    return (
        <div style={{position: 'relative'}}>
            <TextArea 
                label="Event Narrative" 
                required={true}
                value="E-1 arrived on scene at 14:06 to find a two-and-a-half story wood-frame single-family dwelling..." 
                rows={12}
            />
            <button onClick={() => setIsListening(!isListening)} style={{ position: 'absolute', top: '40px', right: '10px', background: isListening ? 'var(--danger)' : 'var(--light-gray)', color: isListening ? 'white' : 'var(--dark)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer' }} title="Use Speech-to-Text">
                🎤
            </button>
            {isListening && <span style={{position: 'absolute', top: '48px', right: '55px', background: 'var(--dark)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px'}}>Listening...</span>}
        </div>
    );
};