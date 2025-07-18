const SettingsContent = ({ isNightMode, onNightModeToggle }) => {
    const [theme, setTheme] = React.useState('system');
    const [isAdminModalOpen, setIsAdminModalOpen] = React.useState(false);

    // Mock state for notification toggles
    const [certNotifications, setCertNotifications] = React.useState(true);
    const [memoNotifications, setMemoNotifications] = React.useState(true);
    const [reportNotifications, setReportNotifications] = React.useState(false);

    const AdminRedirectModal = () => (
        <Modal onClose={() => setIsAdminModalOpen(false)}>
            <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '48px'}}>🔐</div>
                <h3 style={{ color: 'var(--dark)', marginTop: '10px', marginBottom: '5px' }}>Administrative Access Required</h3>
                <p style={{ color: 'var(--gray)', margin: '0 auto 20px auto', maxWidth: '300px' }}>
                    You are being redirected to the Admin Console. This area requires a separate administrative login.
                </p>
                <button onClick={() => setIsAdminModalOpen(false)} style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', width: '100%' }}>
                    Acknowledge & Proceed
                </button>
            </div>
        </Modal>
    );

    const SettingsCard = ({ title, children }) => (
        <div style={{ background: 'var(--light)', border: '1px solid var(--light-gray)', borderRadius: '8px', marginBottom: '25px' }}>
            <div style={{ padding: '15px 20px', borderBottom: '1px solid var(--light-gray)' }}>
                <h3 style={{ margin: 0, color: 'var(--dark)' }}>{title}</h3>
            </div>
            <div style={{ padding: '20px' }}>
                {children}
            </div>
        </div>
    );

    return (
        <div style={{ padding: '25px', maxWidth: '900px', margin: '0 auto' }}>
            <PageHeader
                title="Settings"
                isNightMode={isNightMode}
                onNightModeToggle={onNightModeToggle}
            />

            <SettingsCard title="User Preferences">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <SelectField label="Default Theme" value={theme} onChange={(e) => setTheme(e.target.value)}>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">Sync with System</option>
                    </SelectField>
                    <SelectField label="Default Start Page">
                        <option>Dashboard</option>
                        <option>Events</option>
                    </SelectField>
                </div>
            </SettingsCard>
            
            <SettingsCard title="Notification Preferences">
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <ToggleSwitch label="Expiring Certifications" enabled={certNotifications} setEnabled={setCertNotifications} />
                    <ToggleSwitch label="New Department Memo" enabled={memoNotifications} setEnabled={setMemoNotifications} />
                    <ToggleSwitch label="Report Ready for Review" enabled={reportNotifications} setEnabled={setReportNotifications} />
                 </div>
            </SettingsCard>

            <SettingsCard title="Department Administration">
                <p style={{color: 'var(--gray)', marginTop: 0, marginBottom: '15px'}}>These settings affect all users in the Anytown Fire Department and require administrative privileges to modify.</p>
                <button onClick={() => setIsAdminModalOpen(true)} style={{ background: 'var(--secondary)', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                    Go to Admin Console &rarr;
                </button>
            </SettingsCard>
            
            {isAdminModalOpen && <AdminRedirectModal />}
        </div>
    );
};