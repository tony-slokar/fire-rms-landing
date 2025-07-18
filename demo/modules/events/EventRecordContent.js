const EventRecordContent = ({ isNightMode, onNightModeToggle }) => {
    const [requiredModules, setRequiredModules] = React.useState(['Units & Personnel', 'Fire Module', 'Casualty Information', 'Actions Taken', 'Narrative & Closure']);
    const [incidentTypeName, setIncidentTypeName] = React.useState('Building Fire');
    const [completedModules, setCompletedModules] = React.useState(['The Call', 'Civic Location', 'Scene Validation']);
    const [activeWorkflowStep, setActiveWorkflowStep] = React.useState('The Call');

    const scrollContainerRef = React.useRef(null);
    const allTimelineModules = ['The Call', 'Civic Location', 'Scene Validation', ...requiredModules];

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollContainer = scrollContainerRef.current;
            if (!scrollContainer) return;

            // Find the step whose corresponding element is closest to the top of the scroll container
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
    }, [allTimelineModules]); // Dependency array ensures this runs only when modules change

    const metadata = (
        <div style={{display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap', marginTop: '5px'}}>
            <span style={{background: 'var(--danger)', color: 'white', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold'}}>
                {incidentTypeName}
            </span>
            <span style={{color: 'var(--gray)', fontSize: '12px'}}>
               Modules: {requiredModules.join(', ')}
            </span>
        </div>
    );
    
    const moduleMap = {
        'Units & Personnel': { icon: '🚒', component: <UnitsAndPersonnelBlock /> },
        'Fire Module': { icon: '🔥', component: <FireSection /> },
        'Casualty Information': { icon: '👨‍⚕️', component: <CasualtyBlock /> },
        'Actions Taken': { icon: '🛠️', component: <ActionsTacticsSection /> },
        'Narrative & Closure': { icon: '✍️', component: <NarrativeSection /> }
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '0 25px' }}>
                 <PageHeader title="Event #2025-00123" isNightMode={isNightMode} onNightModeToggle={onNightModeToggle}>{metadata}</PageHeader>
            </div>
            
            <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--light)', padding: '15px 25px', borderBottom: '1px solid var(--light-gray)', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                <WorkflowTracker steps={allTimelineModules} completedSteps={completedModules} activeStep={activeWorkflowStep} />
            </div>
           
            <div ref={scrollContainerRef} style={{ overflowY: 'auto', flex: 1, padding: '25px', maxWidth: '900px', margin: '0 auto', width: '100%', scrollBehavior: 'smooth' }}>
                <div id="The-Call"><TimelineBlock title="The Call" icon="📞" timestamp="14:02 HRS"><CoreSection /></TimelineBlock></div>
                <div id="Civic-Location"><TimelineBlock title="Civic Location" icon="📍"><CivicLocationSection /></TimelineBlock></div>
                <div id="Scene-Validation"><TimelineBlock title="Scene Validation" icon="✅"><FormField label="Validated Incident Type" value="111 - Building Fire" readOnly={true}/></TimelineBlock></div>

                {requiredModules.map(moduleName => (
                    <div key={moduleName} id={moduleName.replace(/ /g, '-')}>
                         <TimelineBlock title={moduleName} icon={moduleMap[moduleName]?.icon || '📄'}>
                            {moduleMap[moduleName]?.component}
                        </TimelineBlock>
                    </div>
                ))}
                 
                {requiredModules.includes('Narrative & Closure') && (
                    <div style={{paddingLeft: '60px', marginTop: '-20px'}}>
                        <button style={{ background: 'var(--primary)', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: 'white', fontWeight: '600' }}>
                            Close Event Record
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};