const EventRecordContent = ({ isNightMode, onNightModeToggle }) => {
    const [requiredModules, setRequiredModules] = React.useState([]);

    const handleIncidentTypeValidation = (type) => {
        if (type === '111') {
            setRequiredModules(['Units', 'Fire', 'Casualty', 'Actions', 'Narrative']);
        } else if (type === '611') {
            setRequiredModules(['Units', 'Medical', 'Casualty', 'Actions', 'Narrative']);
        } else {
            setRequiredModules(['Units', 'Actions', 'Narrative']);
        }
    };

    return (
        <div style={{ padding: '25px', maxWidth: '900px', margin: '0 auto' }}>
            <PageHeader
                title="Event #2025-00123"
                isNightMode={isNightMode}
                onNightModeToggle={onNightModeToggle}
            />

            <TimelineBlock title="The Call" icon="📞" timestamp="14:02 HRS">
                <CoreSection />
            </TimelineBlock>

            <TimelineBlock title="Civic Location" icon="📍">
                <CivicLocationSection />
            </TimelineBlock>

            <TimelineBlock title="Scene Validation" icon="✅" isAwaitingInput={true}>
                <p style={{marginBottom: '15px', color: 'var(--gray)'}}>Select the validated incident type to unlock required NERIS modules.</p>
                <SelectField label="Validated Incident Type" onChange={(e) => handleIncidentTypeValidation(e.target.value)}>
                    <option value="">-- Select Type --</option>
                    <option value="111">111 - Building Fire</option>
                    <option value="611">611 - EMS Call</option>
                    <option value="554">554 - Person in Water</option>
                </SelectField>
            </TimelineBlock>

            {/* --- Dynamically Rendered Modules --- */}
            {requiredModules.includes('Units') && (
                <TimelineBlock title="Units & Personnel" icon="🚒">
                    <UnitsAndPersonnelBlock />
                </TimelineBlock>
            )}

            {requiredModules.includes('Fire') && (
                <TimelineBlock title="Fire Module" icon="🔥">
                    <FireSection />
                </TimelineBlock>
            )}
            
            {requiredModules.includes('Medical') && (
                <TimelineBlock title="Medical Module" icon="⚕️">
                    <p style={{color: 'var(--dark)'}}>A dedicated, rich form for EMS data entry would be here.</p>
                </TimelineBlock>
            )}

            {requiredModules.includes('Casualty') && (
                <TimelineBlock title="Casualty Information" icon="👨‍⚕️">
                    <CasualtyBlock />
                </TimelineBlock>
            )}

            {requiredModules.includes('Actions') && (
                <TimelineBlock title="Actions Taken" icon="🛠️">
                    <ActionsTacticsSection />
                </TimelineBlock>
            )}

            {requiredModules.includes('Narrative') && (
                <TimelineBlock title="Narrative & Closure" icon="✍️">
                    <NarrativeSection />
                    <button style={{ background: 'var(--primary)', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: 'white', fontWeight: '600', marginTop: '20px' }}>
                        Close Event Record
                    </button>
                </TimelineBlock>
            )}
        </div>
    );
};