const Sidebar = ({ activeTab, setActiveTab, onNavToggle, isLoggedIn, onLogout, onLoginClick }) => {
  const [hoveredTab, setHoveredTab] = React.useState(null);
  const navItems = ['dashboard', 'events', 'inspections', 'occupancies', 'personnel', 'equipment', 'reports', 'settings'];
  const navIcons = {
    'dashboard': 'bar-chart-2', 
    'events': 'alert-circle', 
    'inspections': 'check-square',
    'occupancies': 'home',
    'reports': 'file-text', 
    'personnel': 'users', 
    'equipment': 'truck', 
    'settings': 'settings'
  };
  
  const navItemStyle = (tabName) => ({
    padding: '12px 20px', marginBottom: '4px', display: 'flex', alignItems: 'center',
    background: activeTab === tabName ? 'rgba(255, 255, 255, 0.1)' : (hoveredTab === tabName ? 'rgba(255, 255, 255, 0.05)' : 'transparent'),
    borderLeft: activeTab === tabName ? `4px solid var(--primary)` : '4px solid transparent',
    cursor: 'pointer', transition: 'background 0.2s ease-in-out, border-left 0.2s ease-in-out',
    fontWeight: activeTab === tabName ? '600' : 'normal', color: 'white'
  });

  const hamburgerStyle = {
    background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer', padding: '5px'
  };

  React.useEffect(() => {
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }, [activeTab]);

  return (
    <div style={{ width: '220px', background: 'var(--secondary)', color: 'white', display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto' }}>
      <div style={{ padding: '20px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* UPDATED: Replaced the old logo div with the new image logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="images/logo-header-white.png" alt="LadderOps Logo" style={{ height: '30px', width: 'auto' }} />
          </div>

          <button onClick={onNavToggle} style={hamburgerStyle} title="Toggle Sidebar">
            <i data-feather="menu" style={{ width: '20px', height: '20px' }}></i>
          </button>
      </div>
      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {navItems.map(tab => (
            <li key={tab} style={navItemStyle(tab)} onClick={() => setActiveTab(tab)} onMouseEnter={() => setHoveredTab(tab)} onMouseLeave={() => setHoveredTab(null)} role="button" aria-current={activeTab === tab ? 'page' : undefined}>
              <span style={{ marginRight: '12px', fontSize: '18px', width: '24px', textAlign: 'center' }}>
                <i data-feather={navIcons[tab]} style={{ width: '18px', height: '18px' }}></i>
              </span>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'events' && <span style={{ marginLeft: 'auto', background: 'var(--success)', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>NERIS/NEMSIS</span>}
            </li>
          ))}
        </ul>
      </nav>
      
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', padding: '20px', marginTop: 'auto' }}>
        <div style={{fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '10px'}}>Anytown Fire Dept.</div>
        {isLoggedIn ? (
            <div onClick={onLogout} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '6px' }} title="Click to Log Out">
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', marginRight: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>JD</div>
                <div>
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>John Davis</div>
                    <div style={{ fontSize: '12px', opacity: 0.7 }}>Fire Captain</div>
                </div>
            </div>
        ) : (
            <button onClick={onLoginClick} style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', width: '100%' }}>
                Sign In
            </button>
        )}
      </div>
    </div>
  );
};