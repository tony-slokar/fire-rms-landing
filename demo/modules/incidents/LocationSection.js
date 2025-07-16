const LocationSection = () => ( 
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <FormField label="Street Address" value="455 Main St" />
        <FormField label="Apartment/Suite" value="" />
        <FormField label="City" value="Anytown" />
        <FormField label="State" value="MA" />
        <FormField label="Zip Code" value="01234" />
        <SelectField label="Property Use">
            <option>419 - Single-Family Dwelling</option>
            <option>500 - Mercantile Business</option>
        </SelectField>
    </div>
);
