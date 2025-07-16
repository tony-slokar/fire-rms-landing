const PageHeader = ({ title, children, buttonLabel, onButtonClick }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: colors.dark, margin: 0, marginBottom: '5px' }}>{title}</h2>
            {children}
        </div>
        {buttonLabel && (
            <button onClick={onButtonClick} style={{ background: colors.primary, border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: colors.white, fontWeight: '600' }}>
                {buttonLabel}
            </button>
        )}
    </div>
);
