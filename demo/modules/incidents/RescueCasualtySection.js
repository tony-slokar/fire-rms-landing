const RescueCasualtySection = () => {
    const [isMasked, setIsMasked] = React.useState(true);
    const nameFieldKey = isMasked ? 'masked-name' : 'unmasked-name';
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px'}}>
                <h4 style={{borderBottom: `1px solid var(--light-gray)`, paddingBottom: '10px', margin: 0, color: 'var(--dark)'}}>Patient 1</h4>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <label htmlFor="pii-toggle" style={{fontWeight: 500, color: 'var(--dark)'}}>Mask PII</label>
                    <label style={{position: 'relative', display: 'inline-block', width: '40px', height: '24px'}}>
                        <input id="pii-toggle" type="checkbox" checked={isMasked} onChange={() => setIsMasked(!isMasked)} style={{opacity: 0, width: 0, height: 0}} />
                        <span style={{position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, background: isMasked ? 'var(--primary)' : 'var(--light-gray)', transition: '.4s', borderRadius: '34px'}}>
                            <span style={{position: 'absolute', height: '18px', width: '18px', left: '3px', bottom: '3px', background: 'white', transition: '.4s', borderRadius: '50%', transform: isMasked ? 'translateX(16px)' : 'translateX(0)'}}></span>
                        </span>
                    </label>
                </div>
            </div>
            {/* The FormField and SelectField components will now correctly inherit the theme */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <FormField key={nameFieldKey} label="Patient Name" value={isMasked ? '**********' : 'John Smith'} readOnly={isMasked} />
                <FormField label="Age" value="68" />
                <SelectField label="Gender">
                    <option>Male</option>
                    <option>Female</option>
                </SelectField>
                <SelectField label="Injury Type">
                    <option>Smoke Inhalation</option>
                    <option>Burns</option>
                    <option>None</option>
                </SelectField>
                <SelectField label="Care Provided">
                    <option>BLS Assessment</option>
                    <option>Oxygen Administered</option>
                </SelectField>
                <SelectField label="Outcome">
                    <option>Transported to Hospital</option>
                    <option>Refused Treatment</option>
                </SelectField>
            </div>
        </div>
    );
};
