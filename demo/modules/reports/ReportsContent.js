// demo/modules/reports/ReportsContent.js
const ReportsContent = ({ isNightMode, onNightModeToggle }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedReport, setSelectedReport] = React.useState(null);
    const [generatedReport, setGeneratedReport] = React.useState(null);

    const reports = {
        "Events & Performance": [
            "Response Time & Turnout Time Breakdown by Unit",
            "Apparatus Usage & On-Scene Time by Event Type",
            "Civilian & Firefighter Casualty Analysis",
            "Mutual Aid Given vs. Received Summary"
        ],
        "Administrative & Operations": [
            "Occupancy Inspection Status & Violation Trends",
            "Expiring Certifications & Training Requirements",
            "Hydrant Maintenance & Flow Test History",
            "Apparatus Maintenance & Cost Analysis"
        ]
    };

    const openReportModal = (reportTitle) => {
        setSelectedReport(reportTitle);
        setIsModalOpen(true);
    };

    const handleRunReport = () => {
        // Find the corresponding mock data.
        const reportData = mockReportData[selectedReport];
        if (reportData) {
            setGeneratedReport(reportData);
        } else {
            // Fallback for reports without mock data yet
            alert(`The report '${selectedReport}' is not yet implemented in this demo.`);
        }
        setIsModalOpen(false);
    };

    const ReportParameterModal = () => (
        <Modal onClose={() => setIsModalOpen(false)}>
            <h3 style={{ color: 'var(--dark)', marginTop: 0, marginBottom: '5px' }}>Report Parameters</h3>
            <p style={{ color: 'var(--gray)', marginBottom: '20px', fontSize: '14px' }}>{selectedReport}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <FormField label="Start Date" type="date" />
                <FormField label="End Date" type="date" />
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '30px', borderTop: '1px solid var(--light-gray)', paddingTop: '20px' }}>
                 <button onClick={() => setIsModalOpen(false)} style={{ background: 'var(--light-gray)', color: 'var(--dark)', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                 <button onClick={handleRunReport} style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Run Report</button>
            </div>
        </Modal>
    );

    // If a report has been generated, show it. Otherwise, show the list.
    if (generatedReport) {
        return (
            <div style={{ padding: '25px' }}>
                <ReportDisplay reportData={generatedReport} onBack={() => setGeneratedReport(null)} />
            </div>
        );
    }

    return (
        <div style={{ padding: '25px' }}>
            <PageHeader
                title="Reports"
                isNightMode={isNightMode}
                onNightModeToggle={onNightModeToggle}
            />
            {Object.entries(reports).map(([category, reportList]) => (
                <div key={category} style={{ marginBottom: '30px' }}>
                    <h3 style={{ color: 'var(--dark)', borderBottom: '2px solid var(--light-gray)', paddingBottom: '10px', marginBottom: '15px' }}>{category}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
                        {reportList.map(title => (
                            <div key={title} onClick={() => openReportModal(title)} style={{ background: 'var(--light)', border: '1px solid var(--light-gray)', padding: '20px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease' }} 
                                 onMouseOver={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                                 onMouseOut={e => e.currentTarget.style.borderColor = 'var(--light-gray)'}>
                                <p style={{ fontWeight: '600', color: 'var(--dark)', margin: 0 }}>{title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {isModalOpen && <ReportParameterModal />}
        </div>
    );
};
