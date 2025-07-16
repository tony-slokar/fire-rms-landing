// demo/App.js
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
