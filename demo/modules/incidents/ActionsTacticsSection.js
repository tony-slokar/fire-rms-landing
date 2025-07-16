const ActionsTacticsSection = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
        <CheckboxItem label="Forcible Entry" checked />
        <CheckboxItem label="Primary Search" checked />
        <CheckboxItem label="Secondary Search" checked />
        <CheckboxItem label="Ventilation (PPV)" />
        <CheckboxItem label="Ventilation (Vertical)" checked />
        <CheckboxItem label="Extinguishment" checked />
        <CheckboxItem label="Salvage & Overhaul" checked />
        <CheckboxItem label="Establish Water Supply" checked />
    </div>
);
