const HazardsSection = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
        <CheckboxItem label="Flammable Liquids/Gases" />
        <CheckboxItem label="Explosives/Blasting Agents" />
        <CheckboxItem label="Radioactive Materials" />
        <CheckboxItem label="Chemical Hazards (Corrosives, etc.)" checked />
        <CheckboxItem label="Biohazards" />
        <CheckboxItem label="Electrical Hazard" checked />
    </div>
);
