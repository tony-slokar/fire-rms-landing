const SelectField = ({ label, children, value, onChange }) => (
    <div>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: colors.dark }}>{label}</label>
        <select value={value} onChange={onChange} style={{ width: '100%', padding: '10px', border: `1px solid ${colors.lightGray}`, borderRadius: '6px', fontSize: '14px', background: `url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat right .75rem center / 1.2em 1.2em`, WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none', backgroundColor: colors.white, paddingRight: '2.5rem' }}>
            {children}
        </select>
    </div>
);
