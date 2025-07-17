const CivicLocationSection = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div style={{ gridColumn: '1 / -1' }}>
            <FormField label="Address Line 1" value="455 Main St" />
        </div>
        <FormField label="City" value="Anytown" />
        <FormField label="State" value="MA" />
        <FormField label="Zip Code" value="01234" />
        <FormField label="Apartment / Suite" value="" />
        <FormField label="Cross Street" value="River Rd" />
        <SelectField label="Property Use">
            <option>419 - Single-Family Dwelling</option>
            <option>500 - Mercantile Business</option>
            <option>215 - Hospital</option>
        </SelectField>
        <FormField label="Business / Occupancy Name" value="Riverside Apartments" />
        <div style={{ gridColumn: '1 / -1', borderTop: `1px solid var(--light-gray)`, paddingTop: '20px', marginTop: '10px' }}>
             <h4 style={{marginBottom: '15px', color: 'var(--dark)'}}>Geographic Coordinates</h4>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                <FormField label="Latitude" value="42.3601" />
                <FormField label="Longitude" value="-71.0589" />
                <FormField label="US National Grid" value="19T CH 80252 00191" />
             </div>
        </div>
    </div>
);
