const SettingsContent = ({ isNightMode, onNightModeToggle }) => {
    const [activeTab, setActiveTab] = React.useState('Profile');
    const [showModal, setShowModal] = React.useState(false);
    const tabs = ['Profile', 'Preferences', 'Notifications', 'Admin'];

    const ProfileTab = () => (
        <div style={{ background: 'var(--light)', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid var(--light-gray)' }}>
            <h4 style={{ color: 'var(--dark)', marginBottom: '20px', borderBottom: '1px solid var(--light-gray)', paddingBottom: '10px' }}>Personal Information</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <FormField label="First Name" value="John" />
                <FormField label="Last Name" value="Davis" />
                <FormField label="Badge Number" value="101" readOnly />
                <FormField label="Email" value="j.davis@anytownfd.gov" />
                <FormField label="Phone" value="(555) 987-6543" />
                <FormField label="Emergency Contact" value="Jane Davis - (555) 123-4567" />
            </div>
            
            <h4 style={{ color: 'var(--dark)', marginBottom: '20px', borderBottom: '1px solid var(--light-gray)', paddingBottom: '10px' }}>Security</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', border: '1px solid var(--light-gray)', borderRadius: '6px' }}>
                    <div>
                        <div style={{ fontWeight: '600', color: 'var(--dark)', marginBottom: '5px' }}>Password</div>
                        <div style={{ fontSize: '12px', color: 'var(--gray)' }}>Last changed: 2024-12-15</div>
                    </div>
                    <button 
                        onClick={() => setShowModal(true)}
                        style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
                    >
                        Change Password
                    </button>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', border: '1px solid var(--light-gray)', borderRadius: '6px' }}>
                    <div>
                        <div style={{ fontWeight: '600', color: 'var(--dark)', marginBottom: '5px' }}>Two-Factor Authentication</div>
                        <div style={{ fontSize: '12px', color: 'var(--gray)' }}>Add an extra layer of security</div>
                    </div>
                    <SelectField label="">
                        <option>Disabled</option>
                        <option>SMS</option>
                        <option>Authenticator App</option>
                    </SelectField>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', border: '1px solid var(--light-gray)', borderRadius: '6px' }}>
                    <div>
                        <div style={{ fontWeight: '600', color: 'var(--dark)', marginBottom: '5px' }}>Last Login</div>
                        <div style={{ fontSize: '12px', color: 'var(--gray)' }}>2025-07-19 08:30 AM</div>
                    </div>
                    <button 
                        style={{ background: 'var(--light-gray)', color: 'var(--dark)', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
                        onClick={() => alert('This will log you out of all devices. Continue?')}
                    >
                        Sign Out All Devices
                    </button>
                </div>
            </div>
        </div>
    );

    const PreferencesTab = () => (
        <div style={{ background: 'var(--light)', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid var(--light-gray)' }}>
            <h4 style={{ color: 'var(--dark)', marginBottom: '20px', borderBottom: '1px solid var(--light-gray)', paddingBottom: '10px' }}>Display & Interface</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <SelectField label="Theme Preference">
                    <option>Light Mode</option>
                    <option>Dark Mode</option>
                    <option>Auto (Follow System)</option>
                </SelectField>
                <SelectField label="Language">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                </SelectField>
                <SelectField label="Time Format">
                    <option>24-Hour (14:30)</option>
                    <option>12-Hour (2:30 PM)</option>
                </SelectField>
                <SelectField label="Date Format">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                </SelectField>
            </div>

            <h4 style={{ color: 'var(--dark)', marginBottom: '20px', borderBottom: '1px solid var(--light-gray)', paddingBottom: '10px' }}>Workflow Preferences</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <SelectField label="Default Landing Page">
                    <option>Dashboard</option>
                    <option>Events</option>
                    <option>Reports</option>
                    <option>Last Visited</option>
                </SelectField>
                <SelectField label="Auto-Save Frequency">
                    <option>Every 30 seconds</option>
                    <option>Every 1 minute</option>
                    <option>Every 5 minutes</option>
                    <option>Manual only</option>
                </SelectField>
                <SelectField label="Report Export Default">
                    <option>PDF</option>
                    <option>CSV</option>
                    <option>Excel</option>
                </SelectField>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', border: '1px solid var(--light-gray)', borderRadius: '6px' }}>
                    <div>
                        <div style={{ fontWeight: '600', color: 'var(--dark)', marginBottom: '5px' }}>Show tips and tutorials</div>
                        <div style={{ fontSize: '12px', color: 'var(--gray)' }}>Get helpful hints while using the app</div>
                    </div>
                    <label style={{position: 'relative', display: 'inline-block', width: '50px', height: '28px'}}>
                        <input type="checkbox" defaultChecked style={{opacity: 0, width: 0, height: 0}} />
                        <span style={{position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--primary)', transition: '.4s', borderRadius: '28px'}}>
                            <span style={{position: 'absolute', height: '22px', width: '22px', left: '3px', bottom: '3px', background: 'white', transition: '.4s', borderRadius: '50%', transform: 'translateX(22px)'}}></span>
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );

    const NotificationsTab = () => (
        <div style={{ background: 'var(--light)', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid var(--light-gray)' }}>
            <h4 style={{ color: 'var(--dark)', marginBottom: '20px', borderBottom: '1px solid var(--light-gray)', paddingBottom: '10px' }}>Event Notifications</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', border: '1px solid var(--light-gray)', borderRadius: '6px' }}>
                    <div>
                        <div style={{ fontWeight: '600', color: 'var(--dark)' }}>New Event Assignments</div>
                        <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Get notified when assigned to new events</div>
                    </div>
                    <label style={{position: 'relative', display: 'inline-block', width: '50px', height: '28px'}}>
                        <input type="checkbox" defaultChecked style={{opacity: 0, width: 0, height: 0}} />
                        <span style={{position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--primary)', transition: '.4s', borderRadius: '28px'}}>
                            <span style={{position: 'absolute', height: '22px', width: '22px', left: '3px', bottom: '3px', background: 'white', transition: '.4s', borderRadius: '50%', transform: 'translateX(22px)'}}></span>
                        </span>
                    </label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', border: '1px solid var(--light-gray)', borderRadius: '6px' }}>
                    <div>
                        <div style={{ fontWeight: '600', color: 'var(--dark)' }}>Event Updates</div>
                        <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Status changes on events you're involved in</div>
                    </div>
                    <label style={{position: 'relative', display: 'inline-block', width: '50px', height: '28px'}}>
                        <input type="checkbox" defaultChecked style={{opacity: 0, width: 0, height: 0}} />
                        <span style={{position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--primary)', transition: '.4s', borderRadius: '28px'}}>
                            <span style={{position: 'absolute', height: '22px', width: '22px', left: '3px', bottom: '3px', background: 'white', transition: '.4s', borderRadius: '50%', transform: 'translateX(22px)'}}></span>
                        </span>
                    </label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', border: '1px solid var(--light-gray)', borderRadius: '6px' }}>
                    <div>
                        <div style={{ fontWeight: '600', color: 'var(--dark)' }}>Mutual Aid Requests</div>
                        <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Notifications for mutual aid calls</div>
                    </div>
                    <label style={{position: 'relative', display: 'inline-block', width: '50px', height: '28px'}}>
                        <input type="checkbox" style={{opacity: 0, width: 0, height: 0}} />
                        <span style={{position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--light-gray)', transition: '.4s', borderRadius: '28px'}}>
                            <span style={{position: 'absolute', height: '22px', width: '22px', left: '3px', bottom: '3px', background: 'white', transition: '.4s', borderRadius: '50%'}}></span>
                        </span>
                    </label>
                </div>
            </div>

            <h4 style={{ color: 'var(--dark)', marginBottom: '20px', borderBottom: '1px solid var(--light-gray)', paddingBottom: '10px' }}>System Notifications</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', border: '1px solid var(--light-gray)', borderRadius: '6px' }}>
                    <div>
                        <div style={{ fontWeight: '600', color: 'var(--dark)' }}>Certification Reminders</div>
                        <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Alerts 30 days before expiration</div>
                    </div>
                    <label style={{position: 'relative', display: 'inline-block', width: '50px', height: '28px'}}>
                        <input type="checkbox" defaultChecked style={{opacity: 0, width: 0, height: 0}} />
                        <span style={{position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--primary)', transition: '.4s', borderRadius: '28px'}}>
                            <span style={{position: 'absolute', height: '22px', width: '22px', left: '3px', bottom: '3px', background: 'white', transition: '.4s', borderRadius: '50%', transform: 'translateX(22px)'}}></span>
                        </span>
                    </label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', border: '1px solid var(--light-gray)', borderRadius: '6px' }}>
                    <div>
                        <div style={{ fontWeight: '600', color: 'var(--dark)' }}>Schedule Changes</div>
                        <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Notifications when your schedule is updated</div>
                    </div>
                    <label style={{position: 'relative', display: 'inline-block', width: '50px', height: '28px'}}>
                        <input type="checkbox" defaultChecked style={{opacity: 0, width: 0, height: 0}} />
                        <span style={{position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--primary)', transition: '.4s', borderRadius: '28px'}}>
                            <span style={{position: 'absolute', height: '22px', width: '22px', left: '3px', bottom: '3px', background: 'white', transition: '.4s', borderRadius: '50%', transform: 'translateX(22px)'}}></span>
                        </span>
                    </label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', border: '1px solid var(--light-gray)', borderRadius: '6px' }}>
                    <div>
                        <div style={{ fontWeight: '600', color: 'var(--dark)' }}>System Maintenance</div>
                        <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Scheduled downtime and updates</div>
                    </div>
                    <label style={{position: 'relative', display: 'inline-block', width: '50px', height: '28px'}}>
                        <input type="checkbox" style={{opacity: 0, width: 0, height: 0}} />
                        <span style={{position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--light-gray)', transition: '.4s', borderRadius: '28px'}}>
                            <span style={{position: 'absolute', height: '22px', width: '22px', left: '3px', bottom: '3px', background: 'white', transition: '.4s', borderRadius: '50%'}}></span>
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );

    const AdminTab = () => (
        <div style={{ background: 'var(--light)', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid var(--light-gray)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔐</div>
                    <h3 style={{ color: 'var(--dark)', marginBottom: '15px' }}>
                        Department Administration
                    </h3>
                    <p style={{ color: 'var(--gray)', fontSize: '16px', marginBottom: '30px' }}>
                        System-wide settings, user management, and department configuration are handled through the dedicated Administration Portal.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                        <button 
                            style={{ 
                                background: 'var(--primary)', 
                                color: 'white', 
                                border: 'none', 
                                padding: '12px 24px', 
                                borderRadius: '6px', 
                                cursor: 'pointer', 
                                fontWeight: '600',
                                fontSize: '16px',
                                minWidth: '200px'
                            }}
                            onClick={() => alert('In a real deployment, this would open: https://admin.ladderops.com')}
                        >
                            🚀 Open Admin Portal
                        </button>
                        <div style={{ fontSize: '12px', color: 'var(--gray)', textAlign: 'center' }}>
                            Requires administrator privileges<br/>
                            Separate login required for security
                        </div>
                    </div>
                </div>
                
                <div style={{ padding: '20px', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid var(--info)', borderRadius: '8px' }}>
                    <h4 style={{ color: 'var(--info)', marginBottom: '15px', fontSize: '16px' }}>Admin Portal Features:</h4>
                    <ul style={{ color: 'var(--gray)', fontSize: '14px', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                        <li>User accounts & role management</li>
                        <li>Department settings & NERIS configuration</li>
                        <li>CAD system integrations</li>
                        <li>Backup & security settings</li>
                        <li>System monitoring & logs</li>
                        <li>Billing & subscription management</li>
                    </ul>
                </div>
            </div>
        </div>
    );

    const ChangePasswordModal = () => (
        <Modal onClose={() => setShowModal(false)}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: 'var(--dark)' }}>Change Password</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <FormField label="Current Password" type="password" required={true} />
                <FormField label="New Password" type="password" required={true} />
                <FormField label="Confirm New Password" type="password" required={true} />
            </div>
            <div style={{ fontSize: '12px', color: 'var(--gray)', margin: '15px 0', padding: '10px', background: 'var(--light)', borderRadius: '4px' }}>
                Password must be at least 8 characters with uppercase, lowercase, number, and special character.
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '30px', borderTop: '1px solid var(--light-gray)', paddingTop: '20px' }}>
                <button onClick={() => setShowModal(false)} style={{ background: 'var(--light-gray)', color: 'var(--dark)', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                <button onClick={() => { alert('Password changed successfully!'); setShowModal(false); }} style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Update Password</button>
            </div>
        </Modal>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Profile': return <ProfileTab />;
            case 'Preferences': return <PreferencesTab />;
            case 'Notifications': return <NotificationsTab />;
            case 'Admin': return <AdminTab />;
            default: return <ProfileTab />;
        }
    };

    return (
        <div style={{ padding: '25px' }}>
            <PageHeader
                title="Settings"
                isNightMode={isNightMode}
                onNightModeToggle={onNightModeToggle}
            />
            <SubNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {renderTabContent()}
            {showModal && <ChangePasswordModal />}
        </div>
    );
};