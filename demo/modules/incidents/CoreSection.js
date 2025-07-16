const CoreSection = () => ( 
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}> 
        <FormField label="Incident Number" value="2025-00123" /> 
        <FormField label="Incident Date" value="2025-07-11" type="date" /> 
        <SelectField label="Incident Type">
            <option>111 - Building Fire</option>
            <option>322 - Vehicle Fire</option>
            <option>611 - EMS Call</option>
        </SelectField> 
        <FormField label="Alarm Date/Time" value="2025-07-11T14:02" type="datetime-local" /> 
        <FormField label="Arrival Date/Time" value="2025-07-11T14:06" type="datetime-local" /> 
        <FormField label="Last Unit Cleared" value="2025-07-11T15:30" type="datetime-local" /> 
        <SelectField label="Incident Source">
            <option>CAD</option>
            <option>Manual Entry</option>
        </SelectField> 
    </div>
);
