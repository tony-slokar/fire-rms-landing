const OccupanciesContent = ({ isNightMode, onNightModeToggle }) => {
    // UPDATED: Removed Inspections tab. This module is now focused.
    const [activeTab, setActiveTab] = React.useState('Buildings');
    const [showModal, setShowModal] = React.useState(false);
    const tabs = ['Buildings', 'Pre-Plans'];

    const buildings = [
        { id: 'B-001', name: 'Main Street Plaza', address: '123 Main St', type: 'Mercantile', prePlanStatus: 'Complete' },
        { id: 'B-002', name: 'Riverside Apartments', address: '456 River Rd', type: 'Residential', prePlanStatus: 'In Progress' },
        { id: 'B-003', name: 'Tech Manufacturing', address: '789 Industrial Way', type: 'Industrial', prePlanStatus: 'Complete' },
        { id: 'B-004', name: 'Downtown Hotel', address: '321 Center St', type: 'Assembly', prePlanStatus: 'Outdated' }
    ];

    const prePlans = [
        { id: 'PP-012', building: 'Main Street Plaza', updated: '2024-11-15', hazards: 'Propane storage', access: 'Front/Rear', hydrants: '2 within 300ft' },
        { id: 'PP-013', building: 'Tech Manufacturing', updated: '2024-12-01', hazards: 'Chemical storage, high voltage', access: 'Multiple dock doors', hydrants: '1 within 150ft' },
        { id: 'PP-014', building: 'Downtown Hotel', updated: '2024-08-10', hazards: 'High occupancy, elderly residents', access: 'Front lobby only', hydrants: '3 within 200ft' }
    ];

    const BuildingsTab = () => (
        <div style={{ background: 'var(--light)', padding: '20px', borderRadius: '8px', border: '1px solid var(--light-gray)' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px', color: 'var(--dark)' }}>
                    <thead>
                        <tr>
                            {['ID', 'Building Name', 'Address', 'Type', 'Pre-Plan Status'].map(h => (
                                <th key={h} style={{ borderBottom: `2px solid var(--light-gray)`, padding: '12px', textAlign: 'left', color: 'var(--gray)', fontSize: '14px' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {buildings.map(building => (
                            <tr key={building.id} style={{ cursor: 'pointer' }} onClick={() => setShowModal(true)}>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', fontWeight: '600' }}>{building.id}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{building.name}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', color: 'var(--gray)' }}>{building.address}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{building.type}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>
                                     <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        background: building.prePlanStatus === 'Complete' ? 'var(--success)' : building.prePlanStatus === 'In Progress' ? 'var(--info)' : 'var(--warning)',
                                        color: 'white'
                                    }}>
                                        {building.prePlanStatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const PrePlansTab = () => (
         <div style={{ background: 'var(--light)', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid var(--light-gray)' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px', color: 'var(--dark)' }}>
                    <thead>
                        <tr>
                            {['ID', 'Building', 'Last Updated', 'Known Hazards', 'Access Points', 'Hydrant Info'].map(h => (
                                <th key={h} style={{ borderBottom: `2px solid var(--light-gray)`, padding: '12px', textAlign: 'left', color: 'var(--gray)', fontSize: '14px' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {prePlans.map(plan => (
                            <tr key={plan.id} style={{ cursor: 'pointer' }}>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', fontWeight: '600' }}>{plan.id}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{plan.building}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{plan.updated}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', color: 'var(--gray)' }}>{plan.hazards}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{plan.access}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', color: 'var(--gray)' }}>{plan.hydrants}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const BuildingDetailModal = () => (
        <Modal onClose={() => setShowModal(false)}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: 'var(--dark)' }}>Main Street Plaza</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <FormField label="Building ID" value="B-001" readOnly />
                <FormField label="Property Type" value="Mercantile" />
                <FormField label="Occupancy Load" value="150" />
                <FormField label="Construction Type" value="Type V" />
                <FormField label="Square Footage" value="8,500" />
                <FormField label="Number of Stories" value="2" />
            </div>
            <div style={{ marginTop: '20px' }}>
                <TextArea label="Special Hazards/Notes" value="Propane storage in rear area. Kitchen with commercial equipment on second floor. Multiple tenant spaces." rows={3} />
            </div>
        </Modal>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Buildings': return <BuildingsTab />;
            case 'Pre-Plans': return <PrePlansTab />;
            default: return <BuildingsTab />;
        }
    };
    
    return (
        <div style={{ padding: '25px' }}>
            <PageHeader
                title="Occupancy & Pre-Planning"
                buttonLabel="Add Building"
                isNightMode={isNightMode}
                onNightModeToggle={onNightModeToggle}
            />
            <SubNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            <div style={{marginTop: '25px'}}>
                {renderTabContent()}
            </div>
            {showModal && <BuildingDetailModal />}
        </div>
    );
};