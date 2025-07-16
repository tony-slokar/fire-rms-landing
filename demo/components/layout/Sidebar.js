const Sidebar = ({ activeTab, setActiveTab }) => {
  const [hoveredTab, setHoveredTab] = React.useState(null);
  const navItems = ['dashboard', 'events', 'occupancies', 'personnel', 'equipment', 'reports', 'settings'];
  const navIcons = {'dashboard': '📊', 'events': '🚨', 'occupancies': '🏢', 'reports': '📄', 'personnel': '👨‍🚒', 'equipment': '🚒', 'settings': '⚙️'};
  
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
