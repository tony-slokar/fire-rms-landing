const FormField = ({ label, value, type = 'text', readOnly = false }) => (
    <div>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: 'var(--dark)' }}>{label}</label>
        <input type={type} defaultValue={value} readOnly={readOnly} style={{ width: '100%', padding: '10px', border: `1px solid var(--light-gray)`, borderRadius: '6px', fontSize: '14px', color: 'var(--dark)', background: readOnly ? 'var(--light-gray)' : 'var(--light)' }} />
    </div>
);
