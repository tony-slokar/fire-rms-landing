const Sidebar = ({ activeTab, setActiveTab, onNavToggle, isLoggedIn, onLogout, onLoginClick }) => {
  const [hoveredTab, setHoveredTab] = React.useState(null);
  const navItems = ['dashboard', 'events', 'occupancies', 'personnel', 'equipment', 'reports', 'settings'];
  const navIcons = {'dashboard': '📊', 'events': '🚨', 'occupancies': '🏢', 'reports': '📄', 'personnel': '👨‍🚒', 'equipment': '🚒', 'settings': '⚙️'};
  
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

  return (
    <div style={{ width: '220px', background: 'var(--secondary)', color: 'white', display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto' }}>
      <div style={{ padding: '20px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px', fontWeight: 'bold' }}>
              <div style={{ width: '30px', height: '30px', background: 'var(--primary)', borderRadius: '6px', marginRight: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🔥</div>
              LadderOps
          </div>
          <button onClick={onNavToggle} style={hamburgerStyle} title="Toggle Sidebar">{'☰'}</button>
      </div>
      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {navItems.map(tab => (
            <li key={tab} style={navItemStyle(tab)} onClick={() => setActiveTab(tab)} onMouseEnter={() => setHoveredTab(tab)} onMouseLeave={() => setHoveredTab(null)} role="button" aria-current={activeTab === tab ? 'page' : undefined}>
              <span style={{ marginRight: '12px', fontSize: '18px', width: '24px', textAlign: 'center' }}>{navIcons[tab]}</span>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'events' && <span style={{ marginLeft: 'auto', background: 'var(--success)', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>NERIS</span>}
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