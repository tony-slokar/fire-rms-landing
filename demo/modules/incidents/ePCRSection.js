const ePCRSection = () => {
    const [activeSubNav, setActiveSubNav] = React.useState('Patient Info');
    const subNavTabs = ['Patient Info', 'Vitals', 'Assessment', 'Interventions', 'Narrative'];

    const PatientInfo = () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <FormField label="Patient Name" value="John Smith" />
            <FormField label="Date of Birth" type="date" value="1957-05-20" />
            <SelectField label="Gender">
                <option selected>Male</option>
                <option>Female</option>
                <option>Other</option>
            </SelectField>
            <FormField label="Address" value="455 Main St, Anytown, MA" />
            <TextArea label="Chief Complaint" value="Chest pain, shortness of breath." rows={3} />
        </div>
    );

    const Vitals = () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
            <FormField label="Timestamp" type="time" value="14:10" />
            <FormField label="Blood Pressure" value="160/95" />
            <FormField label="Heart Rate" value="88" />
            <FormField label="SpO2 (%)" value="94" />
            <FormField label="Respiratory Rate" value="20" />
            <FormField label="GCS" value="15" />
        </div>
    );
    
    const Assessment = () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <SelectField label="Primary Impression">
                <option selected>STEMI</option>
                <option>Trauma</option>
                <option>Allergic Reaction</option>
            </SelectField>
            <SelectField label="Secondary Impression">
                <option selected>N/A</option>
                <option>Anxiety</option>
            </SelectField>
            <TextArea label="Physical Assessment Notes" value="Patient is conscious, alert, and oriented. Skin is pale and diaphoretic. Lung sounds clear bilaterally." rows={4} />
        </div>
    );

    const Interventions = () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <CheckboxItem label="12-Lead EKG Performed" checked />
            <CheckboxItem label="IV Established" checked />
            <CheckboxItem label="Oxygen Administered" checked />
            <CheckboxItem label="Aspirin Administered" checked />
            <CheckboxItem label="Nitroglycerin Administered" checked />
        </div>
    );

    const Narrative = () => (
        <TextArea label="ePCR Narrative" placeholder="Provide a detailed patient care narrative..." rows={10} value={"Patient found conscious and alert, complaining of crushing chest pain... transported to Regional Medical Center."} />
    );

    const renderContent = () => {
        switch (activeSubNav) {
            case 'Patient Info': return <PatientInfo />;
            case 'Vitals': return <Vitals />;
            case 'Assessment': return <Assessment />;
            case 'Interventions': return <Interventions />;
            case 'Narrative': return <Narrative />;
            default: return <PatientInfo />;
        }
    };

    return (
        <div>
            <h3 style={{ borderBottom: `2px solid var(--light-gray)`, paddingBottom: '10px', marginBottom: '20px', color: 'var(--dark)' }}>ePCR Module (NEMSIS Compliant)</h3>
            <SubNav tabs={subNavTabs} activeTab={activeSubNav} setActiveTab={setActiveSubNav} />
            <div style={{ marginTop: '20px' }}>
                {renderContent()}
            </div>
        </div>
    );
};