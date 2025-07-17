// demo/modules/reports/ReportDisplay.js

const ReportDisplay = ({ reportData, onBack }) => {
    const { title, dateRange, kpis, table } = reportData;

    const handleExportCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += table.headers.join(",") + "\r\n";
        table.rows.forEach(rowArray => {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${title.replace(/ /g, "_")}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportPDF = () => {
        // Simple print-to-pdf functionality
        window.print();
    };

    const KpiCard = ({ label, value }) => (
        <div className="report-kpi" style={{ background: 'var(--light)', padding: '20px', borderRadius: '8px', border: `1px solid var(--light-gray)`, textAlign: 'center' }}>
            <div style={{ color: 'var(--gray)', fontSize: '14px', marginBottom: '8px' }}>{label}</div>
            <div style={{ color: 'var(--dark)', fontSize: '24px', fontWeight: 'bold' }}>{value}</div>
        </div>
    );
    
    const actionButtonStyle = {
        background: 'var(--light-gray)', color: 'var(--dark)', border: 'none', 
        padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', 
        fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px'
    };

    return (
        <div className="report-container">
            <div className="report-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px', marginBottom: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button onClick={onBack} className="back-button" style={{ background: 'var(--light-gray)', color: 'var(--dark)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '20px', fontWeight: 'bold' }}>
                        &larr;
                    </button>
                    <div>
                        <h2 style={{ color: 'var(--dark)', margin: 0 }}>{title}</h2>
                        <p style={{ color: 'var(--gray)', margin: 0 }}>{dateRange}</p>
                    </div>
                </div>
                <div className="report-actions" style={{display: 'flex', gap: '10px'}}>
                    <button onClick={handleExportCSV} style={actionButtonStyle}>
                        <span style={{fontSize: '18px'}}>📄</span> CSV
                    </button>
                     <button onClick={handleExportPDF} style={actionButtonStyle}>
                        <span style={{fontSize: '18px'}}>🖨️</span> PDF
                    </button>
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
