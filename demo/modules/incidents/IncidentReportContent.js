const IncidentReportContent = () => {
    const [activeSection, setActiveSection] = React.useState('Core');
    const sections = ['Core', 'Location', 'Fire', 'Actions/Tactics', 'Rescue/Casualty', 'Hazards', 'Units', 'Narrative'];
    const completedSections = ['Core', 'Location', 'Fire', 'Actions/Tactics', 'Rescue/Casualty', 'Narrative', 'Units', 'Hazards'];
    
    const renderSection = () => {
        const containerStyle = { background: colors.white, padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' };
        switch (activeSection) {
            case 'Core': return <div style={containerStyle}><CoreSection /></div>;
            case 'Location': return <div style={containerStyle}><LocationSection /></div>;
            case 'Fire': return <div style={containerStyle}><FireSection /></div>;
            case 'Actions/Tactics': return <div style={containerStyle}><ActionsTacticsSection /></div>;
            case 'Rescue/Casualty': return <div style={containerStyle}><RescueCasualtySection /></div>;
            case 'Hazards': return <div style={containerStyle}><HazardsSection /></div>;
            case 'Units': return <div style={containerStyle}><UnitsSection /></div>;
            case 'Narrative': return <div style={containerStyle}><NarrativeSection /></div>;
            default: return <div style={containerStyle}><p>Content for Incident Section: <strong>{activeSection}</strong></p></div>;
        }
    };

    return (
        <div style={{padding: '25px'}}>
            <PageHeader title="Incident #2025-00123" buttonLabel="Save Report">
                <div style={{display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap'}}>
                    <span style={{background: colors.danger, color: 'white', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold'}}>Structure Fire</span>
                    <span style={{color: colors.gray, fontSize: '12px'}}>Modules Used: Core, Location, Fire, Actions, Rescue, Hazards, Units, Narrative</span>
                </div>
            </PageHeader>
            <NerisWorkflowDiagram completedTabs={completedSections} activeTab={activeSection} />
            <SubNav tabs={sections} activeTab={activeSection} setActiveTab={setActiveSection} />
            {renderSection()}
            <NerisStatementBox />
        </div>
    );
};
