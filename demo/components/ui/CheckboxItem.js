const CheckboxItem = ({ label, checked = false }) => (
    <div style={{ display: 'flex', alignItems: 'center', background: colors.white, padding: '12px', border: `1px solid ${colors.lightGray}`, borderRadius: '6px' }}>
        <input type="checkbox" defaultChecked={checked} style={{ width: '20px', height: '20px', marginRight: '12px', accentColor: colors.primary }} />
        <label>{label}</label>
    </div>
);
