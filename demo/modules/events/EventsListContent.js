const EventsListContent = ({ isNightMode, onNightModeToggle, onEventSelect }) => {
    const [viewMode, setViewMode] = React.useState('grid'); // 'grid' or 'list'
    const [filterStatus, setFilterStatus] = React.useState('all'); // 'all', 'active', 'closed'
    const [filterPriority, setFilterPriority] = React.useState('all'); // 'all', 'high', 'medium', 'low'
    const [searchTerm, setSearchTerm] = React.useState('');
    const [sortBy, setSortBy] = React.useState('newest'); // 'newest', 'oldest', 'priority'

    // Initialize feather icons
    React.useEffect(() => {
        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [viewMode, filterStatus, filterPriority, searchTerm, sortBy]);

    // Also initialize when component mounts
    React.useEffect(() => {
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }, []);

    // Filter and sort events
    const getFilteredEvents = () => {
        let filtered = [...mockEventsData];

        // Status filter
        if (filterStatus !== 'all') {
            if (filterStatus === 'active') {
                filtered = filtered.filter(event => event.status === 'In Progress' || event.status === 'Dispatched');
            } else if (filterStatus === 'closed') {
                filtered = filtered.filter(event => event.status === 'Closed');
            }
        }

        // Priority filter
        if (filterPriority !== 'all') {
            filtered = filtered.filter(event => 
                event.priority.toLowerCase() === filterPriority.toLowerCase()
            );
        }

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(event => 
                event.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.dispatchNumber.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.dispatchTime) - new Date(a.dispatchTime);
                case 'oldest':
                    return new Date(a.dispatchTime) - new Date(b.dispatchTime);
                case 'priority':
                    const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                default:
                    return new Date(b.dispatchTime) - new Date(a.dispatchTime);
            }
        });

        return filtered;
    };

    const formatTime = (timeString) => {
        if (!timeString) return '--:--';
        return new Date(timeString).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
    };

    const formatDate = (timeString) => {
        const date = new Date(timeString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Progress': return 'var(--warning)';
            case 'Dispatched': return 'var(--info)';
            case 'Closed': return 'var(--success)';
            default: return 'var(--gray)';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'var(--danger)';
            case 'Medium': return 'var(--warning)';
            case 'Low': return 'var(--info)';
            default: return 'var(--gray)';
        }
    };

    const getTypeIcon = (typeCode) => {
        switch (typeCode) {
            case '111': case '113': case '142': return 'alert-circle'; // Fire incidents - solid, bold icon
            case '311': case '322': return 'truck';
            case '611': case '321': return 'heart';
            case '554': return 'droplet';
            case '735': return 'bell';
            case '444': return 'zap';
            case '412': return 'alert-triangle';
            case '671': return 'shield-alert';
            default: return 'file-text';
        }
    };

    const getTypeIconBackground = (typeCode) => {
        switch (typeCode) {
            case '111': case '113': case '142': return 'var(--danger)'; // Use red background for fire to contrast with white icon
            case '311': case '322': return 'var(--warning)';
            case '611': case '321': return 'var(--info)';
            case '554': return 'var(--info)';
            case '735': return 'var(--secondary)';
            case '444': return 'var(--warning)';
            case '412': return 'var(--danger)';
            case '671': return 'var(--danger)';
            default: return 'var(--primary)';
        }
    };

    const EventCard = ({ event }) => {
        React.useEffect(() => {
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        });

        return (
            <div 
                onClick={() => onEventSelect(event)}
                style={{ 
                    background: 'var(--light)', 
                    border: '1px solid var(--light-gray)', 
                    borderRadius: '12px', 
                    padding: '16px', 
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                    e.currentTarget.style.borderColor = 'var(--light-gray)';
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ 
                            width: '28px', 
                            height: '28px', 
                            borderRadius: '50%', 
                            background: getTypeIconBackground(event.typeCode), 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <i data-feather={getTypeIcon(event.typeCode)} style={{ width: '14px', height: '14px' }}></i>
                        </div>
                        <div>
                            <div style={{ fontWeight: '700', color: 'var(--dark)', fontSize: '16px' }}>{event.id}</div>
                            <div style={{ fontSize: '12px', color: 'var(--gray)' }}>{formatDate(event.dispatchTime)} • {formatTime(event.dispatchTime)}</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <span style={{
                            padding: '4px 8px',
                            borderRadius: '8px',
                            fontSize: '10px',
                            fontWeight: '700',
                            background: getPriorityColor(event.priority),
                            color: 'white',
                            textTransform: 'uppercase'
                        }}>
                            {event.priority}
                        </span>
                        <span style={{
                            padding: '4px 8px',
                            borderRadius: '8px',
                            fontSize: '10px',
                            fontWeight: '700',
                            background: getStatusColor(event.status),
                            color: 'white',
                            textTransform: 'uppercase'
                        }}>
                            {event.status}
                        </span>
                    </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontWeight: '600', color: 'var(--dark)', marginBottom: '4px' }}>{event.type}</div>
                    <div style={{ color: 'var(--gray)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <i data-feather="map-pin" style={{ width: '12px', height: '12px' }}></i>
                        {event.address}, {event.city}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
                        <div style={{ color: 'var(--gray)' }}>
                            <strong>Units:</strong> {event.unitsAssigned.length}
                        </div>
                        {event.casualties > 0 && (
                            <div style={{ color: 'var(--danger)' }}>
                                <strong>Casualties:</strong> {event.casualties}
                            </div>
                        )}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--gray)' }}>
                        {event.status === 'In Progress' ? 'Active' : formatTime(event.clearedTime)}
                    </div>
                </div>
            </div>
        );
    };

    const EventRow = ({ event }) => {
        React.useEffect(() => {
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        });

        return (
            <tr 
                onClick={() => onEventSelect(event)}
                style={{ cursor: 'pointer', transition: 'background 0.2s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 69, 0, 0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
                <td style={{ padding: '12px', borderBottom: '1px solid var(--light-gray)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ 
                            width: '24px', 
                            height: '24px', 
                            borderRadius: '50%', 
                            background: getTypeIconBackground(event.typeCode), 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <i data-feather={getTypeIcon(event.typeCode)} style={{ width: '12px', height: '12px' }}></i>
                        </div>
                        <div>
                            <div style={{ fontWeight: '700', color: 'var(--dark)' }}>{event.id}</div>
                            <div style={{ fontSize: '11px', color: 'var(--gray)' }}>{event.dispatchNumber}</div>
                        </div>
                    </div>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid var(--light-gray)' }}>
                    <div style={{ fontWeight: '600', color: 'var(--dark)', marginBottom: '2px' }}>{event.type}</div>
                    <div style={{ fontSize: '12px', color: 'var(--gray)' }}>{event.address}</div>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid var(--light-gray)', textAlign: 'center' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--dark)' }}>{formatTime(event.dispatchTime)}</div>
                    <div style={{ fontSize: '11px', color: 'var(--gray)' }}>{formatDate(event.dispatchTime)}</div>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid var(--light-gray)', textAlign: 'center' }}>
                    <span style={{
                        padding: '4px 8px',
                        borderRadius: '8px',
                        fontSize: '10px',
                        fontWeight: '700',
                        background: getStatusColor(event.status),
                        color: 'white',
                        textTransform: 'uppercase'
                    }}>
                        {event.status}
                    </span>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid var(--light-gray)', textAlign: 'center' }}>
                    <span style={{
                        padding: '4px 8px',
                        borderRadius: '8px',
                        fontSize: '10px',
                        fontWeight: '700',
                        background: getPriorityColor(event.priority),
                        color: 'white',
                        textTransform: 'uppercase'
                    }}>
                        {event.priority}
                    </span>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid var(--light-gray)', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: 'var(--dark)' }}>{event.unitsAssigned.join(', ')}</div>
                </td>
            </tr>
        );
    };

    const filteredEvents = getFilteredEvents();

    return (
        <div style={{ padding: '25px' }}>
            <PageHeader
                title="Events"
                isNightMode={isNightMode}
                onNightModeToggle={onNightModeToggle}
            >
                <div style={{ fontSize: '14px', color: 'var(--gray)', marginTop: '5px' }}>
                    {filteredEvents.length} events • {filteredEvents.filter(e => e.status === 'In Progress').length} active
                </div>
            </PageHeader>

            {/* Controls */}
            <div style={{ background: 'var(--light)', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid var(--light-gray)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                    <div>
                        <input 
                            type="text"
                            placeholder="Search events, addresses, types..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ 
                                width: '100%', 
                                padding: '10px 12px', 
                                border: '1px solid var(--light-gray)', 
                                borderRadius: '8px', 
                                fontSize: '14px',
                                background: 'white'
                            }}
                        />
                    </div>
                    <SelectField label="" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="active">Active Events</option>
                        <option value="closed">Closed Events</option>
                    </SelectField>
                    <SelectField label="" value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                        <option value="all">All Priorities</option>
                        <option value="high">High Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low">Low Priority</option>
                    </SelectField>
                    <SelectField label="" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="priority">By Priority</option>
                    </SelectField>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                            onClick={() => setViewMode('grid')}
                            style={{
                                padding: '8px 12px',
                                border: '1px solid var(--light-gray)',
                                borderRadius: '6px',
                                background: viewMode === 'grid' ? 'var(--primary)' : 'white',
                                color: viewMode === 'grid' ? 'white' : 'var(--dark)',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                        >
                            <i data-feather="grid" style={{ width: '14px', height: '14px' }}></i> Cards
                        </button>
                        <button 
                            onClick={() => setViewMode('list')}
                            style={{
                                padding: '8px 12px',
                                border: '1px solid var(--light-gray)',
                                borderRadius: '6px',
                                background: viewMode === 'list' ? 'var(--primary)' : 'white',
                                color: viewMode === 'list' ? 'white' : 'var(--dark)',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                        >
                            <i data-feather="list" style={{ width: '14px', height: '14px' }}></i> List
                        </button>
                    </div>
                    <button 
                        style={{
                            padding: '10px 16px',
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                        onClick={() => alert('Create New Event feature would be implemented here')}
                    >
                        <i data-feather="plus" style={{ width: '16px', height: '16px' }}></i> New Event
                    </button>
                </div>
            </div>

            {/* Events Display */}
            {viewMode === 'grid' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '16px' }}>
                    {filteredEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            ) : (
                <div style={{ background: 'var(--light)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--light-gray)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--light-gray)' }}>
                                <th style={{ padding: '12px', textAlign: 'left', color: 'var(--dark)', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Event</th>
                                <th style={{ padding: '12px', textAlign: 'left', color: 'var(--dark)', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Type & Location</th>
                                <th style={{ padding: '12px', textAlign: 'center', color: 'var(--dark)', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Time</th>
                                <th style={{ padding: '12px', textAlign: 'center', color: 'var(--dark)', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Status</th>
                                <th style={{ padding: '12px', textAlign: 'center', color: 'var(--dark)', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Priority</th>
                                <th style={{ padding: '12px', textAlign: 'center', color: 'var(--dark)', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase' }}>Units</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEvents.map(event => (
                                <EventRow key={event.id} event={event} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {filteredEvents.length === 0 && (
                <div style={{ 
                    textAlign: 'center', 
                    padding: '60px 20px', 
                    background: 'var(--light)', 
                    borderRadius: '12px', 
                    border: '1px solid var(--light-gray)' 
                }}>
                    <div style={{ marginBottom: '16px' }}>
                        <i data-feather="search" style={{ width: '48px', height: '48px', color: 'var(--gray)' }}></i>
                    </div>
                    <h3 style={{ color: 'var(--dark)', marginBottom: '8px' }}>No Events Found</h3>
                    <p style={{ color: 'var(--gray)', fontSize: '16px' }}>
                        Try adjusting your search criteria or filters
                    </p>
                </div>
            )}
        </div>
    );
};