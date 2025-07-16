const FireOriginSection = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <SelectField label="Area of Origin">
            <option>Kitchen</option>
            <option>Bedroom</option>
            <option>Garage</option>
            <option>Crawl Space / Attic</option>
        </SelectField>
        <FormField label="Floor of Origin" value="1" />
        <SelectField label="Building Damage">
             <option>Minor (under $1,000)</option>
             <option>Moderate ($1,000 - $10,000)</option>
             <option>Significant ($10,001 - $50,000)</option>
             <option>Major (over $50,000)</option>
        </SelectField>
    </div>
);
