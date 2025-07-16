const FormField = ({ label, value, type = 'text', readOnly = false }) => (
    <div>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: colors.dark }}>{label}</label>
        <input type={type} defaultValue={value} readOnly={readOnly} style={{ width: '100%', padding: '10px', border: `1px solid ${colors.lightGray}`, borderRadius: '6px', fontSize: '14px', background: readOnly ? colors.lightGray : colors.white }} />
    </div>
);
