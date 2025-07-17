const PlaceholderContent = ({ tabName }) => ( 
    <div style={{ padding: '25px', textAlign: 'center' }}>
        <PageHeader title={`${tabName.charAt(0).toUpperCase() + tabName.slice(1)} Module`}
            isNightMode={isNightMode}
            onNightModeToggle={onNightModeToggle}
            onFullScreenToggle={onFullScreenToggle}
        />
        <div style={{ background: colors.white, padding: '40px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginTop: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>
                {{ reports: '📄', settings: '⚙️' }[tabName]}
            </div>
            <h3 style={{ color: colors.dark, marginBottom: '15px' }}>
                {tabName.charAt(0).toUpperCase() + tabName.slice(1)} Management
            </h3>
            <p style={{ color: colors.gray, maxWidth: '400px', margin: '0 auto' }}>
                This module demonstrates {tabName} management capabilities in LadderOps. 
                Click through the other modules to see different features.
            </p>
            {tabName === 'reports' && (
                <div style={{ marginTop: '20px', padding: '15px', background: colors.light, borderRadius: '6px' }}>
                    <p style={{ fontSize: '14px', color: colors.gray }}>
                        ✅ NERIS 2026 reports • Custom dashboards • Data analytics
                    </p>
                </div>
            )}
        </div>
    </div>
);
