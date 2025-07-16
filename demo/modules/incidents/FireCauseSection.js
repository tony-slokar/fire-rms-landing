const FireCauseSection = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <SelectField label="Cause of Ignition">
            <option>Unintentional</option>
            <option>Intentional</option>
            <option>Failure of Equipment or Heat Source</option>
            <option>Natural</option>
            <option>Under Investigation</option>
        </SelectField>
        <SelectField label="Heat Source">
            <option>Cigarette</option>
            <option>Electrical Arcing</option>
            <option>Hot Embers or Ashes</option>
            <option>Sparks from Friction</option>
        </SelectField>
        <SelectField label="Item First Ignited">
            <option>Upholstered Furniture</option>
            <option>Trash / Rubbish</option>
            <option>Cooking Materials</option>
            <option>Flammable Liquid</option>
        </SelectField>
        <TextArea label="Fire Cause Remarks" placeholder="Describe the sequence of events leading to the ignition..." />
    </div>
);
