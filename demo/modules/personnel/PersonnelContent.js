const PersonnelContent = ({ isNightMode, onNightModeToggle }) => {
    const [activeTab, setActiveTab] = React.useState('Roster');
    const [showModal, setShowModal] = React.useState(false);
    const tabs = ['Roster', 'Certifications', 'Scheduling'];

    const personnel = [
        { id: 'P-001', name: 'John Davis', rank: 'Captain', station: 'Station 1', shift: 'A', status: 'Active', certExpirations: 2 },
        { id: 'P-002', name: 'Sarah Miller', rank: 'Lieutenant', station: 'Station 1', shift: 'A', status: 'Active', certExpirations: 0 },
        { id: 'P-003', name: 'Mike Johnson', rank: 'Firefighter', station: 'Station 2', shift: 'B', status: 'Active', certExpirations: 1 },
        { id: 'P-004', name: 'Lisa Chen', rank: 'Paramedic', station: 'Station 1', shift: 'A', status: 'Active', certExpirations: 3 },
        { id: 'P-005', name: 'Robert Wilson', rank: 'Engineer', station: 'Station 2', shift: 'C', status: 'Active', certExpirations: 0 }
    ];

    const certifications = [
        { member: 'John Davis', cert: 'Firefighter I/II', issueDate: '2020-03-15', expiration: '2025-03-15', status: 'Expiring Soon' },
        { member: 'John Davis', cert: 'Hazmat Operations', issueDate: '2023-06-10', expiration: '2025-06-10', status: 'Current' },
        { member: 'Sarah Miller', cert: 'Fire Officer I', issueDate: '2022-09-20', expiration: '2027-09-20', status: 'Current' },
        { member: 'Mike Johnson', cert: 'EMT-Basic', issueDate: '2023-01-12', expiration: '2025-01-12', status: 'Expiring Soon' },
        { member: 'Lisa Chen', cert: 'Paramedic', issueDate: '2021-11-05', expiration: '2025-11-05', status: 'Current' },
        { member: 'Lisa Chen', cert: 'ACLS', issueDate: '2024-02-15', expiration: '2025-02-15', status: 'Expiring Soon' },
        { member: 'Lisa Chen', cert: 'PALS', issueDate: '2024-02-15', expiration: '2025-02-15', status: 'Expiring Soon' }
    ];

    const schedule = [
        { date: '2025-07-14', shift: 'A Shift', captain: 'John Davis', lieutenant: 'Sarah Miller', members: 'Johnson, Wilson, Chen' },
        { date: '2025-07-15', shift: 'B Shift', captain: 'Mike Thompson', lieutenant: 'Dave Brown', members: 'Smith, Garcia, Lee' },
        { date: '2025-07-16', shift: 'C Shift', captain: 'Robert Wilson', lieutenant: 'Amy Rodriguez', members: 'Taylor, Anderson, Kim' }
    ];

    const RosterTab = () => (
        <div style={{ background: 'var(--light)', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid var(--light-gray)' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px', color: 'var(--dark)' }}>
                    <thead>
                        <tr>
                            {['ID', 'Name', 'Rank', 'Station', 'Shift', 'Status', 'Cert Alerts'].map(h => (
                                <th key={h} style={{ borderBottom: `2px solid var(--light-gray)`, padding: '12px', textAlign: 'left', color: 'var(--gray)', fontSize: '14px' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {personnel.map(person => (
                            <tr key={person.id} style={{ cursor: 'pointer' }} onClick={() => setShowModal(true)}>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', fontWeight: '600' }}>{person.id}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{person.name}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{person.rank}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', color: 'var(--gray)' }}>{person.station}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{person.shift}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>
                                    <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', background: 'var(--success)', color: 'white' }}>
                                        {person.status}
                                    </span>
                                </td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>
                                    {person.certExpirations > 0 && (
                                        <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', background: 'var(--warning)', color: 'white' }}>
                                            {person.certExpirations} Expiring
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const CertificationsTab = () => (
        <div style={{ background: 'var(--light)', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid var(--light-gray)' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px', color: 'var(--dark)' }}>
                    <thead>
                        <tr>
                            {['Member', 'Certification', 'Issue Date', 'Expiration', 'Status'].map(h => (
                                <th key={h} style={{ borderBottom: `2px solid var(--light-gray)`, padding: '12px', textAlign: 'left', color: 'var(--gray)', fontSize: '14px' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {certifications.map((cert, index) => (
                            <tr key={index}>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', fontWeight: '600' }}>{cert.member}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{cert.cert}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', color: 'var(--gray)' }}>{cert.issueDate}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{cert.expiration}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        background: cert.status === 'Current' ? 'var(--success)' : 'var(--warning)',
                                        color: 'white'
                                    }}>
                                        {cert.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const SchedulingTab = () => (
        <div style={{ background: 'var(--light)', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid var(--light-gray)' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px', color: 'var(--dark)' }}>
                    <thead>
                        <tr>
                            {['Date', 'Shift', 'Captain', 'Lieutenant', 'Additional Members'].map(h => (
                                <th key={h} style={{ borderBottom: `2px solid var(--light-gray)`, padding: '12px', textAlign: 'left', color: 'var(--gray)', fontSize: '14px' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((shift, index) => (
                            <tr key={index}>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', fontWeight: '600' }}>{shift.date}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{shift.shift}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{shift.captain}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px' }}>{shift.lieutenant}</td>
                                <td style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', color: 'var(--gray)' }}>{shift.members}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const PersonnelDetailModal = () => (
        <Modal onClose={() => setShowModal(false)}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: 'var(--dark)' }}>John Davis - Personnel Record</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <FormField label="Employee ID" value="P-001" readOnly />
                <FormField label="Badge Number" value="101" />
                <FormField label="Hire Date" value="2018-03-15" type="date" />
                <FormField label="Department" value="Suppression" />
                <FormField label="Emergency Contact" value="Jane Davis - (555) 123-4567" />
                <FormField label="Phone" value="(555) 987-6543" />
            </div>
            <div style={{ marginTop: '20px' }}>
                <h4 style={{ marginBottom: '10px', color: 'var(--dark)' }}>Current Certifications</h4>
                <div style={{ color: 'var(--gray)', fontSize: '14px' }}>
                    Firefighter I/II (Exp: 2025-03-15) • Hazmat Operations (Exp: 2025-06-10) • CPR (Exp: 2025-12-01)
                </div>
            </div>
        </Modal>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Roster': return <RosterTab />;
            case 'Certifications': return <CertificationsTab />;
            case 'Scheduling': return <SchedulingTab />;
            default: return <RosterTab />;
        }
    };

    return (
        <div style={{ padding: '25px' }}>
            <PageHeader
                title="Personnel Management"
                buttonLabel="Add Member"
                isNightMode={isNightMode}
                onNightModeToggle={onNightModeToggle}
            />
            <SubNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {renderTabContent()}
            {showModal && <PersonnelDetailModal />}
        </div>
    );
};
