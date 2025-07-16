const OccupanciesContent = () => {
    const [activeTab, setActiveTab] = React.useState('Buildings');
    const [showModal, setShowModal] = React.useState(false);
    const tabs = ['Buildings', 'Inspections', 'Pre-Plans'];

    const buildings = [
        { id: 'B-001', name: 'Main Street Plaza', address: '123 Main St', type: 'Mercantile', lastInspection: '2024-11-15', nextDue: '2025-11-15', status: 'Compliant' },
        { id: 'B-002', name: 'Riverside Apartments', address: '456 River Rd', type: 'Residential', lastInspection: '2024-09-20', nextDue: '2025-09-20', status: 'Pending' },
        { id: 'B-003', name: 'Tech Manufacturing', address: '789 Industrial Way', type: 'Industrial', lastInspection: '2024-12-01', nextDue: '2025-06-01', status: 'Compliant' },
        { id: 'B-004', name: 'Downtown Hotel', address: '321 Center St', type: 'Assembly', lastInspection: '2024-08-10', nextDue: '2025-02-10', status: 'Overdue' }
    ];

    const inspections = [
        { id: 'I-045', building: 'Main Street Plaza', type: 'Annual', date: '2025-07-20', inspector: 'Inspector Smith', status: 'Scheduled' },
        { id: 'I-044', building: 'Riverside Apartments', type: 'Complaint', date: '2025-07-18', inspector: 'Inspector Jones', status: 'In Progress' },
        { id: 'I-043', building: 'Tech Manufacturing', type: 'Follow-up', date: '2025-07-15', inspector: 'Inspector Brown', status: 'Completed' },
        { id: 'I-042', building: 'Downtown Hotel', type: 'Annual', date: '2025-07-12', inspector: 'Inspector Davis', status: 'Completed' }
    ];

    const prePlans = [
        { id: 'PP-012', building: 'Main Street Plaza', updated: '2024-11-15', hazards: 'Propane storage', access: 'Front/Rear', hydrants: '2 within 300ft' },
        { id: 'PP-013', building: 'Tech Manufacturing', updated: '2024-12-01', hazards: 'Chemical storage, high voltage', access: 'Multiple dock doors', hydrants: '1 within 150ft' },
        { id: 'PP-014', building: 'Downtown Hotel', updated: '2024-08-10', hazards: 'High occupancy, elderly residents', access: 'Front lobby only', hydrants: '3 within 200ft' }
    ];

    const BuildingsTab = () => (
        <div style={{ background: colors.white, padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead>
                        <tr>
                            {['ID', 'Building Name', 'Address', 'Type', 'Last Inspection', 'Next Due', 'Status'].map(h => (
                                <th key={h} style={{ borderBottom: `2px solid ${colors.lightGray}`, padding: '12px', textAlign: 'left', color: colors.gray, fontSize: '14px' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {buildings.map(building => (
                            <tr key={building.id} style={{ cursor: 'pointer' }} onClick={() => setShowModal(true)}>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', fontWeight: '600' }}>{building.id}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{building.name}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', color: colors.gray }}>{building.address}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{building.type}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{building.lastInspection}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{building.nextDue}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        background: building.status === 'Compliant' ? colors.success : building.status === 'Pending' ? colors.warning : colors.danger,
                                        color: colors.white
                                    }}>
                                        {building.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const InspectionsTab = () => (
        <div style={{ background: colors.white, padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                    <thead>
                        <tr>
                            {['ID', 'Building', 'Type', 'Date', 'Inspector', 'Status'].map(h => (
                                <th key={h} style={{ borderBottom: `2px solid ${colors.lightGray}`, padding: '12px', textAlign: 'left', color: colors.gray, fontSize: '14px' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {inspections.map(inspection => (
                            <tr key={inspection.id} style={{ cursor: 'pointer' }}>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', fontWeight: '600' }}>{inspection.id}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{inspection.building}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{inspection.type}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{inspection.date}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', color: colors.gray }}>{inspection.inspector}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        background: inspection.status === 'Completed' ? colors.success : inspection.status === 'In Progress' ? colors.warning : colors.info,
                                        color: colors.white
                                    }}>
                                        {inspection.status}
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
        <div style={{ background: colors.white, padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead>
                        <tr>
                            {['ID', 'Building', 'Last Updated', 'Known Hazards', 'Access Points', 'Hydrant Info'].map(h => (
                                <th key={h} style={{ borderBottom: `2px solid ${colors.lightGray}`, padding: '12px', textAlign: 'left', color: colors.gray, fontSize: '14px' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {prePlans.map(plan => (
                            <tr key={plan.id} style={{ cursor: 'pointer' }}>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', fontWeight: '600' }}>{plan.id}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{plan.building}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{plan.updated}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', color: colors.gray }}>{plan.hazards}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{plan.access}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', color: colors.gray }}>{plan.hydrants}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const BuildingDetailModal = () => (
        <Modal onClose={() => setShowModal(false)}>
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Main Street Plaza</h3>
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
            case 'Inspections': return <InspectionsTab />;
            case 'Pre-Plans': return <PrePlansTab />;
            default: return <BuildingsTab />;
        }
    };

    return (
        <div style={{ padding: '25px' }}>
            <PageHeader title="Occupancy Management" buttonLabel="Add Building" />
            <SubNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {renderTabContent()}
            {showModal && <BuildingDetailModal />}
        </div>
    );
};
