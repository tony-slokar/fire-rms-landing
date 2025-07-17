const App = () => {
    const [activeTab, setActiveTab] = React.useState('events');
    const [isNightMode, setIsNightMode] = React.useState(false);
    const [isNavHidden, setIsNavHidden] = React.useState(false);

    // Pass the header props to the currently active component
    const contentProps = {
        isNightMode,
        onNightModeToggle: () => setIsNightMode(!isNightMode)
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardContent {...contentProps} />;
            case 'events': return <EventRecordContent {...contentProps} />;
            case 'occupancies': return <OccupanciesContent {...contentProps} />;
            case 'personnel': return <PersonnelContent {...contentProps} />;
            case 'equipment': return <EquipmentContent {...contentProps} />;
            case 'reports': return <PlaceholderContent tabName="reports" {...contentProps} />;
            case 'settings': return <PlaceholderContent tabName="settings" {...contentProps} />;
            default: return <DashboardContent {...contentProps} />;
        }
    };

    const appContainerClass = isNightMode ? 'night-mode' : '';

    const mainContentStyle = {
        flex: 1,
        overflowY: 'auto',
        position: 'relative',
        paddingLeft: isNavHidden ? '70px' : '0'
    };

    return (
        <div className={appContainerClass} style={{ display: 'flex', height: '100%', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ background: 'var(--light)', display: 'flex', height: '100%', width: '100%' }}>
                {!isNavHidden && (
                    <Sidebar 
                        activeTab={activeTab} 
                        setActiveTab={setActiveTab} 
                        onNavToggle={() => setIsNavHidden(!isNavHidden)}
                    />
                )}
                {isNavHidden && (
                     <button 
                        onClick={() => setIsNavHidden(false)} 
                        style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1000, background: 'var(--secondary)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', fontSize: '20px', cursor: 'pointer' }}
                        title="Show Sidebar"
                    >
                        {'☰'}
                    </button>
                )}
                <div style={mainContentStyle}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};
