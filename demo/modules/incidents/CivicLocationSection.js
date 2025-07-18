const CivicLocationSection = () => {
    const [address, setAddress] = React.useState("455 Main St");
    const [showSuggestions, setShowSuggestions] = React.useState(false);

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
        setShowSuggestions(e.target.value.length > 3);
    };
    
    const handleSuggestionClick = (suggestion) => {
        setAddress(suggestion);
        setShowSuggestions(false);
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{ gridColumn: '1 / -1', position: 'relative' }}>
                <FormField label="Address Line 1" value={address} onChange={handleAddressChange} required={true} />
                {showSuggestions && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--light)', border: '1px solid var(--light-gray)', borderRadius: '6px', zIndex: 100 }}>
                        <div onClick={() => handleSuggestionClick("455 Main St, Anytown, MA")} style={{padding: '10px', cursor: 'pointer', color: 'var(--dark)'}}><b>455 Main St</b>, Anytown, MA</div>
                        <div onClick={() => handleSuggestionClick("45 Main St, Pleasantville, MA")} style={{padding: '10px', cursor: 'pointer', color: 'var(--dark)'}}><b>45 Main St</b>, Pleasantville, MA</div>
                    </div>
                )}
            </div>
            <FormField label="City" value="Anytown" required={true} />
            <SelectField label="State" required={true}>
                {usStatesAndTerritories.map(state => <option key={state} value={state}>{state}</option>)}
            </SelectField>
            <FormField label="Zip Code" value="01234" required={true} />
            <SelectField label="Property Use" required={true}>
                 {Object.entries(propertyUseCodes).map(([code, name]) => <option key={code} value={code}>{`${code} - ${name}`}</option>)}
            </SelectField>
        </div>
    );
};