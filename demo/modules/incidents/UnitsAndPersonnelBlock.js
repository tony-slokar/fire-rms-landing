const UnitsAndPersonnelBlock = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const unitResponses = [
        { 
            unit: 'E-1', 
            personnel: ['Cpt. Davis', 'FF Miller', 'FF Johnson'],
            times: { dispatched: '14:02:10', enroute: '14:02:50', arrived: '14:06:32', cleared: '15:30:00' }
        },
        { 
            unit: 'L-1', 
            personnel: ['Lt. Chen', 'FF Wilson', 'FF Garcia'],
            times: { dispatched: '14:02:10', enroute: '14:03:15', arrived: '14:07:01', cleared: '15:28:00' }
        },
        { 
            unit: 'A-1', 
            personnel: ['PM Rodriguez', 'EMT Smith'],
            times: { dispatched: '14:05:00', enroute: '14:05:45', arrived: '14:10:20', cleared: '15:05:00' }
        },
    ];

    const headerCellStyle = {
        padding: '10px 0',
        textAlign: 'left',
        color: 'var(--gray)',
        fontSize: '12px',
        textTransform: 'uppercase',
        borderBottom: '1px solid var(--light-gray)'
    };

    const AddUnitModal = () => (
        <Modal onClose={() => setIsModalOpen(false)}>
            <h3 style={{color: 'var(--dark)', marginTop: 0}}>Add Responding Unit</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <FormField label="Unit ID" required={true}/>
                <FormField label="Personnel Assigned" placeholder="e.g., Cpt. Smith, FF Jones"/>
                <FormField label="Time Dispatched" type="datetime-local" />
                <FormField label="Time En Route" type="datetime-local" />
                <FormField label="Time Arrived" type="datetime-local" />
                <FormField label="Time Cleared" type="datetime-local" />
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '30px', borderTop: '1px solid var(--light-gray)', paddingTop: '20px' }}>
                 <button onClick={() => setIsModalOpen(false)} style={{ background: 'var(--light-gray)', color: 'var(--dark)', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                 <button onClick={() => setIsModalOpen(false)} style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Add Unit</button>
            </div>
        </Modal>
    );
    
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '15px'}}>
                 <button onClick={() => setIsModalOpen(true)} style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                    + Add Unit
                 </button>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                {unitResponses.map(res => (
                    <div key={res.unit} style={{background: 'var(--light)', border: '1px solid var(--light-gray)', borderRadius: '8px', padding: '15px'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                            <h4 style={{color: 'var(--dark)', margin: 0}}>{res.unit}</h4>
                            <span style={{background: 'var(--success)', color: 'white', fontSize: '10px', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold'}}>ON SCENE</span>
                        </div>
                        <p style={{fontSize: '14px', color: 'var(--gray)', margin: '0 0 15px 0'}}>
                            {res.personnel.join(', ')}
                        </p>
                        <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '12px', color: 'var(--dark)'}}>
                            <thead>
                                <tr>
                                    <th style={headerCellStyle}>Dispatched</th>
                                    <th style={headerCellStyle}>En Route</th>
                                    <th style={{...headerCellStyle, textAlign: 'center'}}>Arrived</th>
                                    <th style={{...headerCellStyle, textAlign: 'right'}}>Cleared</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{padding: '8px 0', textAlign: 'left'}}>{res.times.dispatched}</td>
                                    <td style={{padding: '8px 0', textAlign: 'left'}}>{res.times.enroute}</td>
                                    <td style={{padding: '8px 0', textAlign: 'center', fontWeight: 'bold'}}>{res.times.arrived}</td>
                                    <td style={{padding: '8px 0', textAlign: 'right'}}>{res.times.cleared}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
            {isModalOpen && <AddUnitModal />}
        </div>
    );
};