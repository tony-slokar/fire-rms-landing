const SubNav = ({ tabs, activeTab, setActiveTab }) => (
    <div style={{ display: 'flex', borderBottom: `1px solid ${colors.lightGray}`, marginBottom: '25px', overflowX: 'auto' }}>
        {tabs.map(tab => (
            <div key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 15px', borderBottom: activeTab === tab ? `3px solid ${colors.primary}` : '3px solid transparent', fontWeight: activeTab === tab ? 'bold' : 'normal', color: activeTab === tab ? colors.primary : colors.gray, cursor: 'pointer', fontSize: '14px', transform: 'translateY(1px)', whiteSpace: 'nowrap' }}>
                {tab}
            </div>
        ))}
    </div>
);
