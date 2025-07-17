// demo/modules/reports/ReportDisplay.js

const ReportDisplay = ({ reportData, onBack }) => {
    const { title, dateRange, kpis, table } = reportData;

    const KpiCard = ({ label, value }) => (
        <div style={{ background: 'var(--light)', padding: '20px', borderRadius: '8px', border: `1px solid var(--light-gray)`, textAlign: 'center' }}>
            <div style={{ color: 'var(--gray)', fontSize: '14px', marginBottom: '8px' }}>{label}</div>
            <div style={{ color: 'var(--dark)', fontSize: '24px', fontWeight: 'bold' }}>{value}</div>
        </div>
    );

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                <button onClick={onBack} style={{ background: 'var(--light-gray)', color: 'var(--dark)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '20px', fontWeight: 'bold' }}>
                    &larr;
                </button>
                <div>
                    <h2 style={{ color: 'var(--dark)', margin: 0 }}>{title}</h2>
                    <p style={{ color: 'var(--gray)', margin: 0 }}>{dateRange}</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '25px' }}>
                {kpis.map(kpi => <KpiCard key={kpi.label} {...kpi} />)}
            </div>

            <div style={{ background: 'var(--light)', padding: '20px', borderRadius: '8px', border: '1px solid var(--light-gray)', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--dark)' }}>
                    <thead>
                        <tr>
                            {table.headers.map(header => (
                                <th key={header} style={{ borderBottom: `2px solid var(--light-gray)`, padding: '12px', textAlign: 'left', color: 'var(--gray)', fontSize: '14px' }}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {table.rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="no-wrap" style={{ borderBottom: `1px solid var(--light-gray)`, padding: '12px', fontWeight: cellIndex === 0 ? '600' : 'normal' }}>
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
