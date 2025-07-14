const InspectionsTab = () => {
        const [showInspectionModal, setShowInspectionModal] = React.useState(false);
        const [selectedInspection, setSelectedInspection] = React.useState(null);

        const InspectionDetailModal = () => {
            const [checklistItems, setChecklistItems] = React.useState([
                { id: 1, item: 'Fire exits clearly marked and unobstructed', checked: true, required: true },
                { id: 2, item: 'Emergency lighting functional', checked: true, required: true },
                { id: 3, item: 'Fire extinguishers properly mounted and charged', checked: false, required: true },
                { id: 4, item: 'Sprinkler system operational', checked: true, required: true },
                { id: 5, item: 'Kitchen hood suppression system serviced', checked: true, required: false },
                { id: 6, item: 'Storageconst OccupanciesContent = () => {
    const [activeTab, setActiveTab] = React.useState('Buildings');
    const [showModal, setShowModal] = React.useState(false);
    const [showAddBuildingModal, setShowAddBuildingModal] = React.useState(false);
    const [selectedBuilding, setSelectedBuilding] = React.useState(null);
    const tabs = ['Buildings', 'Inspections', 'Pre-Plans'];

    const buildings = [
        { id: 'B-001', name: 'Main Street Plaza', address: '123 Main St', type: 'Mercantile', lastInspection: '2024-11-15', nextDue: '2025-11-15', status: 'Compliant', constructionType: 'Type V', occupancyLoad: 150, squareFootage: 8500, stories: 2, hazards: 'Propane storage in rear area. Kitchen with commercial equipment on second floor.' },
        { id: 'B-002', name: 'Riverside Apartments', address: '456 River Rd', type: 'Residential', lastInspection: '2024-09-20', nextDue: '2025-09-20', status: 'Pending', constructionType: 'Type V', occupancyLoad: 48, squareFootage: 12000, stories: 3, hazards: 'Multiple tenant spaces, elderly residents on upper floors.' },
        { id: 'B-003', name: 'Tech Manufacturing', address: '789 Industrial Way', type: 'Industrial', lastconst IncidentReportContent = () => {
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

const IncidentsContent = () => {
    const [activeTab, setActiveTab] = React.useState('Current Incidents');
    const [showModal, setShowModal] = React.useState(false);
    const [showNewIncidentModal, setShowNewIncidentModal] = React.useState(false);
    const [selectedIncident, setSelectedIncident] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState('');
    const tabs = ['Current Incidents', 'CAD Feed', 'All Incidents'];

    // Sample data for different incident views
    const currentIncidents = [
        { id: '2025-00123', type: '111 - Building Fire', address: '455 Main St', status: 'In Progress', units: 'E-1, L-1, C-1', time: '14:02', priority: 'High' },
        { id: '2025-00124', type: '322 - Vehicle Fire', address: 'Highway 101 MM 15', status: 'En Route', units: 'E-2', time: '14:15', priority: 'Medium' },
        { id: '2025-00125', type: '611 - EMS Call', address: '789 Oak Ave', status: 'On Scene', units: 'A-1', time: '14:20', priority: 'Low' }
    ];

    const cadFeed = [
        { id: 'CAD-2025-789', type: '322 - Vehicle Accident with Injury', address: 'Main St & 2nd Ave', time: '14:25', units: 'Available for Assignment', relevantUnits: ['E-1', 'A-1'], priority: 'High' },
        { id: 'CAD-2025-790', type: '554 - Water Rescue', address: 'Riverside Park', time: '14:30', units: 'Available for Assignment', relevantUnits: ['E-2', 'R-1'], priority: 'High' },
        { id: 'CAD-2025-791', type: '745 - Alarm Activation', address: '123 Business Plaza', time: '14:32', units: 'Available for Assignment', relevantUnits: ['E-1'], priority: 'Low' }
    ];

    const allIncidents = [
        { id: '2025-00123', type: '111 - Building Fire', address: '455 Main St', date: '2025-07-11', status: 'Open', officer: 'Capt. Davis' },
        { id: '2025-00122', type: '322 - Vehicle Fire', address: 'Highway 101', date: '2025-07-11', status: 'Closed', officer: 'Lt. Miller' },
        { id: '2025-00121', type: '554 - Person in Water', address: 'City Marina', date: '2025-07-10', status: 'Closed', officer: 'Capt. Wilson' },
        { id: '2025-00120', type: '611 - EMS Call', address: '567 Pine St', date: '2025-07-10', status: 'Closed', officer: 'Lt. Johnson' },
        { id: '2025-00119', type: '111 - Building Fire', address: '890 Industrial Dr', date: '2025-07-09', status: 'Closed', officer: 'Capt. Davis' }
    ];

    const CurrentIncidentsTab = () => (
        <div style={{ background: colors.white, padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ fontSize: '24px', color: colors.success }}>🔴</div>
                <div>
                    <h4 style={{ margin: 0, color: colors.dark }}>Active Incidents</h4>
                    <p style={{ margin: 0, color: colors.gray, fontSize: '14px' }}>Incidents currently in progress</p>
                </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                    <thead>
                        <tr>
                            {['Incident #', 'Type', 'Address', 'Status', 'Units', 'Time', 'Priority', 'Actions'].map(h => (
                                <th key={h} style={{ borderBottom: `2px solid ${colors.lightGray}`, padding: '12px', textAlign: 'left', color: colors.gray, fontSize: '14px' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentIncidents.map(incident => (
                            <tr key={incident.id} style={{ cursor: 'pointer' }}>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', fontWeight: '600' }}>{incident.id}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{incident.type}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', color: colors.gray }}>{incident.address}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        background: incident.status === 'In Progress' ? colors.warning : incident.status === 'En Route' ? colors.info : colors.success,
                                        color: colors.white
                                    }}>
                                        {incident.status}
                                    </span>
                                </td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', color: colors.gray }}>{incident.units}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{incident.time}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        background: incident.priority === 'High' ? colors.danger : incident.priority === 'Medium' ? colors.warning : colors.success,
                                        color: colors.white
                                    }}>
                                        {incident.priority}
                                    </span>
                                </td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>
                                    <button 
                                        onClick={() => {setSelectedIncident(incident); setShowModal(true);}}
                                        style={{ background: colors.primary, border: 'none', padding: '6px 12px', borderRadius: '4px', color: colors.white, fontSize: '12px', cursor: 'pointer' }}
                                    >
                                        View Report
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const CADFeedTab = () => (
        <div style={{ background: colors.white, padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ fontSize: '24px', color: colors.info }}>📡</div>
                <div>
                    <h4 style={{ margin: 0, color: colors.dark }}>CAD Integration Feed</h4>
                    <p style={{ margin: 0, color: colors.gray, fontSize: '14px' }}>Real-time incidents from dispatch - click to accept and begin reporting</p>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors.success }}></div>
                    <span style={{ fontSize: '12px', color: colors.gray }}>Connected</span>
                </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                    <thead>
                        <tr>
                            {['CAD ID', 'Type', 'Address', 'Time', 'Relevant Units', 'Priority', 'Actions'].map(h => (
                                <th key={h} style={{ borderBottom: `2px solid ${colors.lightGray}`, padding: '12px', textAlign: 'left', color: colors.gray, fontSize: '14px' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {cadFeed.map(cadItem => (
                            <tr key={cadItem.id} style={{ cursor: 'pointer' }}>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', fontWeight: '600' }}>{cadItem.id}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{cadItem.type}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', color: colors.gray }}>{cadItem.address}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{cadItem.time}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>
                                    {cadItem.relevantUnits.map(unit => (
                                        <span key={unit} style={{ background: colors.lightGray, padding: '2px 6px', borderRadius: '10px', fontSize: '11px', marginRight: '4px' }}>
                                            {unit}
                                        </span>
                                    ))}
                                </td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        background: cadItem.priority === 'High' ? colors.danger : colors.success,
                                        color: colors.white
                                    }}>
                                        {cadItem.priority}
                                    </span>
                                </td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>
                                    <button 
                                        onClick={() => {setSelectedIncident({...cadItem, fromCAD: true}); setShowModal(true);}}
                                        style={{ background: colors.success, border: 'none', padding: '6px 12px', borderRadius: '4px', color: colors.white, fontSize: '12px', cursor: 'pointer', marginRight: '5px' }}
                                    >
                                        Accept & Report
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const AllIncidentsTab = () => {
        const filteredIncidents = allIncidents.filter(incident => 
            incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            incident.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            incident.address.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div style={{ background: colors.white, padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                    <div>
                        <h4 style={{ margin: 0, color: colors.dark }}>All Incidents</h4>
                        <p style={{ margin: 0, color: colors.gray, fontSize: '14px' }}>Search and manage all incident reports</p>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search incidents..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ 
                            padding: '8px 12px', 
                            border: `1px solid ${colors.lightGray}`, 
                            borderRadius: '6px', 
                            width: '250px',
                            fontSize: '14px'
                        }} 
                    />
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                        <thead>
                            <tr>
                                {['Incident #', 'Type', 'Address', 'Date', 'Status', 'Officer', 'Actions'].map(h => (
                                    <th key={h} style={{ borderBottom: `2px solid ${colors.lightGray}`, padding: '12px', textAlign: 'left', color: colors.gray, fontSize: '14px' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredIncidents.map(incident => (
                                <tr key={incident.id} style={{ cursor: 'pointer' }}>
                                    <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', fontWeight: '600' }}>{incident.id}</td>
                                    <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{incident.type}</td>
                                    <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', color: colors.gray }}>{incident.address}</td>
                                    <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{incident.date}</td>
                                    <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            background: incident.status === 'Open' ? colors.warning : colors.success,
                                            color: colors.white
                                        }}>
                                            {incident.status}
                                        </span>
                                    </td>
                                    <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', color: colors.gray }}>{incident.officer}</td>
                                    <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>
                                        <button 
                                            onClick={() => {setSelectedIncident(incident); setShowModal(true);}}
                                            style={{ background: colors.primary, border: 'none', padding: '6px 12px', borderRadius: '4px', color: colors.white, fontSize: '12px', cursor: 'pointer' }}
                                        >
                                            View/Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const NewIncidentModal = () => (
        <Modal onClose={() => setShowNewIncidentModal(false)}>
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Create New Incident Report</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <SelectField label="Incident Type" value="">
                    <option value="">Select Type...</option>
                    <option>111 - Building Fire</option>
                    <option>112 - Fires in structures other than buildings</option>
                    <option>113 - Cooking fire, confined to container</option>
                    <option>322 - Motor vehicle accident with injuries</option>
                    <option>324 - Motor vehicle accident with no injuries</option>
                    <option>554 - Water or ice rescue</option>
                    <option>611 - Dispatched & cancelled en route</option>
                    <option>650 - Steam, vapor, fog or dust thought to be smoke</option>
                </SelectField>
                <FormField label="Incident Date" type="date" value="2025-07-14" />
                <FormField label="Incident Time" type="time" value="14:30" />
                <FormField label="Street Address" value="" />
                <FormField label="City" value="Anytown" />
                <FormField label="Zip Code" value="01234" />
                <SelectField label="Incident Source" value="Manual Entry">
                    <option>Manual Entry</option>
                    <option>CAD</option>
                    <option>Walk-in Report</option>
                </SelectField>
                <SelectField label="Reporting Officer" value="">
                    <option value="">Select Officer...</option>
                    <option>Capt. John Davis</option>
                    <option>Lt. Sarah Miller</option>
                    <option>Lt. Mike Johnson</option>
                </SelectField>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                    onClick={() => setShowNewIncidentModal(false)}
                    style={{ background: colors.lightGray, border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
                >
                    Cancel
                </button>
                <button 
                    onClick={() => {setShowNewIncidentModal(false); alert('Incident report created! You would now be taken to the full incident report form.');}}
                    style={{ background: colors.primary, border: 'none', padding: '10px 20px', borderRadius: '6px', color: colors.white, cursor: 'pointer' }}
                >
                    Create Report
                </button>
            </div>
        </Modal>
    );

    const IncidentDetailModal = () => (
        <Modal onClose={() => setShowModal(false)}>
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>
                {selectedIncident?.fromCAD ? 'Accept CAD Incident' : 'Incident Details'} - {selectedIncident?.id}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <FormField label="Type" value={selectedIncident?.type || ''} readOnly />
                <FormField label="Address" value={selectedIncident?.address || ''} readOnly />
                <FormField label="Time" value={selectedIncident?.time || ''} readOnly />
                {selectedIncident?.fromCAD && (
                    <FormField label="Relevant Units" value={selectedIncident?.relevantUnits?.join(', ') || ''} readOnly />
                )}
                {!selectedIncident?.fromCAD && (
                    <>
                        <FormField label="Status" value={selectedIncident?.status || ''} readOnly />
                        <FormField label="Officer" value={selectedIncident?.officer || ''} readOnly />
                    </>
                )}
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                    onClick={() => setShowModal(false)}
                    style={{ background: colors.lightGray, border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
                >
                    {selectedIncident?.fromCAD ? 'Cancel' : 'Close'}
                </button>
                <button 
                    onClick={() => {setShowModal(false); alert(selectedIncident?.fromCAD ? 'CAD incident accepted! Opening full incident report form.' : 'Opening full incident report form for editing.');}}
                    style={{ background: colors.primary, border: 'none', padding: '10px 20px', borderRadius: '6px', color: colors.white, cursor: 'pointer' }}
                >
                    {selectedIncident?.fromCAD ? 'Accept & Start Report' : 'Open Full Report'}
                </button>
            </div>
        </Modal>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Current Incidents': return <CurrentIncidentsTab />;
            case 'CAD Feed': return <CADFeedTab />;
            case 'All Incidents': return <AllIncidentsTab />;
            default: return <CurrentIncidentsTab />;
        }
    };

    return (
        <div style={{ padding: '25px' }}>
            <PageHeader 
                title="Incident Management" 
                buttonLabel="Create New Incident"
                onButtonClick={() => setShowNewIncidentModal(true)}
            />
            <SubNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {renderTabContent()}
            {showModal && selectedIncident && <IncidentDetailModal />}
            {showNewIncidentModal && <NewIncidentModal />}
        </div>
    );
};

// Render the application
ReactDOM.render(<App />, document.getElementById('react-app-container'));
