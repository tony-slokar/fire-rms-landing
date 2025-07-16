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
