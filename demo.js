// demo.js - LadderOps Interactive Demo Application

// Color Palette
const colors = {
  primary: '#FF4500',  // Orange-Red
  secondary: '#1E3A8A', // Dark Blue
  light: '#F9FAFB',
  dark: '#111827',
  gray: '#6B7280',
  lightGray: '#E5E7EB',
  white: '#FFFFFF',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6'
};

// --- Reusable UI & Form Components ---

const FormField = ({ label, value, type = 'text', readOnly = false }) => (
    <div>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: colors.dark }}>{label}</label>
        <input type={type} defaultValue={value} readOnly={readOnly} style={{ width: '100%', padding: '10px', border: `1px solid ${colors.lightGray}`, borderRadius: '6px', fontSize: '14px', background: readOnly ? colors.lightGray : colors.white }} />
    </div>
);

const SelectField = ({ label, children, value, onChange }) => (
    <div>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: colors.dark }}>{label}</label>
        <select value={value} onChange={onChange} style={{ width: '100%', padding: '10px', border: `1px solid ${colors.lightGray}`, borderRadius: '6px', fontSize: '14px', background: `url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat right .75rem center / 1.2em 1.2em`, WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none', backgroundColor: colors.white, paddingRight: '2.5rem' }}>
            {children}
        </select>
    </div>
);

const TextArea = ({ label, value, rows = 4 }) => (
    <div>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: colors.dark }}>{label}</label>
        <textarea defaultValue={value} rows={rows} style={{ width: '100%', padding: '10px', border: `1px solid ${colors.lightGray}`, borderRadius: '6px', fontSize: '14px', resize: 'vertical' }}></textarea>
    </div>
);

const PageHeader = ({ title, children, buttonLabel, onButtonClick }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: colors.dark, margin: 0, marginBottom: '5px' }}>{title}</h2>
            {children}
        </div>
        {buttonLabel && (
            <button onClick={onButtonClick} style={{ background: colors.primary, border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: colors.white, fontWeight: '600' }}>
                {buttonLabel}
            </button>
        )}
    </div>
);

const SubNav = ({ tabs, activeTab, setActiveTab }) => (
    <div style={{ display: 'flex', borderBottom: `1px solid ${colors.lightGray}`, marginBottom: '25px', overflowX: 'auto' }}>
        {tabs.map(tab => (
            <div key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 15px', borderBottom: activeTab === tab ? `3px solid ${colors.primary}` : '3px solid transparent', fontWeight: activeTab === tab ? 'bold' : 'normal', color: activeTab === tab ? colors.primary : colors.gray, cursor: 'pointer', fontSize: '14px', transform: 'translateY(1px)', whiteSpace: 'nowrap' }}>
                {tab}
            </div>
        ))}
    </div>
);

const Modal = ({ children, onClose }) => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
        <div style={{ background: colors.light, padding: '25px', borderRadius: '8px', width: '90%', maxWidth: '500px', position: 'relative' }}>
            <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>&times;</button>
            {children}
        </div>
    </div>
);

const CheckboxItem = ({ label, checked = false }) => (
    <div style={{ display: 'flex', alignItems: 'center', background: colors.white, padding: '12px', border: `1px solid ${colors.lightGray}`, borderRadius: '6px' }}>
        <input type="checkbox" defaultChecked={checked} style={{ width: '20px', height: '20px', marginRight: '12px', accentColor: colors.primary }} />
        <label>{label}</label>
    </div>
);

// --- Main UI Components ---

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [hoveredTab, setHoveredTab] = React.useState(null);
  const navItems = ['dashboard', 'incidents', 'occupancies', 'personnel', 'equipment', 'reports', 'settings'];
  const navIcons = {'dashboard': '📊', 'incidents': '📋', 'occupancies': '🏢', 'reports': '📄', 'personnel': '👨‍🚒', 'equipment': '🚒', 'settings': '⚙️'};
  
  const navItemStyle = (tabName) => ({
    padding: '12px 20px', marginBottom: '4px', display: 'flex', alignItems: 'center',
    background: activeTab === tabName ? 'rgba(255, 255, 255, 0.1)' : (hoveredTab === tabName ? 'rgba(255, 255, 255, 0.05)' : 'transparent'),
    borderLeft: activeTab === tabName ? `4px solid ${colors.primary}` : '4px solid transparent',
    cursor: 'pointer', transition: 'background 0.2s ease-in-out, border-left 0.2s ease-in-out',
    fontWeight: activeTab === tabName ? '600' : 'normal'
  });

  return (
    <div style={{ width: '220px', background: colors.secondary, color: colors.white, display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto' }}>
      <div style={{ padding: '20px 20px', marginBottom: '20px', fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '30px', height: '30px', background: colors.primary, borderRadius: '6px', marginRight: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🔥</div>
        LadderOps
      </div>
      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {navItems.map(tab => (
            <li key={tab} style={navItemStyle(tab)} onClick={() => setActiveTab(tab)} onMouseEnter={() => setHoveredTab(tab)} onMouseLeave={() => setHoveredTab(null)} role="button" aria-current={activeTab === tab ? 'page' : undefined}>
              <span style={{ marginRight: '12px', fontSize: '18px', width: '24px', textAlign: 'center' }}>{navIcons[tab]}</span>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'incidents' && <span style={{ marginLeft: 'auto', background: colors.success, color: colors.white, fontSize: '10px', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>NERIS</span>}
            </li>
          ))}
        </ul>
      </nav>
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', padding: '20px', display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: colors.primary, marginRight: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>JD</div>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>John Davis</div>
          <div style={{ fontSize: '12px', opacity: 0.7 }}>Fire Captain</div>
        </div>
      </div>
    </div>
  );
};

const DashboardContent = () => {
    const KpiCard = ({ title, value, icon, change }) => (
        <div style={{ background: colors.white, padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ fontSize: '24px', marginRight: '15px' }}>{icon}</div>
                <div>
                    <div style={{ color: colors.gray, fontSize: '14px' }}>{title}</div>
                    <div style={{ color: colors.dark, fontSize: '24px', fontWeight: 'bold' }}>{value}</div>
                </div>
            </div>
            {change && <div style={{ fontSize: '12px', color: change.startsWith('+') ? colors.success : colors.danger }}>{change} vs last month</div>}
        </div>
    );

    const recentIncidents = [
        { id: '2025-00123', type: '111 - Building Fire', status: 'Closed' },
        { id: '2025-00122', type: '322 - Vehicle Fire', status: 'Closed' },
        { id: '2025-00121', type: '554 - Person in Water', status: 'Open' },
        { id: '2025-00120', type: '611 - EMS Call', status: 'Closed' },
    ];
    
    return (
        <div style={{padding: '25px'}}>
            <PageHeader title="Dashboard"/>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '25px' }}>
                <KpiCard title="Incidents this Month" value="123" icon="🔥" change="+5.2%"/>
                <KpiCard title="Avg. Response Time" value="4:32" icon="⏱️" change="-0.8%"/>
                <KpiCard title="Inspections Due" value="18" icon="🏢" change="+12.5%"/>
                <KpiCard title="Upcoming Inspections" value="8" icon="🗓️" change="+10%"/>
            </div>
            <h3 style={{color: colors.dark, marginBottom: '15px'}}>Recent Incidents</h3>
            <div style={{ background: colors.white, borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                {recentIncidents.map((inc, index) => (
                    <div key={inc.id} style={{display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', alignItems: 'center', padding: '10px', borderBottom: index === recentIncidents.length - 1 ? 'none' : `1px solid ${colors.lightGray}`}}>
                        <div style={{fontWeight: '600'}}>{inc.id}</div>
                        <div style={{color: colors.gray}}>{inc.type}</div>
                        <div>
                            <span style={{padding: '4px 8px', borderRadius: '10px', fontSize: '12px', background: inc.status === 'Closed' ? colors.success : colors.warning, color: colors.white}}>{inc.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Incident Report Sections ---
const NerisWorkflowDiagram = ({ completedTabs, activeTab }) => {
    const allTabs = ['Core', 'Location', 'Fire', 'Actions/Tactics', 'Rescue/Casualty', 'Hazards', 'Units', 'Narrative'];
    return (
        <div style={{ background: colors.white, padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '25px' }}>
            <h4 style={{ marginTop: 0, marginBottom: '15px', color: colors.dark }}>Required Modules Workflow</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}>
                {allTabs.map((tab, index) => {
                    const isComplete = completedTabs.includes(tab);
                    const isActive = tab === activeTab;
                    return (
                        <React.Fragment key={tab}>
                            <div style={{
                                padding: '8px 12px',
                                borderRadius: '20px',
                                background: isActive ? colors.primary : (isComplete ? colors.success : colors.lightGray),
                                color: isActive || isComplete ? colors.white : colors.gray,
                                fontWeight: '600',
                                fontSize: '12px',
                                border: `1px solid ${isActive ? colors.primary : (isComplete ? colors.success : colors.lightGray)}`
                            }}>
                                {isComplete && !isActive ? '✓ ' : ''}{tab}
                            </div>
                            {index < allTabs.length - 1 && <div style={{ color: colors.lightGray, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>-</div>}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

const NerisStatementBox = () => (
    <div style={{marginTop: '25px', padding: '15px', background: 'rgba(30, 58, 138, 0.05)', border: `1px solid ${colors.lightGray}`, borderRadius: '8px', textAlign: 'center'}}>
        <p style={{margin: 0, color: colors.secondary, fontWeight: 500}}>This report is structured for NERIS 2026 compliance.</p>
    </div>
);

const CoreSection = () => ( 
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}> 
        <FormField label="Incident Number" value="2025-00123" /> 
        <FormField label="Incident Date" value="2025-07-11" type="date" /> 
        <SelectField label="Incident Type">
            <option>111 - Building Fire</option>
            <option>322 - Vehicle Fire</option>
            <option>611 - EMS Call</option>
        </SelectField> 
        <FormField label="Alarm Date/Time" value="2025-07-11T14:02" type="datetime-local" /> 
        <FormField label="Arrival Date/Time" value="2025-07-11T14:06" type="datetime-local" /> 
        <FormField label="Last Unit Cleared" value="2025-07-11T15:30" type="datetime-local" /> 
        <SelectField label="Incident Source">
            <option>CAD</option>
            <option>Manual Entry</option>
        </SelectField> 
    </div>
);

const LocationSection = () => ( 
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <FormField label="Street Address" value="455 Main St" />
        <FormField label="Apartment/Suite" value="" />
        <FormField label="City" value="Anytown" />
        <FormField label="State" value="MA" />
        <FormField label="Zip Code" value="01234" />
        <SelectField label="Property Use">
            <option>419 - Single-Family Dwelling</option>
            <option>500 - Mercantile Business</option>
        </SelectField>
    </div>
);

const FireSection = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <SelectField label="Area of Fire Origin">
            <option>75 - Kitchen</option>
            <option>43 - Bedroom</option>
        </SelectField>
        <SelectField label="Heat Source">
            <option>11 - Cooking Equipment</option>
            <option>53 - Electrical Wiring</option>
        </SelectField>
        <SelectField label="Item First Ignited">
            <option>13 - Cooking Oil/Grease</option>
            <option>51 - Upholstered Furniture</option>
        </SelectField>
    </div>
);

const ActionsTacticsSection = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
        <CheckboxItem label="Forcible Entry" checked />
        <CheckboxItem label="Primary Search" checked />
        <CheckboxItem label="Secondary Search" checked />
        <CheckboxItem label="Ventilation (PPV)" />
        <CheckboxItem label="Ventilation (Vertical)" checked />
        <CheckboxItem label="Extinguishment" checked />
        <CheckboxItem label="Salvage & Overhaul" checked />
        <CheckboxItem label="Establish Water Supply" checked />
    </div>
);

const RescueCasualtySection = () => {
    const [isMasked, setIsMasked] = React.useState(true);
    const nameFieldKey = isMasked ? 'masked-name' : 'unmasked-name';
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px'}}>
                <h4 style={{borderBottom: `1px solid ${colors.lightGray}`, paddingBottom: '10px', margin: 0}}>Patient 1</h4>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <label htmlFor="pii-toggle" style={{fontWeight: 500}}>Mask PII</label>
                    <label style={{position: 'relative', display: 'inline-block', width: '40px', height: '24px'}}>
                        <input id="pii-toggle" type="checkbox" checked={isMasked} onChange={() => setIsMasked(!isMasked)} style={{opacity: 0, width: 0, height: 0}} />
                        <span style={{position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, background: isMasked ? colors.primary : colors.lightGray, transition: '.4s', borderRadius: '34px'}}>
                            <span style={{position: 'absolute', height: '18px', width: '18px', left: '3px', bottom: '3px', background: 'white', transition: '.4s', borderRadius: '50%', transform: isMasked ? 'translateX(16px)' : 'translateX(0)'}}></span>
                        </span>
                    </label>
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <FormField key={nameFieldKey} label="Patient Name" value={isMasked ? '**********' : 'John Smith'} readOnly={isMasked} />
                <FormField label="Age" value="68" />
                <SelectField label="Gender">
                    <option>Male</option>
                    <option>Female</option>
                </SelectField>
                <SelectField label="Injury Type">
                    <option>Smoke Inhalation</option>
                    <option>Burns</option>
                    <option>None</option>
                </SelectField>
                <SelectField label="Care Provided">
                    <option>BLS Assessment</option>
                    <option>Oxygen Administered</option>
                </SelectField>
                <SelectField label="Outcome">
                    <option>Transported to Hospital</option>
                    <option>Refused Treatment</option>
                </SelectField>
            </div>
        </div>
    );
};

const HazardsSection = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
        <CheckboxItem label="Flammable Liquids/Gases" />
        <CheckboxItem label="Explosives/Blasting Agents" />
        <CheckboxItem label="Radioactive Materials" />
        <CheckboxItem label="Chemical Hazards (Corrosives, etc.)" checked />
        <CheckboxItem label="Biohazards" />
        <CheckboxItem label="Electrical Hazard" checked />
    </div>
);

const UnitsSection = () => {
    const units = [
        { unit: 'E-1', dispatched: '14:02:10', enroute: '14:02:50', arrived: '14:06:32', cleared: '15:30:00' },
        { unit: 'L-1', dispatched: '14:02:10', enroute: '14:03:15', arrived: '14:07:01', cleared: '15:28:00' },
        { unit: 'C-1', dispatched: '14:02:10', enroute: '14:02:45', arrived: '14:06:50', cleared: '15:31:00' },
        { unit: 'A-1', dispatched: '14:05:00', enroute: '14:05:45', arrived: '14:10:20', cleared: '15:05:00' },
    ];
    const header = ['Unit', 'Dispatched', 'En Route', 'Arrived', 'Cleared'];
    return (
        <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse', minWidth: '600px'}}>
                <thead>
                    <tr>{header.map(h => <th key={h} style={{borderBottom: `2px solid ${colors.lightGray}`, padding: '10px', textAlign: 'left', color: colors.gray}}>{h}</th>)}</tr>
                </thead>
                <tbody>
                    {units.map(u => (
                        <tr key={u.unit}>
                            <td style={{borderBottom: `1px solid ${colors.lightGray}`, padding: '10px', fontWeight: 600}}>{u.unit}</td>
                            <td style={{borderBottom: `1px solid ${colors.lightGray}`, padding: '10px'}}>{u.dispatched}</td>
                            <td style={{borderBottom: `1px solid ${colors.lightGray}`, padding: '10px'}}>{u.enroute}</td>
                            <td style={{borderBottom: `1px solid ${colors.lightGray}`, padding: '10px'}}>{u.arrived}</td>
                            <td style={{borderBottom: `1px solid ${colors.lightGray}`, padding: '10px'}}>{u.cleared}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const NarrativeSection = () => (
    <TextArea 
        label="Incident Narrative (Use plain language)" 
        value="E-1 arrived on scene at 14:06 to find a two-and-a-half story wood-frame single-family dwelling with light smoke showing from the kitchen window on Side A. Captain Davis established command. E-1 crew forced entry through the front door and advanced a 1.75-inch attack line to the kitchen, where they found a small fire on the stovetop extending to the adjacent cabinets. The fire was quickly knocked down. L-1 arrived and performed a primary search of the first and second floors, which was negative. L-1 crew then performed vertical ventilation over the kitchen area. One civilian occupant, John Smith, had evacuated prior to arrival and was assessed by EMS for minor smoke inhalation before being transported to Anytown General Hospital. The fire was determined to be accidental, caused by unattended cooking. Overhaul was completed, and the scene was turned over to the homeowner. All units cleared at 15:30." 
        rows={12}
    />
);

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

// --- Occupancies Module ---
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

// --- Personnel Module ---
const PersonnelContent = () => {
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
        <div style={{ background: colors.white, padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                    <thead>
                        <tr>
                            {['ID', 'Name', 'Rank', 'Station', 'Shift', 'Status', 'Cert Alerts'].map(h => (
                                <th key={h} style={{ borderBottom: `2px solid ${colors.lightGray}`, padding: '12px', textAlign: 'left', color: colors.gray, fontSize: '14px' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {personnel.map(person => (
                            <tr key={person.id} style={{ cursor: 'pointer' }} onClick={() => setShowModal(true)}>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', fontWeight: '600' }}>{person.id}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{person.name}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{person.rank}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', color: colors.gray }}>{person.station}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{person.shift}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>
                                    <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', background: colors.success, color: colors.white }}>
                                        {person.status}
                                    </span>
                                </td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>
                                    {person.certExpirations > 0 && (
                                        <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', background: colors.warning, color: colors.white }}>
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
        <div style={{ background: colors.white, padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                    <thead>
                        <tr>
                            {['Member', 'Certification', 'Issue Date', 'Expiration', 'Status'].map(h => (
                                <th key={h} style={{ borderBottom: `2px solid ${colors.lightGray}`, padding: '12px', textAlign: 'left', color: colors.gray, fontSize: '14px' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {certifications.map((cert, index) => (
                            <tr key={index}>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', fontWeight: '600' }}>{cert.member}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{cert.cert}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', color: colors.gray }}>{cert.issueDate}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{cert.expiration}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        background: cert.status === 'Current' ? colors.success : colors.warning,
                                        color: colors.white
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
        <div style={{ background: colors.white, padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                    <thead>
                        <tr>
                            {['Date', 'Shift', 'Captain', 'Lieutenant', 'Additional Members'].map(h => (
                                <th key={h} style={{ borderBottom: `2px solid ${colors.lightGray}`, padding: '12px', textAlign: 'left', color: colors.gray, fontSize: '14px' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((shift, index) => (
                            <tr key={index}>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', fontWeight: '600' }}>{shift.date}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{shift.shift}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{shift.captain}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{shift.lieutenant}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', color: colors.gray }}>{shift.members}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const PersonnelDetailModal = () => (
        <Modal onClose={() => setShowModal(false)}>
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>John Davis - Personnel Record</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <FormField label="Employee ID" value="P-001" readOnly />
                <FormField label="Badge Number" value="101" />
                <FormField label="Hire Date" value="2018-03-15" type="date" />
                <FormField label="Department" value="Suppression" />
                <FormField label="Emergency Contact" value="Jane Davis - (555) 123-4567" />
                <FormField label="Phone" value="(555) 987-6543" />
            </div>
            <div style={{ marginTop: '20px' }}>
                <h4 style={{ marginBottom: '10px' }}>Current Certifications</h4>
                <div style={{ color: colors.gray, fontSize: '14px' }}>
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
            <PageHeader title="Personnel Management" buttonLabel="Add Member" />
            <SubNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {renderTabContent()}
            {showModal && <PersonnelDetailModal />}
        </div>
    );
};

// --- Equipment Module ---
const EquipmentContent = () => {
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
        <div style={{ background: colors.white, padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead>
                        <tr>
                            {['Unit ID', 'Name', 'Type', 'Year', 'Mileage', 'Status', 'Last PM', 'Next PM'].map(h => (
                                <th key={h} style={{ borderBottom: `2px solid ${colors.lightGray}`, padding: '12px', textAlign: 'left', color: colors.gray, fontSize: '14px' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {apparatus.map(unit => (
                            <tr key={unit.id} style={{ cursor: 'pointer' }} onClick={() => setShowModal(true)}>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', fontWeight: '600' }}>{unit.id}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{unit.name}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{unit.type}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', color: colors.gray }}>{unit.year}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{unit.mileage}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>
                                    <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', background: colors.success, color: colors.white }}>
                                        {unit.status}
                                    </span>
                                </td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{unit.lastPM}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', color: colors.gray }}>{unit.nextPM}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const EquipmentTab = () => (
        <div style={{ background: colors.white, padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead>
                        <tr>
                            {['Equipment ID', 'Name', 'Type', 'Location', 'Last Inspection', 'Next Due', 'Status'].map(h => (
                                <th key={h} style={{ borderBottom: `2px solid ${colors.lightGray}`, padding: '12px', textAlign: 'left', color: colors.gray, fontSize: '14px' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {equipment.map(item => (
                            <tr key={item.id} style={{ cursor: 'pointer' }}>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', fontWeight: '600' }}>{item.id}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{item.name}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{item.type}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', color: colors.gray }}>{item.location}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{item.lastInspection}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{item.nextDue}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        background: item.status === 'Ready' ? colors.success : colors.warning,
                                        color: colors.white
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
        <div style={{ background: colors.white, padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                    <thead>
                        <tr>
                            {['Work Order', 'Apparatus', 'Type', 'Date', 'Technician', 'Status', 'Cost'].map(h => (
                                <th key={h} style={{ borderBottom: `2px solid ${colors.lightGray}`, padding: '12px', textAlign: 'left', color: colors.gray, fontSize: '14px' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {maintenance.map(work => (
                            <tr key={work.id} style={{ cursor: 'pointer' }}>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', fontWeight: '600' }}>{work.id}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{work.apparatus}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{work.type}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>{work.date}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', color: colors.gray }}>{work.technician}</td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        background: work.status === 'Completed' ? colors.success : work.status === 'In Progress' ? colors.warning : colors.info,
                                        color: colors.white
                                    }}>
                                        {work.status}
                                    </span>
                                </td>
                                <td style={{ borderBottom: `1px solid ${colors.lightGray}`, padding: '12px', fontWeight: '600' }}>{work.cost}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const ApparatusDetailModal = () => (
        <Modal onClose={() => setShowModal(false)}>
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Engine 1 - Vehicle Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <FormField label="Unit ID" value="E-1" readOnly />
                <FormField label="VIN" value="1FDWE35L98HA12345" />
                <FormField label="Make/Model" value="Pierce Enforcer" />
                <FormField label="Tank Capacity" value="750 gallons" />
                <FormField label="Pump Rating" value="1,500 GPM" />
                <FormField label="Ladder Length" value="35 feet" />
            </div>
            <div style={{ marginTop: '20px' }}>
                <h4 style={{ marginBottom: '10px' }}>Recent Maintenance</h4>
                <div style={{ color: colors.gray, fontSize: '14px' }}>
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
            <PageHeader title="Equipment & Asset Management" buttonLabel="Add Asset" />
            <SubNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {renderTabContent()}
            {showModal && <ApparatusDetailModal />}
        </div>
    );
};

// --- Reports and Settings (Placeholder) ---
const PlaceholderContent = ({ tabName }) => ( 
    <div style={{ padding: '25px', textAlign: 'center' }}>
        <PageHeader title={`${tabName.charAt(0).toUpperCase() + tabName.slice(1)} Module`} />
        <div style={{ background: colors.white, padding: '40px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginTop: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>
                {{ reports: '📄', settings: '⚙️' }[tabName]}
            </div>
            <h3 style={{ color: colors.dark, marginBottom: '15px' }}>
                {tabName.charAt(0).toUpperCase() + tabName.slice(1)} Management
            </h3>
            <p style={{ color: colors.gray, maxWidth: '400px', margin: '0 auto' }}>
                This module demonstrates {tabName} management capabilities in LadderOps. 
                Click through the other modules to see different features.
            </p>
            {tabName === 'reports' && (
                <div style={{ marginTop: '20px', padding: '15px', background: colors.light, borderRadius: '6px' }}>
                    <p style={{ fontSize: '14px', color: colors.gray }}>
                        ✅ NERIS 2026 reports • Custom dashboards • Data analytics
                    </p>
                </div>
            )}
        </div>
    </div>
);

// --- Main Application Component ---
const App = () => {
  const [activeTab, setActiveTab] = React.useState('dashboard');

  // Track demo interactions for analytics
  React.useEffect(() => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'demo_module_view', {
        event_category: 'demo_interaction',
        event_label: activeTab
      });
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardContent />;
      case 'incidents': return <IncidentReportContent />;
      case 'occupancies': return <OccupanciesContent />;
      case 'personnel': return <PersonnelContent />;
      case 'equipment': return <EquipmentContent />;
      case 'reports': return <PlaceholderContent tabName="reports" />;
      case 'settings': return <PlaceholderContent tabName="settings" />;
      default: return <DashboardContent />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ background: colors.light, display: 'flex', height: '100%', width: '100%' }}>
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
                {renderContent()}
            </div>
        </div>
    </div>
  );
}

// Render the application
ReactDOM.render(<App />, document.getElementById('react-app-container'));
