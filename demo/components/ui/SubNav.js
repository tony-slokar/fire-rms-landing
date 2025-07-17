const SubNav = ({ tabs, activeTab, setActiveTab }) => (
    <div style={{ display: 'flex', borderBottom: `1px solid var(--light-gray)`, marginBottom: '25px', overflowX: 'auto' }}>
        {tabs.map(tab => (
            <div key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 15px', borderBottom: activeTab === tab ? `3px solid var(--primary)` : '3px solid transparent', fontWeight: activeTab === tab ? 'bold' : 'normal', color: activeTab === tab ? 'var(--primary)' : 'var(--gray)', cursor: 'pointer', fontSize: '14px', transform: 'translateY(1px)', whiteSpace: 'nowrap' }}>
                {tab}
            </div>
        ))}
    </div>
);
