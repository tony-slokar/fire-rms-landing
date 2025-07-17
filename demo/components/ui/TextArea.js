const TextArea = ({ label, value, rows = 4, placeholder = "" }) => (
    <div>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: 'var(--dark)' }}>{label}</label>
        <textarea defaultValue={value} rows={rows} placeholder={placeholder} style={{ width: '100%', padding: '10px', border: `1px solid var(--light-gray)`, borderRadius: '6px', fontSize: '14px', resize: 'vertical', color: 'var(--dark)', background: 'var(--light)' }}></textarea>
    </div>
);
