const EventRecordContent = () => {
    // State to track what modules are needed based on user selection
    const [requiredModules, setRequiredModules] = React.useState([]);

    const handleIncidentTypeValidation = (type) => {
        // This is where the magic happens. Based on the type, we add modules.
        if (type === '111') { // Structure Fire
            setRequiredModules(['Fire', 'Casualty', 'Actions']);
        } else if (type === '322') { // Vehicle Fire
            setRequiredModules(['Fire', 'Actions']);
        } else if (type === '611') { // EMS Call
            setRequiredModules(['Medical', 'Casualty']);
        } else {
            setRequiredModules([]);
        }
    };

    return (
        <div style={{ padding: '25px', maxWidth: '900px', margin: '0 auto' }}>
            <PageHeader title="Event #2025-00123" />

            {/* --- The Timeline Starts Here --- */}

            <TimelineBlock title="The Call & Location" icon="📞" timestamp="14:02 HRS">
                <h4 style={{ borderBottom: `1px solid ${colors.lightGray}`, paddingBottom: '10px', marginBottom: '15px' }}>Initial Dispatch Details</h4>
                <CoreSection />
                <div style={{marginTop: '25px'}}>
                  <h4 style={{ borderBottom: `1px solid ${colors.lightGray}`, paddingBottom: '10px', marginBottom: '15px' }}>Civic Location</h4>
                  <CivicLocationSection />
                </div>
            </TimelineBlock>

            <TimelineBlock title="Scene Validation" icon="✅" isAwaitingInput={true}>
                <p style={{marginBottom: '15px', color: colors.gray}}>Select the validated incident type to unlock required NERIS modules.</p>
                <SelectField label="Validated Incident Type" onChange={(e) => handleIncidentTypeValidation(e.target.value)}>
                    <option value="">-- Select Type --</option>
                    <option value="111">111 - Building Fire</option>
                    <option value="322">322 - Vehicle Fire</option>
                    <option value="611">611 - EMS Call</option>
                    <option value="554">554 - Person in Water</option>
                </SelectField>
            </TimelineBlock>

            {/* --- Dynamically Rendered Modules --- */}
            {requiredModules.includes('Fire') && (
                <TimelineBlock title="Fire Module" icon="🔥">
                    <FireSection />
                </TimelineBlock>
            )}
            
            {requiredModules.includes('Medical') && (
                <TimelineBlock title="Medical Module" icon="⚕️">
                    {/* You would create a MedicalSection component here */}
                    <p>Medical-specific fields would appear here.</p>
                </TimelineBlock>
            )}

            {requiredModules.includes('Casualty') && (
                <TimelineBlock title="Casualty & Rescue" icon="👨‍⚕️">
                    <RescueCasualtySection />
                </TimelineBlock>
            )}

            {requiredModules.includes('Actions') && (
                <TimelineBlock title="Actions Taken" icon="🛠️">
                    <ActionsTacticsSection />
                </TimelineBlock>
            )}

            <TimelineBlock title="Narrative & Closure" icon="✍️">
                <NarrativeSection />
                <button style={{ background: colors.primary, border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: colors.white, fontWeight: '600', marginTop: '20px' }}>
                    Close Event Record
                </button>
            </TimelineBlock>
        </div>
    );
};
