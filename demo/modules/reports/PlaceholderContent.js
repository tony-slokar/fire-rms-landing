const PlaceholderContent = ({ tabName, isNightMode, onNightModeToggle }) => ( 
    <div style={{ padding: '25px', textAlign: 'center' }}>
        <PageHeader
            title={`${tabName.charAt(0).toUpperCase() + tabName.slice(1)} Module`}
            isNightMode={isNightMode}
            onNightModeToggle={onNightModeToggle}
        />
        <div style={{ background: 'var(--light)', padding: '40px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginTop: '20px', border: '1px solid var(--light-gray)' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>
                {{ reports: '📄', settings: '⚙️' }[tabName] || '🚧'}
            </div>
            <h3 style={{ color: 'var(--dark)', marginBottom: '15px' }}>
                {tabName.charAt(0).toUpperCase() + tabName.slice(1)} Management
            </h3>
            <p style={{ color: 'var(--gray)', maxWidth: '400px', margin: '0 auto' }}>
                This module demonstrates {tabName} management capabilities in LadderOps. 
                Click through the other modules to see different features.
            </p>
        </div>
    </div>
);
