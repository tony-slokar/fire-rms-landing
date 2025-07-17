const App = () => {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  
  // State for new UI features
  const [isNightMode, setIsNightMode] = React.useState(false);
  const [isNavHidden, setIsNavHidden] = React.useState(false);

  // Track demo interactions for analytics
  React.useEffect(() => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'demo_module_view', {
        event_category: 'demo_interaction',
        event_label: activeTab
      });
    }
  }, [activeTab]);
  
  const handleFullScreenToggle = () => {
    const elem = document.querySelector('.tablet-bezel');
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
  };

  const renderContent = () => {
    // ... (This function remains unchanged)
    switch (activeTab) {
      case 'dashboard': return <DashboardContent />;
      case 'events': return <EventRecordContent />;
      case 'occupancies': return <OccupanciesContent />;
      case 'personnel': return <PersonnelContent />;
      case 'equipment': return <EquipmentContent />;
      case 'reports': return <PlaceholderContent tabName="reports" />;
      case 'settings': return <PlaceholderContent tabName="settings" />;
      default: return <DashboardContent />;
    }
  };

  // Main container class toggles night-mode on/off
  const appContainerClass = isNightMode ? 'night-mode' : '';

  return (
    <div className={appContainerClass} style={{ display: 'flex', height: '100%', width: '100%', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ background: colors.light, display: 'flex', height: '100%', width: '100%' }}>
            {!isNavHidden && <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />}
            <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
                {renderContent()}
            </div>
        </div>
        <DemoControls 
            isNightMode={isNightMode}
            onNightModeToggle={() => setIsNightMode(!isNightMode)}
            onFullScreenToggle={handleFullScreenToggle}
            onNavToggle={() => setIsNavHidden(!isNavHidden)}
        />
    </div>
  );
};
