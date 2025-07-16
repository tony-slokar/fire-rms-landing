const Modal = ({ children, onClose }) => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
        <div style={{ background: colors.light, padding: '25px', borderRadius: '8px', width: '90%', maxWidth: '500px', position: 'relative' }}>
            <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>&times;</button>
            {children}
        </div>
    </div>
);
