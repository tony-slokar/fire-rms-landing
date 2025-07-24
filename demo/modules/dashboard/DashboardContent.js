const DashboardContent = ({ isNightMode, onNightModeToggle, onFullScreenToggle }) => {
    const KpiCard = ({ title, value, icon, change }) => {
        React.useEffect(() => {
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        });

        return (
            <div style={{ background: 'var(--light)', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: `1px solid var(--light-gray)` }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ 
                        fontSize: '24px', 
                        marginRight: '15px', 
                        color: 'var(--primary)',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <i data-feather={icon} style={{ width: '24px', height: '24px' }}></i>
                    </div>
                    <div>
                        <div style={{ color: 'var(--gray)', fontSize: '14px' }}>{title}</div>
                        <div style={{ color: 'var(--dark)', fontSize: '24px', fontWeight: 'bold' }}>{value}</div>
                    </div>
                </div>
                {change && <div style={{ fontSize: '12px', color: change.startsWith('+') ? 'var(--success)' : 'var(--danger)' }}>{change} vs last month</div>}
            </div>
        );
    };

    const recentEvents = [
        { id: '2025-00123', date: '2025-07-17', type: '111 - Building Fire', status: 'Closed' },
        { id: '2025-00122', date: '2025-07-17', type: '322 - Vehicle Fire', status: 'Closed' },
        { id: '2025-00121', date: '2025-07-16', type: '554 - Person in Water', status: 'Open' },
        { id: '2025-00120', date: '2025-07-16', type: '611 - EMS Call', status: 'Closed' },
    ];

    React.useEffect(() => {
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }, []);
    
    return (
        <div style={{padding: '25px'}}>
            <PageHeader
                title="Dashboard"
                isNightMode={isNightMode}
                onNightModeToggle={onNightModeToggle}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '25px' }}>
                <KpiCard title="Events this Month" value="123" icon="alert-circle" change="+5.2%"/>
                <KpiCard title="Avg. Response Time" value="4:32" icon="clock" change="-0.8%"/>
                <KpiCard title="Inspections Due" value="18" icon="check-square" change="+12.5%"/>
                <KpiCard title="Training Hours" value="82" icon="book-open" change="+10%"/>
            </div>
            <h3 style={{color: 'var(--dark)', marginBottom: '15px'}}>Recent Events</h3>
            <div style={{ background: 'var(--light)', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: `1px solid var(--light-gray)` }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--dark)'}}>
                    <thead>
                        <tr>
                            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid var(--light-gray)', color: 'var(--gray)'}}>Event ID</th>
                            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid var(--light-gray)', color: 'var(--gray)'}}>Date</th>
                            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid var(--light-gray)', color: 'var(--gray)'}}>Type</th>
                            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid var(--light-gray)', color: 'var(--gray)'}}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentEvents.map((event, index) => (
                            <tr key={event.id}>
                                <td style={{padding: '10px', fontWeight: '600', borderBottom: `1px solid var(--light-gray)`}}>{event.id}</td>
                                <td style={{padding: '10px', borderBottom: `1px solid var(--light-gray)`}}>{event.date}</td>
                                <td style={{padding: '10px', color: 'var(--gray)', borderBottom: `1px solid var(--light-gray)`}}>{event.type}</td>
                                <td style={{padding: '10px', borderBottom: `1px solid var(--light-gray)`}}>
                                    <span style={{padding: '4px 8px', borderRadius: '10px', fontSize: '12px', background: event.status === 'Closed' ? 'var(--success)' : 'var(--warning)', color: 'white'}}>{event.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};