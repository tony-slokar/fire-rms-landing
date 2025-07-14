// demo.js – LadderOps Interactive Demo Application (Complete Version, July 2025)
// -----------------------------------------------------------------------------
//  GLOBAL CONFIG & ENUMS
// -----------------------------------------------------------------------------
const colors = {
  primary: '#FF4500', // Orange‑Red (LadderOps brand)
  secondary: '#1E3A8A', // Navy
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  gray: '#6B7280',
  lightGray: '#E5E7EB',
  light: '#F9FAFB',
  dark: '#111827',
  white: '#FFFFFF'
};

const PROPERTY_TYPES = [
  'Residential',
  'Mercantile',
  'Industrial',
  'Assembly',
  'Educational',
  'Healthcare',
  'Storage',
  'Mixed Use',
  'Other'
];
const CONSTRUCTION_TYPES = [
  'Type I (Fire‑Resistive)',
  'Type II (Non‑Combustible)',
  'Type III (Ordinary)',
  'Type IV (Heavy Timber)',
  'Type V (Wood Frame)'
];
const INSPECTION_TEMPLATES = {
  Annual: [
    'Means of Egress Clear',
    'Fire Extinguishers Serviced',
    'Alarm Operational',
    'Sprinkler Heads Free of Obstruction'
  ],
  Complaint: [
    'Complaint Addressed',
    'Hazard Mitigated',
    'Documentation Uploaded'
  ],
  'Follow‑up': ['Previous Violations Cleared', 'Responsible Party Notified']
};

// -----------------------------------------------------------------------------
//  RE‑USABLE UI COMPONENTS (vanilla React – no external deps)
// -----------------------------------------------------------------------------
const FormField = ({ label, value, onChange, type = 'text', readOnly = false }) => (
  <div>
    <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500, color: colors.dark }}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      style={{
        width: '100%',
        padding: 10,
        border: `1px solid ${colors.lightGray}`,
        borderRadius: 6,
        fontSize: 14,
        background: readOnly ? colors.lightGray : colors.white
      }}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500, color: colors.dark }}>{label}</label>
    <select
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        padding: 10,
        border: `1px solid ${colors.lightGray}`,
        borderRadius: 6,
        fontSize: 14,
        background:
          "url('data:image/svg+xml;utf8,<svg fill=\"black\" height=\"20\" viewBox=\"0 0 24 24\" width=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/></svg>') no-repeat right .75rem center / 1em 1em",
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        appearance: 'none',
        backgroundColor: colors.white,
        paddingRight: '2rem'
      }}
    >
      {options.map(opt => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const TextArea = ({ label, value, onChange, rows = 4 }) => (
  <div>
    <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500, color: colors.dark }}>{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      style={{
        width: '100%',
        padding: 10,
        border: `1px solid ${colors.lightGray}`,
        borderRadius: 6,
        fontSize: 14,
        resize: 'vertical'
      }}
    />
  </div>
);

const PageHeader = ({ title, children, buttonLabel, onButtonClick }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 20,
      flexWrap: 'wrap',
      gap: 12
    }}
  >
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: colors.dark, margin: 0 }}>{title}</h2>
      {children}
    </div>
    {buttonLabel && (
      <button
        onClick={onButtonClick}
        style={{
          background: colors.primary,
          border: 'none',
          padding: '8px 16px',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: 14,
          color: colors.white,
          fontWeight: 600
        }}
      >
        {buttonLabel}
      </button>
    )}
  </div>
);

const SubNav = ({ tabs, activeTab, setActiveTab }) => (
  <div style={{ display: 'flex', borderBottom: `1px solid ${colors.lightGray}`, marginBottom: 25 }}>
    {tabs.map(tab => (
      <div
        key={tab}
        onClick={() => setActiveTab(tab)}
        style={{
          padding: '10px 15px',
          borderBottom: activeTab === tab ? `3px solid ${colors.primary}` : '3px solid transparent',
          fontWeight: activeTab === tab ? 700 : 400,
          color: activeTab === tab ? colors.primary : colors.gray,
          cursor: 'pointer',
          fontSize: 14
        }}
      >
        {tab}
      </div>
    ))}
  </div>
);

const Modal = ({ children, onClose, width = '500px' }) => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}
  >
    <div
      style={{
        background: colors.light,
        padding: 25,
        borderRadius: 8,
        width: '90%',
        maxWidth: width,
        position: 'relative'
      }}
    >
      <button
        onClick={onClose}
        style={{ position: 'absolute', top: 10, right: 10, border: 'none', background: 'none', fontSize: 28, cursor: 'pointer' }}
      >
        &times;
      </button>
      {children}
    </div>
  </div>
);

const CheckboxItem = ({ label, checked = false }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <input type="checkbox" defaultChecked={checked} style={{ width: 18, height: 18, accentColor: colors.primary }} />
    {label}
  </div>
);

// -----------------------------------------------------------------------------
//  SIDEBAR NAVIGATION
// -----------------------------------------------------------------------------
const navItems = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'incidents', label: 'Incidents' },
  { key: 'occupancies', label: 'Occupancies' },
  { key: 'personnel', label: 'Personnel' },
  { key: 'equipment', label: 'Equipment' },
  { key: 'reports', label: 'Reports' },
  { key: 'settings', label: 'Settings' }
];

const Sidebar = ({ activeTab, setActiveTab }) => (
  <aside
    style={{
      width: 220,
      background: colors.white,
      borderRight: `1px solid ${colors.lightGray}`,
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      position: 'relative'
    }}
  >
    <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: colors.primary }}>LadderOps</h1>
    {navItems.map(item => (
      <div
        key={item.key}
        onClick={() => setActiveTab(item.key)}
        style={{
          padding: '8px 10px',
          borderRadius: 6,
          cursor: 'pointer',
          background: activeTab === item.key ? colors.primary : 'transparent',
          color: activeTab === item.key ? colors.white : colors.dark,
          fontWeight: activeTab === item.key ? 700 : 500,
          fontSize: 14
        }}
      >
        {item.label}
      </div>
    ))}
    <div style={{ marginTop: 'auto', fontSize: 12, color: colors.gray }}>Demo v0.6</div>
  </aside>
);

// -----------------------------------------------------------------------------
//  DASHBOARD CONTENT (simple KPI & recent incidents list)
// -----------------------------------------------------------------------------
const DashboardContent = () => {
  const kpis = [
    { label: 'Incidents This Month', value: 32 },
    { label: 'Avg. Response (min)', value: 6.4 },
    { label: 'Inspections Due', value: 8 },
    { label: 'Units Out of Service', value: 1 }
  ];

  const recentIncidents = [
    { id: '2025‑00126', type: '321 – Vehicle Accident', status: 'Open' },
    { id: '2025‑00125', type: '611 – EMS Call', status: 'Open' },
    { id: '2025‑00123', type: '111 – Building Fire', status: 'Closed' }
  ];

  return (
    <div style={{ padding: 25 }}>
      <PageHeader title="Department Dashboard" />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto‑fit,minmax(160px,1fr))',
          gap: 20,
          marginBottom: 30
        }}
      >
        {kpis.map(k => (
          <div
            key={k.label}
            style={{
              background: colors.white,
              borderRadius: 8,
              padding: 20,
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 700 }}>{k.value}</div>
            <div style={{ color: colors.gray, fontSize: 13 }}>{k.label}</div>
          </div>
        ))}
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Recent Incidents</h3>
      <div style={{ background: colors.white, borderRadius: 8, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
          <thead>
            <tr>
              {['ID', 'Type', 'Status'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: 10, borderBottom: `2px solid ${colors.lightGray}`, color: colors.gray }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentIncidents.map(r => (
              <tr key={r.id}>
                <td style={{ padding: 10, borderBottom: `1px solid ${colors.lightGray}` }}>{r.id}</td>
                <td style={{ padding: 10, borderBottom: `1px solid ${colors.lightGray}` }}>{r.type}</td>
                <td style={{ padding: 10, borderBottom: `1px solid ${colors.lightGray}` }}>
                  <span
                    style={{
                      padding: '4px 8px',
                      borderRadius: 12,
                      background: r.status === 'Closed' ? colors.success : colors.warning,
                      color: colors.white,
                      fontSize: 12,
                      fontWeight: 600
                    }}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
//  INCIDENTS MODULE (List/Search + Report Entry)
// -----------------------------------------------------------------------------

// Simplified incident report form – enough fields to demo
const IncidentReportContent = ({ incident = null }) => {
  const [core, setCore] = React.useState({
    id: incident?.id || '',
    type: incident?.type || '111 – Building Fire',
    alarmTime: incident?.alarm || '',
    arrivalTime: incident?.arrival || '',
    clearedTime: incident?.cleared || ''
  });

  const handle = key => e => setCore({ ...core, [key]: e.target.value });

  return (
    <div style={{ padding: 25 }}>
      <PageHeader title={core.id ? `Incident ${core.id}` : 'New Incident'} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto‑fit,minmax(240px,1fr))',
          gap: 20,
          background: colors.white,
          padding: 25,
          borderRadius: 8,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}
      >
        <FormField label="Incident ID" value={core.id} onChange={handle('id')} />
        <FormField label="Type" value={core.type} onChange={handle('type')} />
        <FormField label="Alarm Time" value={core.alarmTime} onChange={handle('alarmTime')} type="time" />
        <FormField label="Arrival Time" value={core.arrivalTime} onChange={handle('arrivalTime')} type="time" />
        <FormField label="Cleared Time" value={core.clearedTime} onChange={handle('clearedTime')} type="time" />
        <TextArea label="Narrative" value={core.narrative || ''} onChange={handle('narrative')} rows={4} />
      </div>
      <button
        style={{
          marginTop: 20,
          background: colors.primary,
          border: 'none',
          padding: '10px 20px',
          borderRadius: 6,
          color: colors.white,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Save Incident
      </button>
    </div>
  );
};

// List/Search view (includes the report form when selected)
const IncidentsContent = () => {
  const [mode, setMode] = React.useState('list');
  const [selectedIncident, setSelectedIncident] = React.useState(null);
  const [search, setSearch] = React.useState('');

  // demo data (mix manual & CAD)
  const allIncidents = [
    { id: '2025‑00123', type: '111 – Building Fire', status: 'Closed', source: 'Manual' },
    { id: '2025‑00124', type: '611 – EMS Call', status: 'Open', source: 'CAD' },
    { id: '2025‑00125', type: '321 – Vehicle Accident', status: 'Open', source: 'CAD' },
    { id: '2025‑00126', type: '554 – Person in Water', status: 'Open', source: 'Manual' }
  ];

  const filtered = allIncidents.filter(inc => inc.id.includes(search) || inc.type.toLowerCase().includes(search.toLowerCase()));

  const renderList = () => (
    <div style={{ padding: 25 }}>
      <PageHeader
        title="Incidents"
        buttonLabel="Create Incident"
        onButtonClick={() => {
          setSelectedIncident(null);
          setMode('report');
        }}
      >
        <input
          type="text"
          placeholder="Search incidents…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: 8, border: `1px solid ${colors.lightGray}`, borderRadius: 6, fontSize: 14, minWidth: 220 }}
        />
      </PageHeader>
      <div style={{ background: colors.white, borderRadius: 8, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
          <thead>
            <tr>
              {['ID', 'Type', 'Status', 'Source'].map(h => (
                <th key={h} style={{ padding: 12, textAlign: 'left', borderBottom: `2px solid ${colors.lightGray}`, color: colors.gray }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(inc => (
              <tr
                key={inc.id}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSelectedIncident(inc);
                  setMode('report');
                }}
              >
                <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}`, fontWeight: 600 }}>{inc.id}</td>
                <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}` }}>{inc.type}</td>
                <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}` }}>
                  <span
                    style={{
                      padding: '4px 8px',
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 600,
                      background: inc.status === 'Closed' ? colors.success : colors.warning,
                      color: colors.white
                    }}
                  >
                    {inc.status}
                  </span>
                </td>
                <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}` }}>{inc.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return mode === 'list' ? renderList() : <IncidentReportContent incident={selectedIncident} />;
};

// -----------------------------------------------------------------------------
//  OCCUPANCIES MODULE (Buildings + Inspections + Pre‑Plans)
// -----------------------------------------------------------------------------
// Re‑using the extended module built earlier – unchanged, but now included in full

const OccupanciesContent = () => {
  const [activeTab, setActiveTab] = React.useState('Buildings');
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [buildingModal, setBuildingModal] = React.useState(null); // holds building object or null
  const [inspectionModal, setInspectionModal] = React.useState(null); // holds inspection obj

  const buildings = [
    {
      id: 'B‑001',
      name: 'Main Street Plaza',
      address: '123 Main St',
      type: 'Mercantile',
      construction: 'Type V (Wood Frame)',
      lastInspection: '2024‑11‑15',
      nextDue: '2025‑11‑15',
      status: 'Compliant'
    },
    {
      id: 'B‑002',
      name: 'Riverside Apartments',
      address: '456 River Rd',
      type: 'Residential',
      construction: 'Type III (Ordinary)',
      lastInspection: '2024‑09‑20',
      nextDue: '2025‑09‑20',
      status: 'Pending'
    },
    {
      id: 'B‑003',
      name: 'Tech Manufacturing',
      address: '789 Industrial Way',
      type: 'Industrial',
      construction: 'Type II (Non‑Combustible)',
      lastInspection: '2024‑12‑01',
      nextDue: '2025‑06‑01',
      status: 'Compliant'
    },
    {
      id: 'B‑004',
      name: 'Downtown Hotel',
      address: '321 Center St',
      type: 'Assembly',
      construction: 'Type I (Fire‑Resistive)',
      lastInspection: '2024‑08‑10',
      nextDue: '2025‑02‑10',
      status: 'Overdue'
    }
  ];

  const inspections = [
    {
      id: 'I‑045',
      building: 'Main Street Plaza',
      type: 'Annual',
      date: '2025‑07‑20',
      inspector: 'Inspector Smith',
      status: 'Scheduled'
    },
    {
      id: 'I‑044',
      building: 'Riverside Apartments',
      type: 'Complaint',
      date: '2025‑07‑18',
      inspector: 'Inspector Jones',
      status: 'In Progress'
    },
    {
      id: 'I‑043',
      building: 'Tech Manufacturing',
      type: 'Follow‑up',
      date: '2025‑07‑15',
      inspector: 'Inspector Brown',
      status: 'Completed'
    },
    {
      id: 'I‑042',
      building: 'Downtown Hotel',
      type: 'Annual',
      date: '2025‑07‑12',
      inspector: 'Inspector Davis',
      status: 'Completed'
    }
  ];

  const prePlans = [
    {
      id: 'PP‑012',
      building: 'Main Street Plaza',
      updated: '2024‑11‑15',
      hazards: 'Propane storage',
      access: 'Front/Rear',
      hydrants: '2 within 300ft'
    },
    {
      id: 'PP‑013',
      building: 'Tech Manufacturing',
      updated: '2024‑12‑01',
      hazards: 'Chemical storage, high voltage',
      access: 'Multiple dock doors',
      hydrants: '1 within 150ft'
    },
    {
      id: 'PP‑014',
      building: 'Downtown Hotel',
      updated: '2024‑08‑10',
      hazards: 'High occupancy, elderly residents',
      access: 'Front lobby only',
      hydrants: '3 within 200ft'
    }
  ];

  // ---------------- MODALS ----------------
  const AddBuildingModal = () => {
    const [form, setForm] = React.useState({
      id: '',
      name: '',
      address: '',
      type: PROPERTY_TYPES[0],
      construction: CONSTRUCTION_TYPES[0]
    });
    const handle = key => e => setForm({ ...form, [key]: e.target.value });
    return (
      <Modal onClose={() => setShowAddModal(false)} width="600px">
        <h3 style={{ marginTop: 0, marginBottom: 20 }}>Add New Building</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto‑fit,minmax(220px,1fr))', gap: 15 }}>
          <FormField label="Building ID" value={form.id} onChange={handle('id')} />
          <FormField label="Building Name" value={form.name} onChange={handle('name')} />
          <FormField label="Address" value={form.address} onChange={handle('address')} />
          <SelectField label="Property Type" value={form.type} onChange={handle('type')} options={PROPERTY_TYPES} />
          <SelectField label="Construction Type" value={form.construction} onChange={handle('construction')} options={CONSTRUCTION_TYPES} />
        </div>
        <button
          style={{ marginTop: 20, background: colors.primary, border: 'none', padding: '10px 20px', borderRadius: 6, color: colors.white, fontWeight: 600, cursor: 'pointer' }}
        >
          Save Building
        </button>
      </Modal>
    );
  };

  const BuildingDetailModal = ({ building }) => {
    const [propType, setPropType] = React.useState(building.type);
    const [constType, setConstType] = React.useState(building.construction);
    return (
      <Modal onClose={() => setBuildingModal(null)}>
        <h3 style={{ marginTop: 0, marginBottom: 20 }}>{building.name}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto‑fit,minmax(200px,1fr))', gap: 15 }}>
          <FormField label="Building ID" value={building.id} readOnly />
          <SelectField label="Property Type" value={propType} onChange={e => setPropType(e.target.value)} options={PROPERTY_TYPES} />
          <SelectField label="Construction Type" value={constType} onChange={e => setConstType(e.target.value)} options={CONSTRUCTION_TYPES} />
          <TextArea label="Notes" value="" onChange={() => {}} rows={3} />
        </div>
      </Modal>
    );
  };

  const InspectionDetailModal = ({ inspection }) => {
    const [inspType, setInspType] = React.useState(inspection.type);
    const [checks, setChecks] = React.useState(INSPECTION_TEMPLATES[inspType] || []);
    const [newCheck, setNewCheck] = React.useState('');

    const addCheck = () => {
      if (newCheck.trim()) {
        setChecks([...checks, newCheck.trim()]);
        setNewCheck('');
      }
    };

    return (
      <Modal onClose={() => setInspectionModal(null)} width="600px">
        <h3 style={{ marginTop: 0, marginBottom: 20 }}>{inspection.building} – {inspection.id}</h3>
        <SelectField
          label="Inspection Type"
          value={inspType}
          onChange={e => {
            setInspType(e.target.value);
            setChecks(INSPECTION_TEMPLATES[e.target.value] || []);
          }}
          options={Object.keys(INSPECTION_TEMPLATES)}
        />
        <div style={{ marginTop: 20 }}>
          <h4 style={{ marginBottom: 10 }}>Checklist</h4>
          <div style={{ display: 'grid', gap: 10, maxHeight: 250, overflowY: 'auto' }}>
            {checks.map((c, idx) => (
              <CheckboxItem key={idx} label={c} />
            ))}
          </div>
          <div style={{ marginTop: 15, display: 'flex', gap: 10 }}>
            <input
              type="text"
              placeholder="Custom check…"
              value={newCheck}
              onChange={e => setNewCheck(e.target.value)}
              style={{ flex: 1, padding: 8, border: `1px solid ${colors.lightGray}`, borderRadius: 6 }}
            />
            <button onClick={addCheck} style={{ background: colors.primary, border: 'none', padding: '8px 14px', borderRadius: 6, color: colors.white, cursor: 'pointer', fontWeight: 600 }}>
              Add
            </button>
          </div>
        </div>
        <button style={{ marginTop: 20, background: colors.primary, border: 'none', padding: '10px 20px', borderRadius: 6, color: colors.white, fontWeight: 600, cursor: 'pointer' }}>
          Save Inspection
        </button>
      </Modal>
    );
  };

  // ---------------- TAB RENDERS ----------------
  const BuildingsTab = () => (
    <div style={{ background: colors.white, padding: 20, borderRadius: 8, overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
        <thead>
          <tr>
            {['ID', 'Name', 'Address', 'Type', 'Construction', 'Last Insp.', 'Next Due', 'Status'].map(h => (
              <th key={h} style={{ padding: 12, textAlign: 'left', borderBottom: `2px solid ${colors.lightGray}`, color: colors.gray }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {buildings.map(b => (
            <tr key={b.id} style={{ cursor: 'pointer' }} onClick={() => setBuildingModal(b)}>
              <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}`, fontWeight: 600 }}>{b.id}</td>
              <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}` }}>{b.name}</td>
              <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}`, color: colors.gray }}>{b.address}</td>
              <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}` }}>{b.type}</td>
              <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}` }}>{b.construction}</td>
              <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}` }}>{b.lastInspection}</td>
              <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}` }}>{b.nextDue}</td>
              <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}` }}>
                <span
                  style={{
                    padding: '4px 8px',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 600,
                    background:
                      b.status === 'Compliant' ? colors.success : b.status === 'Pending' ? colors.warning : colors.danger,
                    color: colors.white
                  }}
                >
                  {b.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const InspectionsTab = () => (
    <div style={{ background: colors.white, padding: 20, borderRadius: 8, overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
        <thead>
          <tr>
            {['ID', 'Building', 'Type', 'Date', 'Inspector', 'Status'].map(h => (
              <th key={h} style={{ padding: 12, textAlign: 'left', borderBottom: `2px solid ${colors.lightGray}`, color: colors.gray }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {inspections.map(i => (
            <tr key={i.id} style={{ cursor: 'pointer' }} onClick={() => setInspectionModal(i)}>
              <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}`, fontWeight: 600 }}>{i.id}</td>
              <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}` }}>{i.building}</td>
              <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}` }}>{i.type}</td>
              <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}` }}>{i.date}</td>
              <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}`, color: colors.gray }}>{i.inspector}</td>
              <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}` }}>
                <span
                  style={{
                    padding: '4px 8px',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 600,
                    background:
                      i.status === 'Completed' ? colors.success : i.status === 'In Progress' ? colors.warning : colors.info,
                    color: colors.white
                  }}
                >
                  {i.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const PrePlansTab = () => (
    <div style={{ background: colors.white, padding: 20, borderRadius: 8, overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
        <thead>
          <tr>
            {['ID', 'Building', 'Last Updated', 'Hazards', 'Access', 'Hydrants'].map(h => (
              <th key={h} style={{ padding: 12, textAlign: 'left', borderBottom: `2px solid ${colors.lightGray}`, color: colors.gray }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {prePlans.map(p => (
            <tr key={p.id}>
              <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}`, fontWeight: 600 }}>{p.id}</td>
              <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}` }}>{p.building}</td>
              <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}` }}>{p.updated}</td>
              <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}`, color: colors.gray }}>{p.hazards}</td>
              <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}` }}>{p.access}</td>
              <td style={{ padding: 12, borderBottom: `1px solid ${colors.lightGray}`, color: colors.gray }}>{p.hydrants}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTab = () => {
    switch (activeTab) {
      case 'Buildings':
        return <BuildingsTab />;
      case 'Inspections':
        return <InspectionsTab />;
      case 'Pre‑Plans':
        return <PrePlansTab />;
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: 25 }}>
      <PageHeader title="Occupancy Management" buttonLabel="Add Building" onButtonClick={() => setShowAddModal(true)} />
      <SubNav tabs={['Buildings', 'Inspections', 'Pre‑Plans']} activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderTab()}
      {showAddModal && <AddBuildingModal />}
      {buildingModal && <BuildingDetailModal building={buildingModal} />}
      {inspectionModal && <InspectionDetailModal inspection={inspectionModal} />}
    </div>
  );
};

// -----------------------------------------------------------------------------
//  PERSONNEL & EQUIPMENT – SIMPLE PLACEHOLDERS FOR DEMO
// -----------------------------------------------------------------------------
const PersonnelContent = () => (
  <div style={{ padding: 25 }}>
    <PageHeader title="Personnel" />
    <p style={{ color: colors.gray }}>Personnel management module coming soon…</p>
  </div>
);

const EquipmentContent = () => (
  <div style={{ padding: 25 }}>
    <PageHeader title="Equipment" />
    <p style={{ color: colors.gray }}>Equipment inventory & maintenance tracking coming soon…</p>
  </div>
);

const PlaceholderContent = ({ tabName }) => (
  <div style={{ padding: 25 }}>
    <PageHeader title={tabName.charAt(0).toUpperCase() + tabName.slice(1)} />
    <p style={{ color: colors.gray }}>
      This section is a placeholder. Additional functionality will be added in future sprints.
    </p>
  </div>
);

// -----------------------------------------------------------------------------
//  MAIN APP ROUTER
// -----------------------------------------------------------------------------
const App = () => {
  const [activeTab, setActiveTab] = React.useState('dashboard');

  React.useEffect(() => {
    // demo analytics hook
    if (typeof gtag !== 'undefined') {
      gtag('event', 'demo_tab_change', { tab: activeTab });
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'incidents':
        return <IncidentsContent />;
      case 'occupancies':
        return <OccupanciesContent />;
      case 'personnel':
        return <PersonnelContent />;
      case 'equipment':
        return <EquipmentContent />;
      case 'reports':
        return <PlaceholderContent tabName="reports" />;
      case 'settings':
        return <PlaceholderContent tabName="settings" />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ flex: 1, overflowY: 'auto', background: colors.light }}>{renderContent()}</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('react-app-container'));
