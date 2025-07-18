const FormField = ({ label, value, type = 'text', readOnly = false, required = false, onChange = () => {} }) => (
    <div>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: 'var(--dark)' }}>
            {label} {required && <span style={{color: 'var(--danger)'}}>*</span>}
        </label>
        <input type={type} value={value} readOnly={readOnly} onChange={onChange} style={{ width: '100%', padding: '10px', border: `1px solid var(--light-gray)`, borderRadius: '6px', fontSize: '14px', color: 'var(--dark)', background: readOnly ? 'var(--light-gray)' : 'var(--light)' }} />
    </div>
);