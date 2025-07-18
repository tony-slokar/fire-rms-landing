const LoginModal = ({ onLogin, onClose }) => {
    return (
        <Modal onClose={onClose}>
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--dark)' }}>LadderOps</div>
                <p style={{ color: 'var(--gray)' }}>Anytown Fire Department</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <FormField label="Badge ID or Email" />
                <FormField label="Password" type="password" />
            </div>

            <div style={{marginTop: '25px' }}>
                 <button onClick={onLogin} style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', width: '100%', fontSize: '16px' }}>
                    Sign In
                 </button>
            </div>
        </Modal>
    );
};