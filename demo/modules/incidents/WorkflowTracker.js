const WorkflowTracker = ({ steps, completedSteps, activeStep }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', width: '100%' }}>
            {steps.map((step) => {
                const isCompleted = completedSteps.includes(step);
                const isActive = step === activeStep;

                const stepStyle = {
                    display: 'flex',
                    alignItems: 'center',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    background: isActive ? 'var(--primary)' : (isCompleted ? 'var(--success)' : 'var(--light-gray)'),
                    color: isActive || isCompleted ? 'white' : 'var(--gray)',
                    fontWeight: '600',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    border: `1px solid ${isActive ? 'var(--primary)' : (isCompleted ? 'var(--success)' : 'var(--light-gray)')}`,
                    transition: 'all 0.2s ease-in-out'
                };

                return (
                    <div key={step} style={stepStyle}>
                        {isCompleted && !isActive && <span style={{ marginRight: '6px' }}>✓</span>}
                        {isActive && <span style={{ marginRight: '6px', animation: 'pulse 1.5s infinite' }}>●</span>}
                        {step}
                    </div>
                );
            })}
        </div>
    );
};