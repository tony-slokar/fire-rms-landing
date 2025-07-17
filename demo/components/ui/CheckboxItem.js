const CheckboxItem = ({ label, checked = false }) => (
    <div style={{ display: 'flex', alignItems: 'center', background: 'var(--light)', padding: '12px', border: `1px solid var(--light-gray)`, borderRadius: '6px' }}>
        <input type="checkbox" defaultChecked={checked} style={{ width: '20px', height: '20px', marginRight: '12px', accentColor: 'var(--primary)' }} />
        <label style={{color: 'var(--dark)'}}>{label}</label>
    </div>
);
