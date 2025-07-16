const FireSection = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <SelectField label="Area of Fire Origin">
            <option>75 - Kitchen</option>
            <option>43 - Bedroom</option>
        </SelectField>
        <SelectField label="Heat Source">
            <option>11 - Cooking Equipment</option>
            <option>53 - Electrical Wiring</option>
        </SelectField>
        <SelectField label="Item First Ignited">
            <option>13 - Cooking Oil/Grease</option>
            <option>51 - Upholstered Furniture</option>
        </SelectField>
    </div>
);
