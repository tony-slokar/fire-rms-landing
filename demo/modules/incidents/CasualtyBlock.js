const CasualtyBlock = () => {
    const [activeTab, setActiveTab] = React.useState('Civilian');
    const tabs = ['Civilian', 'Firefighter'];

    const CivilianCasualtyForm = () => (
        <div>
            {/* The original RescueCasualtySection can be repurposed for the civilian form */}
            <RescueCasualtySection /> 
        </div>
    );

    const FirefighterCasualtyForm = () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <SelectField label="Firefighter">
                <option>Cpt. John Davis</option>
                <option>FF Sarah Miller</option>
            </SelectField>
            <SelectField label="Injury Type">
                <option>Strain / Sprain</option>
                <option>Burn</option>
                <option>Smoke Inhalation</option>
                <option>Exhaustion</option>
            </SelectField>
            <SelectField label="PPE Worn">
                <option>Full Structural PPE</option>
                <option>Partial PPE</option>
            </SelectField>
            <TextArea label="Injury Narrative" placeholder="Describe how the injury occurred..." rows={4} />
        </div>
    );

    return (
        <div>
            <SubNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            <div style={{marginTop: '20px'}}>
                {activeTab === 'Civilian' ? <CivilianCasualtyForm /> : <FirefighterCasualtyForm />}
            </div>
        </div>
    );
};