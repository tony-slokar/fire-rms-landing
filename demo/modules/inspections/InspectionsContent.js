const InspectionsContent = ({ isNightMode, onNightModeToggle }) => {
    const [activeTab, setActiveTab] = React.useState('Dashboard');
    const tabs = ['Dashboard', 'All Inspections', 'All Permits'];

    // Mock Data
    const kpis = [
        { label: 'Inspections Due This Month', value: '18' },
        { label: 'Overdue Inspections', value: '4', color: 'var(--danger)' },
        { label: 'Permits Issued This Month', value: '32' },
        { label: 'Open Violations', value: '7', color: 'var(--warning)' },
    ];

    const allInspections = [
        { id: 'I-045', building: 'Main Street Plaza', type: 'Annual', date: '2025-07-20', inspector: 'Cpt. Davis', status: 'Scheduled' },
        { id: 'I-044', building: 'Riverside Apartments', type: 'Complaint', date: '2025-07-18', inspector: 'Lt. Miller', status: 'In Progress' },
        { id: 'I-043', building: 'Tech Manufacturing', type: 'Follow-up', date: '2025-07-15', inspector: 'Cpt. Davis', status: 'Completed' },
        { id: 'I-042', building: 'Downtown Hotel', type: 'Annual', date: '2025-02-10', inspector: 'Lt. Miller', status: 'Overdue' }
    ];

    const allPermits = [
         { id: 'P-221', type: 'Open Burning', address: '123 Rural Route 1', date: '2025-07-18', status: 'Approved' },
        { id: 'P-220', type: 'Fireworks Display', address: 'Town Common', date: '2025-07-04', status: 'Approved' },
        { id: 'P-219', type: 'Blasting Permit', address: 'New Construction Site', date: '2025-07-01', status: 'Expired' },
        { id: 'P-218', type: 'Tent/Canopy', address: '456 River Rd', date: '2025-06-28', status: 'Pending' },
    ];

    const getStatusStyle = (status) => {
        const styles = {
            'Scheduled': { background: 'var(--info)', color: 'white' },
            'In Progress': { background: 'var(--warning)', color: 'white' },
            'Completed': { background: 'var(--success)', color: 'white' },
            'Overdue': { background: 'var(--danger)', color: 'white' },
            'Approved': { background: 'var(--success)', color: 'white' },
            'Expired': { background: 'var(--gray)', color: 'white' },
            'Pending': { background: 'var(--warning)', color: 'white' },
        };
        return styles[status] || {};
    };

    const KpiCard = ({ label, value, color }) => (
        <div style={{ background: 'var(--light)', padding: '20px', borderRadius: '8px', border: `1px solid var(--light-gray)`, textAlign: 'center' }}>
            <div style={{ color: 'var(--gray)', fontSize: '14px', marginBottom: '8px' }}>{label}</div>
            <div style={{ color: color || 'var(--dark)', fontSize: '28px', fontWeight: 'bold' }}>{value}</div>
        </div>
    );

    const DashboardTab = () => (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                {kpis.map(kpi => <KpiCard key={kpi.label} {...kpi} />)}
            </div>
             <h3 style={{ color: 'var(--dark)', marginBottom: '15px' }}>Upcoming & Overdue Inspections</h3>
             {/* We can reuse the InspectionsList component here */}
             <InspectionsList inspections={allInspections.filter(i => i.status !== 'Completed')} />
        </div>
    );

    const InspectionsList = ({ inspections }) => (
        <div style={{ background: 'var(--light)', borderRadius: '8px', padding: '20px', border: `1px solid var(--light-gray)` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--dark)' }}>
                <thead>
                    <tr>
                        {['ID', 'Building', 'Type', 'Date', 'Inspector', 'Status', 'Actions'].map(h => (
                            <th key={h} style={{ borderBottom: `2px solid var(--light-gray)`, padding: '12px', textAlign: 'left', color: 'var(--gray)', fontSize: '12px', textTransform: 'uppercase' }}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {inspections.map(item => (
                        <tr key={item.id}>
                            <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', fontWeight: '600' }}>{item.id}</td>
                            <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{item.building}</td>
                            <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{item.type}</td>
                            <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{item.date}</td>
                            <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{item.inspector}</td>
                            <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>
                                <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', ...getStatusStyle(item.status) }}>
                                    {item.status}
                                </span>
                            </td>
                            <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>
                                <button style={{background: 'var(--light-gray)', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', color: 'var(--dark)'}}>View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const PermitsList = ({ permits }) => (
         <div style={{ background: 'var(--light)', borderRadius: '8px', padding: '20px', border: `1px solid var(--light-gray)` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--dark)' }}>
                 <thead>
                    <tr>
                        {['ID', 'Permit Type', 'Address', 'Date Issued', 'Status', 'Actions'].map(h => (
                            <th key={h} style={{ borderBottom: `2px solid var(--light-gray)`, padding: '12px', textAlign: 'left', color: 'var(--gray)', fontSize: '12px', textTransform: 'uppercase' }}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {permits.map(item => (
                        <tr key={item.id}>
                            <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', fontWeight: '600' }}>{item.id}</td>
                            <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{item.type}</td>
                            <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{item.address}</td>
                            <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{item.date}</td>
                            <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>
                                <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', ...getStatusStyle(item.status) }}>
                                    {item.status}
                                </span>
                            </td>
                            <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>
                                <button style={{background: 'var(--light-gray)', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', color: 'var(--dark)'}}>View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Dashboard': return <DashboardTab />;
            case 'All Inspections': return <InspectionsList inspections={allInspections} />;
            case 'All Permits': return <PermitsList permits={allPermits} />;
            default: return <DashboardTab />;
        }
    };

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