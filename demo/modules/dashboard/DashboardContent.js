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
            <PageHeader 
                title="Dashboard" 
                isNightMode={isNightMode}
                onNightModeToggle={onNightModeToggle}
                onFullScreenToggle={onFullScreenToggle}
            />
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
