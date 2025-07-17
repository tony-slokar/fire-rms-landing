const EquipmentContent = ({ isNightMode, onNightModeToggle, onFullScreenToggle }) => {
    const [activeTab, setActiveTab] = React.useState('Apparatus');
    const [showModal, setShowModal] = React.useState(false);
    const tabs = ['Apparatus', 'Equipment', 'Maintenance'];

    const apparatus = [
        { id: 'E-1', name: 'Engine 1', type: 'Pumper', year: '2019', mileage: '45,230', status: 'In Service', lastPM: '2025-06-15', nextPM: '2025-09-15' },
        { id: 'L-1', name: 'Ladder 1', type: 'Aerial Ladder', year: '2021', mileage: '23,180', status: 'In Service', lastPM: '2025-07-01', nextPM: '2025-10-01' },
        { id: 'A-1', name: 'Ambulance 1', type: 'Type I Ambulance', year: '2020', mileage: '67,892', status: 'In Service', lastPM: '2025-07-10', nextPM: '2025-08-10' },
        { id: 'C-1', name: 'Chief 1', type: 'Command Vehicle', year: '2022', mileage: '18,450', status: 'In Service', lastPM: '2025-05-20', nextPM: '2025-08-20' }
    ];

    const equipment = [
        { id: 'EQ-001', name: 'SCBA Pack #1', type: 'Breathing Apparatus', location: 'Engine 1', lastInspection: '2025-07-01', nextDue: '2025-08-01', status: 'Ready' },
        { id: 'EQ-002', name: 'Thermal Camera', type: 'Detection Equipment', location: 'Ladder 1', lastInspection: '2025-06-15', nextDue: '2025-12-15', status: 'Ready' },
        { id: 'EQ-003', name: 'Hydraulic Rescue Tools', type: 'Extrication Equipment', location: 'Engine 1', lastInspection: '2025-07-05', nextDue: '2025-10-05', status: 'Ready' },
        { id: 'EQ-004', name: 'Defibrillator', type: 'Medical Equipment', location: 'Ambulance 1', lastInspection: '2025-07-12', nextDue: '2025-08-12', status: 'Needs Service' }
    ];

    const maintenance = [
        { id: 'M-089', apparatus: 'Engine 1', type: 'Preventive Maintenance', date: '2025-07-20', technician: 'Smith Repairs', status: 'Scheduled', cost: '$850' },
        { id: 'M-088', apparatus: 'Ambulance 1', type: 'Repair - Electrical', date: '2025-07-15', technician: 'Johnson Fleet', status: 'In Progress', cost: '$320' },
        { id: 'M-087', apparatus: 'Ladder 1', type: 'Annual Inspection', date: '2025-07-10', technician: 'Fire Equipment Co', status: 'Completed', cost: '$1,200' },
        { id: 'M-086', apparatus: 'Chief 1', type: 'Oil Change', date: '2025-07-08', technician: 'Quick Lube', status: 'Completed', cost: '$75' }
    ];

    const ApparatusTab = () => (
        <div style={{ background: 'var(--light)', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid var(--light-gray)' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px', color: 'var(--dark)' }}>
                    <thead>
                        <tr>
                            {['Unit ID', 'Name', 'Type', 'Year', 'Mileage', 'Status', 'Last PM', 'Next PM'].map(h => (
                                <th key={h} style={{ borderBottom: `2px solid var(--light-gray)`, padding: '12px', textAlign: 'left', color: 'var(--gray)', fontSize: '14px' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {apparatus.map(unit => (
                            <tr key={unit.id} style={{ cursor: 'pointer' }} onClick={() => setShowModal(true)}>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', fontWeight: '600' }}>{unit.id}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{unit.name}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{unit.type}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', color: 'var(--gray)' }}>{unit.year}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{unit.mileage}</td>
                                <td className="no-wrap" style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>
                                    <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', background: 'var(--success)', color: 'white' }}>
                                        {unit.status}
                                    </span>
                                </td>
                                <td className="no-wrap" style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{unit.lastPM}</td>
                                <td className="no-wrap" style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', color: 'var(--gray)' }}>{unit.nextPM}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const EquipmentTab = () => (
        <div style={{ background: 'var(--light)', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid var(--light-gray)' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px', color: 'var(--dark)' }}>
                    <thead>
                        <tr>
                            {['Equipment ID', 'Name', 'Type', 'Location', 'Last Inspection', 'Next Due', 'Status'].map(h => (
                                <th key={h} style={{ borderBottom: `2px solid var(--light-gray)`, padding: '12px', textAlign: 'left', color: 'var(--gray)', fontSize: '14px' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {equipment.map(item => (
                            <tr key={item.id} style={{ cursor: 'pointer' }}>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', fontWeight: '600' }}>{item.id}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{item.name}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{item.type}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', color: 'var(--gray)' }}>{item.location}</td>
                                <td className="no-wrap" style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{item.lastInspection}</td>
                                <td className="no-wrap" style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{item.nextDue}</td>
                                <td className="no-wrap" style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        background: item.status === 'Ready' ? 'var(--success)' : 'var(--warning)',
                                        color: 'white'
                                    }}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const MaintenanceTab = () => (
        <div style={{ background: 'var(--light)', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid var(--light-gray)' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px', color: 'var(--dark)' }}>
                    <thead>
                        <tr>
                            {['Work Order', 'Apparatus', 'Type', 'Date', 'Technician', 'Status', 'Cost'].map(h => (
                                <th key={h} style={{ borderBottom: `2px solid var(--light-gray)`, padding: '12px', textAlign: 'left', color: 'var(--gray)', fontSize: '14px' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {maintenance.map(work => (
                            <tr key={work.id} style={{ cursor: 'pointer' }}>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', fontWeight: '600' }}>{work.id}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{work.apparatus}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{work.type}</td>
                                <td className="no-wrap" style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{work.date}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', color: 'var(--gray)' }}>{work.technician}</td>
                                <td className="no-wrap" style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        background: work.status === 'Completed' ? 'var(--success)' : work.status === 'In Progress' ? 'var(--warning)' : 'var(--info)',
                                        color: 'white'
                                    }}>
                                        {work.status}
                                    </span>
                                </td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', fontWeight: '600' }}>{work.cost}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const ApparatusDetailModal = () => (
        <Modal onClose={() => setShowModal(false)}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: 'var(--dark)' }}>Engine 1 - Vehicle Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <FormField label="Unit ID" value="E-1" readOnly />
                <FormField label="VIN" value="1FDWE35L98HA12345" />
                <FormField label="Make/Model" value="Pierce Enforcer" />
                <FormField label="Tank Capacity" value="750 gallons" />
                <FormField label="Pump Rating" value="1,500 GPM" />
                <FormField label="Ladder Length" value="35 feet" />
            </div>
            <div style={{ marginTop: '20px' }}>
                <h4 style={{ marginBottom: '10px', color: 'var(--dark)' }}>Recent Maintenance</h4>
                <div style={{ color: 'var(--gray)', fontSize: '14px' }}>
                    Oil Change (07/01/25) • Brake Inspection (06/15/25) • Pump Test (05/20/25)
                </div>
            </div>
        </Modal>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Apparatus': return <ApparatusTab />;
            case 'Equipment': return <EquipmentTab />;
            case 'Maintenance': return <MaintenanceTab />;
            default: return <ApparatusTab />;
        }
    };

    return (
        <div style={{ padding: '25px' }}>
            <PageHeader
                title="Equipment & Asset Management"
                buttonLabel="Add Asset"
                isNightMode={isNightMode}
                onNightModeToggle={onNightModeToggle}
                onFullScreenToggle={onFullScreenToggle}
            />
            <SubNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {renderTabContent()}
            {showModal && <ApparatusDetailModal />}
        </div>
    );
};
