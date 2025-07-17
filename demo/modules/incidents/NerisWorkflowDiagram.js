const NerisWorkflowDiagram = ({ completedTabs, activeTab }) => {
    const allTabs = ['Core', 'Location', 'Fire', 'Actions/Tactics', 'Rescue/Casualty', 'Hazards', 'Units', 'Narrative'];
    return (
        <div style={{ background: 'var(--light)', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '25px' }}>
            <h4 style={{ marginTop: 0, marginBottom: '15px', color: 'var(--dark)' }}>Required Modules Workflow</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}>
                {allTabs.map((tab, index) => {
                    const isComplete = completedTabs.includes(tab);
                    const isActive = tab === activeTab;
                    return (
                        <React.Fragment key={tab}>
                            <div style={{
                                padding: '8px 12px',
                                borderRadius: '20px',
                                background: isActive ? 'var(--primary)' : (isComplete ? 'var(--success)' : 'var(--light-gray)'),
                                color: isActive || isComplete ? '#FFFFFF' : 'var(--gray)',
                                fontWeight: '600',
                                fontSize: '12px',
                                border: `1px solid ${isActive ? 'var(--primary)' : (isComplete ? 'var(--success)' : 'var(--light-gray)')}`
                            }}>
                                {isComplete && !isActive ? '✓ ' : ''}{tab}
                            </div>
                            {index < allTabs.length - 1 && <div style={{ color: 'var(--light-gray)', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>-</div>}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};
