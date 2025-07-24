const EventRecordContent = ({ isNightMode, onNightModeToggle }) => {
    const [currentView, setCurrentView] = React.useState('list'); // 'list' or 'detail'
    const [selectedEvent, setSelectedEvent] = React.useState(null);
    
    // Original detail view state
    const [requiredModules, setRequiredModules] = React.useState(['Units & Personnel', 'Fire Module', 'Casualty Information', 'Actions Taken', 'Narrative & Closure']);
    const [incidentTypeName, setIncidentTypeName] = React.useState('Building Fire');
    const [completedModules, setCompletedModules] = React.useState(['The Call', 'Civic Location', 'Scene Validation']);
    const [activeWorkflowStep, setActiveWorkflowStep] = React.useState('The Call');

    const scrollContainerRef = React.useRef(null);
    const allTimelineModules = ['The Call', 'Civic Location', 'Scene Validation', ...requiredModules];

    React.useEffect(() => {
        if (currentView !== 'detail') return;
        
        const handleScroll = () => {
            const scrollContainer = scrollContainerRef.current;
            if (!scrollContainer) return;

            let closestStep = allTimelineModules[0];
            let smallestDistance = Infinity;

            for (const moduleName of allTimelineModules) {
                const element = document.getElementById(moduleName.replace(/ /g, '-'));
                if (element) {
                    const distance = Math.abs(element.getBoundingClientRect().top - scrollContainer.getBoundingClientRect().top);
                    if (distance < smallestDistance) {
                        smallestDistance = distance;
                        closestStep = moduleName;
                    }
                }
            }
            setActiveWorkflowStep(closestStep);
        };

        const scrollableElement = scrollContainerRef.current;
        if (scrollableElement) {
            scrollableElement.addEventListener('scroll', handleScroll, { passive: true });
        }
        return () => {
            if (scrollableElement) {
                scrollableElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, [allTimelineModules, currentView]);

    // Add effect to initialize feather icons after render
    React.useEffect(() => {
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }, [currentView, selectedEvent]);

    const handleEventSelect = (event) => {
        setSelectedEvent(event);
        // Update incident type based on selected event
        setIncidentTypeName(event.type);
        setCurrentView('detail');
    };

    const handleBackToList = () => {
        setCurrentView('list');
        setSelectedEvent(null);
    };

    // Show list view
    if (currentView === 'list') {
        return React.createElement(EventsListContent, {
            isNightMode: isNightMode,
            onNightModeToggle: onNightModeToggle,
            onEventSelect: handleEventSelect
        });
    }

    // Show detail view (original timeline-based workflow)
    const metadata = React.createElement('div', {
        style: {
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            flexWrap: 'wrap',
            marginTop: '5px'
        }
    }, [
        React.createElement('button', {
            key: 'back-btn',
            onClick: handleBackToList,
            style: {
                background: 'var(--secondary)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
            }
        }, [
            React.createElement('i', {
                key: 'back-icon',
                'data-feather': 'arrow-left',
                style: { width: '16px', height: '16px' }
            }),
            'Back to Events'
        ]),
        React.createElement('span', {
            key: 'incident-type',
            style: {
                background: 'var(--danger)',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '15px',
                fontSize: '12px',
                fontWeight: 'bold'
            }
        }, incidentTypeName),
        React.createElement('span', {
            key: 'modules',
            style: {
                color: 'var(--gray)',
                fontSize: '12px'
            }
        }, `Modules: ${requiredModules.join(', ')}`)
    ]);
    
    const moduleMap = {
        'Units & Personnel': { icon: 'truck', component: React.createElement(UnitsAndPersonnelBlock) },
        'Fire Module': { icon: 'alert-circle', component: React.createElement(FireSection) }, // Changed to alert-circle for better visibility
        'Casualty Information': { icon: 'heart', component: React.createElement(CasualtyBlock) },
        'Actions Taken': { icon: 'tool', component: React.createElement(ActionsTacticsSection) },
        'Narrative & Closure': { icon: 'edit-3', component: React.createElement(NarrativeSection) }
    };

    const eventTitle = selectedEvent ? `Event #${selectedEvent.id}` : 'Event #2025-00123';

    return React.createElement('div', {
        style: { height: '100%', display: 'flex', flexDirection: 'column' }
    }, [
        React.createElement('div', {
            key: 'header',
            style: { padding: '0 25px' }
        }, React.createElement(PageHeader, {
            title: eventTitle,
            isNightMode: isNightMode,
            onNightModeToggle: onNightModeToggle,
            children: metadata
        })),
        
        React.createElement('div', {
            key: 'workflow',
            style: {
                position: 'sticky',
                top: 0,
                zIndex: 100,
                background: 'var(--light)',
                padding: '15px 25px',
                borderBottom: '1px solid var(--light-gray)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }
        }, React.createElement(WorkflowTracker, {
            steps: allTimelineModules,
            completedSteps: completedModules,
            activeStep: activeWorkflowStep
        })),
       
        React.createElement('div', {
            key: 'content',
            ref: scrollContainerRef,
            style: {
                overflowY: 'auto',
                flex: 1,
                padding: '25px',
                maxWidth: '900px',
                margin: '0 auto',
                width: '100%',
                scrollBehavior: 'smooth'
            }
        }, [
            React.createElement('div', {
                key: 'the-call',
                id: 'The-Call'
            }, React.createElement(TimelineBlock, {
                title: 'The Call',
                icon: 'phone',
                timestamp: '14:02 HRS',
                children: React.createElement(CoreSection)
            })),
            
            React.createElement('div', {
                key: 'civic-location',
                id: 'Civic-Location'
            }, React.createElement(TimelineBlock, {
                title: 'Civic Location',
                icon: 'map-pin',
                children: React.createElement(CivicLocationSection)
            })),
            
            React.createElement('div', {
                key: 'scene-validation',
                id: 'Scene-Validation'
            }, React.createElement(TimelineBlock, {
                title: 'Scene Validation',
                icon: 'check-circle',
                children: React.createElement(FormField, {
                    label: 'Validated Incident Type',
                    value: '111 - Building Fire',
                    readOnly: true
                })
            })),

            ...requiredModules.map(moduleName => 
                React.createElement('div', {
                    key: moduleName,
                    id: moduleName.replace(/ /g, '-')
                }, React.createElement(TimelineBlock, {
                    title: moduleName,
                    icon: moduleMap[moduleName]?.icon || 'file-text',
                    children: moduleMap[moduleName]?.component
                }))
            ),
             
            requiredModules.includes('Narrative & Closure') && React.createElement('div', {
                key: 'close-btn',
                style: { paddingLeft: '60px', marginTop: '-20px' }
            }, React.createElement('button', {
                style: {
                    background: 'var(--primary)',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: 'white',
                    fontWeight: '600'
                }
            }, 'Close Event Record'))
        ])
    ]);
};