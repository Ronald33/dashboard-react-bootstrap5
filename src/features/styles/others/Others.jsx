import PageTitle from '@/components/PageTitle'
import PageBody from '@/components/PageBody'

const Others = () => {
    return (
        <>
            <PageTitle>Otros</PageTitle>
            <PageBody>

                {/* Alerts */}
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Alerts</span>
                    </div>
                    <div className="card-body">
                        <div className="alert alert-success">
                            <i className="bi bi-check-circle me-2"></i>Operación exitosa.
                        </div>
                        <div className="alert alert-danger">
                            <i className="bi bi-x-circle me-2"></i>Ocurrió un error.
                        </div>
                        <div className="alert alert-warning">
                            <i className="bi bi-exclamation-triangle me-2"></i>Atención, revisa esto.
                        </div>
                        <div className="alert alert-info mb-0">
                            <i className="bi bi-info-circle me-2"></i>Información relevante.
                        </div>
                    </div>
                </div>

                {/* Badges */}
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Badges</span>
                    </div>
                    <div className="card-body d-flex flex-wrap gap-2">
                        <span className="badge bg-primary">Primary</span>
                        <span className="badge bg-secondary">Secondary</span>
                        <span className="badge bg-success">Success</span>
                        <span className="badge bg-danger">Danger</span>
                        <span className="badge bg-warning">Warning</span>
                        <span className="badge bg-info">Info</span>
                        <span className="badge bg-dark">Dark</span>
                        <span className="badge rounded-pill bg-primary">Pill</span>
                        <span className="badge rounded-pill bg-success">Pill</span>
                    </div>
                </div>

                {/* Spinners */}
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Spinners</span>
                    </div>
                    <div className="card-body d-flex flex-wrap gap-3">
                        <div className="spinner-border text-primary"></div>
                        <div className="spinner-border text-success"></div>
                        <div className="spinner-border text-danger"></div>
                        <div className="spinner-grow text-primary"></div>
                        <div className="spinner-grow text-success"></div>
                        <div className="spinner-grow text-danger"></div>
                    </div>
                </div>

                {/* Progress */}
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Progress</span>
                    </div>
                    <div className="card-body">
                        <div className="progress mb-3">
                            <div className="progress-bar" style={{width: '25%'}}>25%</div>
                        </div>
                        <div className="progress mb-3">
                            <div className="progress-bar bg-success" style={{width: '50%'}}>50%</div>
                        </div>
                        <div className="progress mb-3">
                            <div className="progress-bar bg-warning" style={{width: '75%'}}>75%</div>
                        </div>
                        <div className="progress">
                            <div className="progress-bar bg-danger" style={{width: '100%'}}>100%</div>
                        </div>
                    </div>
                </div>

            </PageBody>
        </>
    )
}

export default Others