<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LadderOps Demo</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; height: 100vh; overflow: hidden; }
        #root { height: 100vh; }
    </style>
</head>
<body>
    <div id="root"></div>
    
    <script>
        const { useState, useEffect, Fragment } = React;

        // Color Palette
        const colors = {
            primary: '#FF4500',
            secondary: '#1E3A8A',
            light: '#F9FAFB',
            dark: '#111827',
            gray: '#6B7280',
            lightGray: '#E5E7EB',
            white: '#FFFFFF',
            success: '#10B981',
            danger: '#EF4444',
            warning: '#F59E0B',
            info: '#3B82F6'
        };

        // Reusable UI Components
        const FormField = ({ label, value, type = 'text', readOnly = false }) => (
            React.createElement('div', null,
                React.createElement('label', { 
                    style: { display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: colors.dark } 
                }, label),
                React.createElement('input', { 
                    type: type, 
                    defaultValue: value, 
                    readOnly: readOnly, 
                    style: { 
                        width: '100%', 
                        padding: '10px', 
                        border: `1px solid ${colors.lightGray}`, 
                        borderRadius: '6px', 
                        fontSize: '14px', 
                        background: readOnly ? colors.lightGray : colors.white 
                    } 
                })
            )
        );

        const SelectField = ({ label, children, value, onChange }) => (
            React.createElement('div', null,
                React.createElement('label', { 
                    style: { display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: colors.dark } 
                }, label),
                React.createElement('select', { 
                    value: value, 
                    onChange: onChange, 
                    style: { 
                        width: '100%', 
                        padding: '10px', 
                        border: `1px solid ${colors.lightGray}`, 
                        borderRadius: '6px', 
                        fontSize: '14px', 
                        backgroundColor: colors.white,
                        paddingRight: '2.5rem'
                    } 
                }, children)
            )
        );

        const TextArea = ({ label, value, rows = 4 }) => (
            React.createElement('div', null,
                React.createElement('label', { 
                    style: { display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: colors.dark } 
                }, label),
                React.createElement('textarea', { 
                    defaultValue: value, 
                    rows: rows, 
                    style: { 
                        width: '100%', 
                        padding: '10px', 
                        border: `1px solid ${colors.lightGray}`, 
                        borderRadius: '6px', 
                        fontSize: '14px', 
                        resize: 'vertical' 
                    } 
                })
            )
        );

        const PageHeader = ({ title, children, buttonLabel, onButtonClick }) => (
            React.createElement('div', { 
                style: { 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start', 
                    marginBottom: '15px', 
                    flexWrap: 'wrap', 
                    gap: '10px' 
                } 
            },
                React.createElement('div', null,
                    React.createElement('h2', { 
                        style: { fontSize: '22px', fontWeight: 'bold', color: colors.dark, margin: 0, marginBottom: '5px' } 
                    }, title),
                    children
                ),
                buttonLabel && React.createElement('button', { 
                    onClick: onButtonClick, 
                    style: { 
                        background: colors.primary, 
                        border: 'none', 
                        padding: '8px 16px', 
                        borderRadius: '6px', 
                        cursor: 'pointer', 
                        fontSize: '14px', 
                        color: colors.white, 
                        fontWeight: '600' 
                    } 
                }, buttonLabel)
            )
        );

        const SubNav = ({ tabs, activeTab, setActiveTab }) => (
            React.createElement('div', { 
                style: { 
                    display: 'flex', 
                    borderBottom: `1px solid ${colors.lightGray}`, 
                    marginBottom: '25px', 
                    overflowX: 'auto' 
                } 
            },
                tabs.map(tab => 
                    React.createElement('div', { 
                        key: tab, 
                        onClick: () => setActiveTab(tab), 
                        style: { 
                            padding: '10px 15px', 
                            borderBottom: activeTab === tab ? `3px solid ${colors.primary}` : '3px solid transparent', 
                            fontWeight: activeTab === tab ? 'bold' : 'normal', 
                            color: activeTab === tab ? colors.primary : colors.gray, 
                            cursor: 'pointer', 
                            fontSize: '14px', 
                            transform: 'translateY(1px)', 
                            whiteSpace: 'nowrap' 
                        } 
                    }, tab)
                )
            )
        );

        const Modal = ({ children, onClose }) => (
            React.createElement('div', { 
                style: { 
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    background: 'rgba(0,0,0,0.5)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 1000 
                } 
            },
                React.createElement('div', { 
                    style: { 
                        background: colors.light, 
                        padding: '25px', 
                        borderRadius: '8px', 
                        width: '90%', 
                        maxWidth: '500px', 
                        position: 'relative',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    } 
                },
                    React.createElement('button', { 
                        onClick: onClose, 
                        style: { 
                            position: 'absolute', 
                            top: '10px', 
                            right: '10px', 
                            background: 'none', 
                            border: 'none', 
                            fontSize: '24px', 
                            cursor: 'pointer' 
                        } 
                    }, '×'),
                    children
                )
            )
        );

        // Sidebar Component
        const Sidebar = ({ activeTab, setActiveTab }) => {
            const [hoveredTab, setHoveredTab] = useState(null);
            const navItems = ['dashboard', 'incidents', 'occupancies', 'personnel', 'equipment', 'reports', 'settings'];
            const navIcons = {
                'dashboard': '📊', 
                'incidents': '📋', 
                'occupancies': '🏢', 
                'reports': '📄', 
                'personnel': '👨‍🚒', 
                'equipment': '🚒', 
                'settings': '⚙️'
            };

            const navItemStyle = (tabName) => ({
                padding: '12px 20px', 
                marginBottom: '4px', 
                display: 'flex', 
                alignItems: 'center',
                background: activeTab === tabName ? 'rgba(255, 255, 255, 0.1)' : (hoveredTab === tabName ? 'rgba(255, 255, 255, 0.05)' : 'transparent'),
                borderLeft: activeTab === tabName ? `4px solid ${colors.primary}` : '4px solid transparent',
                cursor: 'pointer', 
                transition: 'background 0.2s ease-in-out, border-left 0.2s ease-in-out',
                fontWeight: activeTab === tabName ? '600' : 'normal'
            });

            return React.createElement('div', { 
                style: { 
                    width: '220px', 
                    background: colors.secondary, 
                    color: colors.white, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    flexShrink: 0, 
                    overflowY: 'auto' 
                } 
            },
                React.createElement('div', { 
                    style: { 
                        padding: '20px 20px', 
                        marginBottom: '20px', 
                        fontSize: '20px', 
                        fontWeight: 'bold', 
                        display: 'flex', 
                        alignItems: 'center' 
                    } 
                },
                    React.createElement('div', { 
                        style: { 
                            width: '30px', 
                            height: '30px', 
                            background: colors.primary, 
                            borderRadius: '6px', 
                            marginRight: '10px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            fontSize: '16px' 
                        } 
                    }, '🔥'),
                    'LadderOps'
                ),
                React.createElement('nav', { style: { flex: 1 } },
                    React.createElement('ul', { style: { listStyle: 'none', padding: 0, margin: 0 } },
                        navItems.map(tab => 
                            React.createElement('li', { 
                                key: tab, 
                                style: navItemStyle(tab), 
                                onClick: () => setActiveTab(tab), 
                                onMouseEnter: () => setHoveredTab(tab), 
                                onMouseLeave: () => setHoveredTab(null) 
                            },
                                React.createElement('span', { 
                                    style: { 
                                        marginRight: '12px', 
                                        fontSize: '18px', 
                                        width: '24px', 
                                        textAlign: 'center' 
                                    } 
                                }, navIcons[tab]),
                                tab.charAt(0).toUpperCase() + tab.slice(1)
                            )
                        )
                    )
                ),
                React.createElement('div', { 
                    style: { 
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
                        padding: '20px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginTop: 'auto' 
                    } 
                },
                    React.createElement('div', { 
                        style: { 
                            width: '36px', 
                            height: '36px', 
                            borderRadius: '50%', 
                            background: colors.primary, 
                            marginRight: '12px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            fontWeight: 'bold', 
                            fontSize: '14px' 
                        } 
                    }, 'JD'),
                    React.createElement('div', null,
                        React.createElement('div', { 
                            style: { fontWeight: 'bold', fontSize: '14px' } 
                        }, 'John Davis'),
                        React.createElement('div', { 
                            style: { fontSize: '12px', opacity: 0.7 } 
                        }, 'Fire Captain')
                    )
                )
            );
        };

        // Dashboard Component
        const DashboardContent = () => {
            const KpiCard = ({ title, value, icon, change }) => (
                React.createElement('div', { 
                    style: { 
                        background: colors.white, 
                        padding: '20px', 
                        borderRadius: '8px', 
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)' 
                    } 
                },
                    React.createElement('div', { 
                        style: { 
                            display: 'flex', 
                            alignItems: 'center', 
                            marginBottom: '10px' 
                        } 
                    },
                        React.createElement('div', { 
                            style: { fontSize: '24px', marginRight: '15px' } 
                        }, icon),
                        React.createElement('div', null,
                            React.createElement('div', { 
                                style: { color: colors.gray, fontSize: '14px' } 
                            }, title),
                            React.createElement('div', { 
                                style: { color: colors.dark, fontSize: '24px', fontWeight: 'bold' } 
                            }, value)
                        )
                    ),
                    change && React.createElement('div', { 
                        style: { 
                            fontSize: '12px', 
                            color: change.startsWith('+') ? colors.success : colors.danger 
                        } 
                    }, `${change} vs last month`)
                )
            );

            const recentIncidents = [
                { id: '2025-00123', type: '111 - Building Fire', status: 'Closed' },
                { id: '2025-00122', type: '322 - Vehicle Fire', status: 'Closed' },
                { id: '2025-00121', type: '554 - Person in Water', status: 'Open' },
                { id: '2025-00120', type: '611 - EMS Call', status: 'Closed' },
            ];

            return React.createElement('div', { style: { padding: '25px' } },
                React.createElement(PageHeader, { title: 'Dashboard' }),
                React.createElement('div', { 
                    style: { 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                        gap: '20px', 
                        marginBottom: '25px' 
                    } 
                },
                    React.createElement(KpiCard, { title: 'Incidents this Month', value: '123', icon: '🔥', change: '+5.2%' }),
                    React.createElement(KpiCard, { title: 'Avg. Response Time', value: '4:32', icon: '⏱️', change: '-0.8%' }),
                    React.createElement(KpiCard, { title: 'Inspections Due', value: '18', icon: '🏢', change: '+12.5%' }),
                    React.createElement(KpiCard, { title: 'Upcoming Inspections', value: '8', icon: '🗓️', change: '+10%' })
                ),
                React.createElement('h3', { style: { color: colors.dark, marginBottom: '15px' } }, 'Recent Incidents'),
                React.createElement('div', { 
                    style: { 
                        background: colors.white, 
                        borderRadius: '8px', 
                        padding: '20px', 
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)' 
                    } 
                },
                    recentIncidents.map((inc, index) => 
                        React.createElement('div', { 
                            key: inc.id, 
                            style: { 
                                display: 'grid', 
                                gridTemplateColumns: '1fr 2fr 1fr', 
                                alignItems: 'center', 
                                padding: '10px', 
                                borderBottom: index === recentIncidents.length - 1 ? 'none' : `1px solid ${colors.lightGray}` 
                            } 
                        },
                            React.createElement('div', { style: { fontWeight: '600' } }, inc.id),
                            React.createElement('div', { style: { color: colors.gray } }, inc.type),
                            React.createElement('div', null,
                                React.createElement('span', { 
                                    style: { 
                                        padding: '4px 8px', 
                                        borderRadius: '10px', 
                                        fontSize: '12px', 
                                        background: inc.status === 'Closed' ? colors.success : colors.warning, 
                                        color: colors.white 
                                    } 
                                }, inc.status)
                            )
                        )
                    )
                )
            );
        };

        // Incidents Content
        const IncidentsContent = () => {
            const [activeTab, setActiveTab] = useState('Current Incidents');
            const [showModal, setShowModal] = useState(false);
            const [showNewIncidentModal, setShowNewIncidentModal] = useState(false);
            const [selectedIncident, setSelectedIncident] = useState(null);
            const [searchTerm, setSearchTerm] = useState('');
            const tabs = ['Current Incidents', 'CAD Feed', 'All Incidents'];

            const currentIncidents = [
                { id: '2025-00123', type: '111 - Building Fire', address: '455 Main St', status: 'In Progress', units: 'E-1, L-1, C-1', time: '14:02', priority: 'High' },
                { id: '2025-00124', type: '322 - Vehicle Fire', address: 'Highway 101 MM 15', status: 'En Route', units: 'E-2', time: '14:15', priority: 'Medium' },
                { id: '2025-00125', type: '611 - EMS Call', address: '789 Oak Ave', status: 'On Scene', units: 'A-1', time: '14:20', priority: 'Low' }
            ];

            const allIncidents = [
                { id: '2025-00123', type: '111 - Building Fire', address: '455 Main St', date: '2025-07-11', status: 'Open', officer: 'Capt. Davis' },
                { id: '2025-00122', type: '322 - Vehicle Fire', address: 'Highway 101', date: '2025-07-11', status: 'Closed', officer: 'Lt. Miller' },
                { id: '2025-00121', type: '554 - Person in Water', address: 'City Marina', date: '2025-07-10', status: 'Closed', officer: 'Capt. Wilson' }
            ];

            const filteredIncidents = allIncidents.filter(incident => 
                incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                incident.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                incident.address.toLowerCase().includes(searchTerm.toLowerCase())
            );

            const renderTabContent = () => {
                if (activeTab === 'Current Incidents') {
                    return React.createElement('div', { 
                        style: { 
                            background: colors.white, 
                            padding: '20px', 
                            borderRadius: '8px', 
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)' 
                        } 
                    },
                        React.createElement('h4', { style: { marginBottom: '15px' } }, 'Active Incidents'),
                        currentIncidents.map(incident => 
                            React.createElement('div', { 
                                key: incident.id, 
                                style: { 
                                    padding: '15px', 
                                    border: `1px solid ${colors.lightGray}`, 
                                    borderRadius: '6px', 
                                    marginBottom: '10px' 
                                } 
                            },
                                React.createElement('div', { style: { fontWeight: 'bold' } }, `${incident.id} - ${incident.type}`),
                                React.createElement('div', { style: { color: colors.gray } }, incident.address),
                                React.createElement('div', { style: { fontSize: '12px', marginTop: '5px' } }, 
                                    `Status: ${incident.status} | Units: ${incident.units} | Time: ${incident.time}`
                                )
                            )
                        )
                    );
                } else if (activeTab === 'All Incidents') {
                    return React.createElement('div', { 
                        style: { 
                            background: colors.white, 
                            padding: '20px', 
                            borderRadius: '8px', 
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)' 
                        } 
                    },
                        React.createElement('div', { 
                            style: { 
                                marginBottom: '20px', 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center' 
                            } 
                        },
                            React.createElement('h4', null, 'All Incidents'),
                            React.createElement('input', { 
                                type: 'text', 
                                placeholder: 'Search incidents...', 
                                value: searchTerm,
                                onChange: (e) => setSearchTerm(e.target.value),
                                style: { 
                                    padding: '8px 12px', 
                                    border: `1px solid ${colors.lightGray}`, 
                                    borderRadius: '6px', 
                                    width: '250px',
                                    fontSize: '14px'
                                } 
                            })
                        ),
                        filteredIncidents.map(incident => 
                            React.createElement('div', { 
                                key: incident.id, 
                                style: { 
                                    padding: '15px', 
                                    border: `1px solid ${colors.lightGray}`, 
                                    borderRadius: '6px', 
                                    marginBottom: '10px' 
                                } 
                            },
                                React.createElement('div', { style: { fontWeight: 'bold' } }, `${incident.id} - ${incident.type}`),
                                React.createElement('div', { style: { color: colors.gray } }, incident.address),
                                React.createElement('div', { style: { fontSize: '12px', marginTop: '5px' } }, 
                                    `Date: ${incident.date} | Status: ${incident.status} | Officer: ${incident.officer}`
                                )
                            )
                        )
                    );
                }
                return React.createElement('div', { style: { padding: '20px', textAlign: 'center' } }, 'CAD Feed - Real-time incident feed from dispatch');
            };

            return React.createElement('div', { style: { padding: '25px' } },
                React.createElement(PageHeader, { 
                    title: 'Incident Management', 
                    buttonLabel: 'Create New Incident',
                    onButtonClick: () => setShowNewIncidentModal(true)
                }),
                React.createElement(SubNav, { tabs: tabs, activeTab: activeTab, setActiveTab: setActiveTab }),
                renderTabContent()
            );
        };

        // Placeholder Content
        const PlaceholderContent = ({ tabName }) => (
            React.createElement('div', { style: { padding: '25px', textAlign: 'center' } },
                React.createElement(PageHeader, { title: `${tabName.charAt(0).toUpperCase() + tabName.slice(1)} Module` }),
                React.createElement('div', { 
                    style: { 
                        background: colors.white, 
                        padding: '40px', 
                        borderRadius: '8px', 
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)', 
                        marginTop: '20px' 
                    } 
                },
                    React.createElement('div', { style: { fontSize: '48px', marginBottom: '20px' } },
                        { reports: '📄', settings: '⚙️', occupancies: '🏢', personnel: '👨‍🚒', equipment: '🚒' }[tabName]
                    ),
                    React.createElement('h3', { 
                        style: { color: colors.dark, marginBottom: '15px' } 
                    }, `${tabName.charAt(0).toUpperCase() + tabName.slice(1)} Management`),
                    React.createElement('p', { 
                        style: { color: colors.gray, maxWidth: '400px', margin: '0 auto' } 
                    }, `This module demonstrates ${tabName} management capabilities in LadderOps. Click through the other modules to see different features.`)
                )
            )
        );

        // Main App Component
        const App = () => {
            const [activeTab, setActiveTab] = useState('dashboard');

            const renderContent = () => {
                switch (activeTab) {
                    case 'dashboard': return React.createElement(DashboardContent);
                    case 'incidents': return React.createElement(IncidentsContent);
                    case 'occupancies': return React.createElement(PlaceholderContent, { tabName: 'occupancies' });
                    case 'personnel': return React.createElement(PlaceholderContent, { tabName: 'personnel' });
                    case 'equipment': return React.createElement(PlaceholderContent, { tabName: 'equipment' });
                    case 'reports': return React.createElement(PlaceholderContent, { tabName: 'reports' });
                    case 'settings': return React.createElement(PlaceholderContent, { tabName: 'settings' });
                    default: return React.createElement(DashboardContent);
                }
            };

            return React.createElement('div', { 
                style: { display: 'flex', height: '100vh', width: '100%', fontFamily: 'Inter, sans-serif' } 
            },
                React.createElement('div', { 
                    style: { background: colors.light, display: 'flex', height: '100%', width: '100%' } 
                },
                    React.createElement(Sidebar, { activeTab: activeTab, setActiveTab: setActiveTab }),
                    React.createElement('div', { 
                        style: { flex: 1, overflowY: 'auto', position: 'relative' } 
                    }, renderContent())
                )
            );
        };

        // Render the application
        ReactDOM.render(React.createElement(App), document.getElementById('root'));
    </script>
</body>
</html>
