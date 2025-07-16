const TextArea = ({ label, value, rows = 4 }) => (
    <div>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: colors.dark }}>{label}</label>
        <textarea defaultValue={value} rows={rows} style={{ width: '100%', padding: '10px', border: `1px solid ${colors.lightGray}`, borderRadius: '6px', fontSize: '14px', resize: 'vertical' }}></textarea>
    </div>
);
