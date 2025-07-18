const CoreSection = () => {
    const [incidentSource, setIncidentSource] = React.useState('CAD');

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <SelectField label="Incident Source" required={true} value={incidentSource} onChange={(e) => setIncidentSource(e.target.value)}>
                <option>CAD</option>
                <option>Manual Entry</option>
            </SelectField>
            <FormField label="Dispatch Number" value={incidentSource === 'CAD' ? 'CAD-2025-004321' : ''} readOnly={incidentSource !== 'CAD'} required={incidentSource === 'CAD'} />
            <FormField label="Incident Number" value="2025-00123" required={true} />
            <FormField label="Incident Date" value="2025-07-18" type="date" required={true} />
            <FormField label="Alarm Date/Time" value="2025-07-18T14:02" type="datetime-local" required={true} />
            <FormField label="Arrival Date/Time" value="2025-07-18T14:06" type="datetime-local" />
        </div>
    );
};