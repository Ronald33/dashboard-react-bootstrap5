const Header = ({ onMenuClick }) => {
    return (
        <div
            className="d-flex align-items-center justify-content-between px-4"
            style={{
                height: '56px',
                flexShrink: 0,
                backgroundColor: '#1a1f2e',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
            }}
        >
            <div className="d-flex align-items-center gap-3">
                <button className="btn btn-link p-0 d-md-none" style={{ color: 'rgba(255,255,255,0.6)' }} onClick={onMenuClick}>
                    <i className="bi bi-list fs-5"></i>
                </button>
                <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>Dashboard</span>
            </div>
            <div className="d-flex align-items-center gap-3">
                <i className="bi bi-bell" style={{ color: 'rgba(255,255,255,0.5)' }}></i>
                <div className="d-flex align-items-center gap-2">
                    <div
                        className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white"
                        style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}
                    >
                        U
                    </div>
                    <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>Usuario</span>
                </div>
            </div>
        </div>
    )
}

export default Header