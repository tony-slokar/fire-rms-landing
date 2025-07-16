const FireSuppressionSection = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <SelectField label="Automatic Extinguishing System (AES) Presence">
            <option>AES Present</option>
            <option>AES Not Present</option>
            <option>Undetermined</option>
        </SelectField>
        <SelectField label="AES Type">
            <option>Wet-pipe Sprinkler System</option>
            <option>Dry-pipe Sprinkler System</option>
            <option>Foam System</option>
            <option>Clean Agent System</option>
        </SelectField>
        <SelectField label="AES Performance">
            <option>System performed as expected</option>
            <option>System failed to operate</option>
            <option>System operated but was ineffective</option>
        </SelectField>
        <TextArea label="Suppression Remarks" placeholder="Describe the effectiveness of suppression systems and actions..." />
    </div>
);
