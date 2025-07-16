const FireSection = () => {
    const [activeSubNav, setActiveSubNav] = React.useState('Cause of Ignition');
    const subNavTabs = ['Cause of Ignition', 'Area of Origin', 'Fire Suppression'];

    const renderFireContent = () => {
        switch (activeSubNav) {
            case 'Cause of Ignition':
                return <FireCauseSection />;
            case 'Area of Origin':
                return <FireOriginSection />;
            case 'Fire Suppression':
                return <FireSuppressionSection />;
            default:
                return <FireCauseSection />;
        }
    };

    return (
        <div>
            <h3 style={{ borderBottom: `2px solid ${colors.lightGray}`, paddingBottom: '10px', marginBottom: '20px' }}>Fire Module</h3>
            <SubNav tabs={subNavTabs} activeTab={activeSubNav} setActiveTab={setActiveSubNav} />
            <div style={{ marginTop: '20px' }}>
                {renderFireContent()}
            </div>
        </div>
    );
};
