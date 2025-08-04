const InspectionsContent = ({ isNightMode, onNightModeToggle }) => {
    const [activeTab, setActiveTab] = React.useState('Dashboard');
    const tabs = ['Dashboard', 'Inspections', 'Permits', 'Form Builder'];

    // Mock Data
    const upcomingInspections = [
        { id: 'I-045', building: 'Main Street Plaza', type: 'Annual', date: '2025-07-20', inspector: 'Cpt. Davis' },
        { id: 'I-046', building: 'Anytown High School', type: 'Quarterly', date: '2025-07-22', inspector: 'Lt. Miller' },
        { id: 'I-047', building: 'Downtown Hotel', type: 'Follow-up', date: '2025-07-25', inspector: 'Cpt. Davis' },
    ];
    
    const recentPermits = [
        { id: 'P-221', type: 'Open Burning', address: '123 Rural Route 1', date: '2025-07-18', status: 'Approved' },
        { id: 'P-220', type: 'Fireworks Display', address: 'Town Common', date: '2025-07-04', status: 'Approved' },
        { id: 'P-219', type: 'Blasting Permit', address: 'New Construction Site', date: '2025-07-01', status: 'Approved' },
    ];

    const DashboardTab = () => (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <div>
                <h3 style={{ color: 'var(--dark)', marginBottom: '15px' }}>Upcoming Inspections</h3>
                <div style={{ background: 'var(--light)', borderRadius: '8px', padding: '20px', border: `1px solid var(--light-gray)` }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--dark)' }}>
                        <thead>
                            <tr>
                                {['ID', 'Building', 'Date', 'Inspector'].map(h => (
                                    <th key={h} style={{ borderBottom: `2px solid var(--light-gray)`, padding: '10px', textAlign: 'left', color: 'var(--gray)', fontSize: '12px' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {upcomingInspections.map(item => (
                                <tr key={item.id}>
                                    <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '10px', fontWeight: '600' }}>{item.id}</td>
                                    <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '10px' }}>{item.building}</td>
                                    <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '10px' }}>{item.date}</td>
                                    <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '10px' }}>{item.inspector}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                 <h3 style={{ color: 'var(--dark)', marginBottom: '15px' }}>Recent Permits</h3>
                 <div style={{ background: 'var(--light)', borderRadius: '8px', padding: '20px', border: `1px solid var(--light-gray)` }}>
                     <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--dark)' }}>
                        <thead>
                            <tr>
                                {['ID', 'Type', 'Date', 'Status'].map(h => (
                                    <th key={h} style={{ borderBottom: `2px solid var(--light-gray)`, padding: '10px', textAlign: 'left', color: 'var(--gray)', fontSize: '12px' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {recentPermits.map(item => (
                                <tr key={item.id}>
                                    <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '10px', fontWeight: '600' }}>{item.id}</td>
                                    <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '10px' }}>{item.type}</td>
                                    <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '10px' }}>{item.date}</td>
                                    <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '10px' }}>
                                        <span style={{padding: '4px 8px', borderRadius: '12px', fontSize: '12px', background: 'var(--success)', color: 'white'}}>{item.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                     </table>
                 </div>
            </div>
        </div>
    );

    const FormBuilderTab = () => (
         <div style={{ background: 'var(--light)', padding: '30px', borderRadius: '8px', border: `1px solid var(--light-gray)` }}>
            <div style={{textAlign: 'center', maxWidth: '600px', margin: '0 auto'}}>
                <i data-feather="edit" style={{width: '48px', height: '48px', color: 'var(--primary)', marginBottom: '15px'}}></i>
                <h3 style={{ color: 'var(--dark)' }}>Intuitive Form Builder</h3>
                <p style={{ color: 'var(--gray)', marginBottom: '25px' }}>
                    Drag-and-drop to create custom checklists and forms for any inspection or permit type. No coding required.
                </p>
                <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                    Launch Form Builder
                </button>
            </div>
        </div>
    );


    const renderTabContent = () => {
        switch (activeTab) {
            case 'Dashboard': return <DashboardTab />;
            case 'Inspections': return <div>Inspections List Placeholder</div>;
            case 'Permits': return <div>Permits List Placeholder</div>;
            case 'Form Builder': return <FormBuilderTab />;
            default: return <DashboardTab />;
        }
    };

    React.useEffect(() => {
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }, [activeTab]);

    return (
        <div style={{ padding: '25px' }}>
            <PageHeader
                title="Inspections & Permits"
                buttonLabel="New Inspection"
                isNightMode={isNightMode}
                onNightModeToggle={onNightModeToggle}
            />
            <SubNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            <div style={{ marginTop: '25px' }}>
                {renderTabContent()}
            </div>
        </div>
    );
};