import PageTitle from '@/components/PageTitle'
import PageBody from '@/components/PageBody'

const Buttons = () => {
    return (
        <>
            <PageTitle>Botones</PageTitle>
            <PageBody>

                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Variantes</span>
                    </div>
                    <div className="card-body d-flex flex-wrap gap-2">
                        <button className="btn btn-primary">Primary</button>
                        <button className="btn btn-secondary">Secondary</button>
                        <button className="btn btn-success">Success</button>
                        <button className="btn btn-danger">Danger</button>
                        <button className="btn btn-warning">Warning</button>
                        <button className="btn btn-info">Info</button>
                        <button className="btn btn-light">Light</button>
                        <button className="btn btn-dark">Dark</button>
                    </div>
                </div>

                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Outline</span>
                    </div>
                    <div className="card-body d-flex flex-wrap gap-2">
                        <button className="btn btn-outline-primary">Primary</button>
                        <button className="btn btn-outline-secondary">Secondary</button>
                        <button className="btn btn-outline-success">Success</button>
                        <button className="btn btn-outline-danger">Danger</button>
                        <button className="btn btn-outline-warning">Warning</button>
                        <button className="btn btn-outline-info">Info</button>
                        <button className="btn btn-outline-dark">Dark</button>
                    </div>
                </div>

                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Tamaños</span>
                    </div>
                    <div className="card-body d-flex align-items-center flex-wrap gap-2">
                        <button className="btn btn-primary btn-lg">Grande</button>
                        <button className="btn btn-primary">Normal</button>
                        <button className="btn btn-primary btn-sm">Pequeño</button>
                    </div>
                </div>

                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Con íconos</span>
                    </div>
                    <div className="card-body d-flex flex-wrap gap-2">
                        <button className="btn btn-primary">
                            <i className="bi bi-plus-lg me-1"></i>Agregar
                        </button>
                        <button className="btn btn-success">
                            <i className="bi bi-check-lg me-1"></i>Guardar
                        </button>
                        <button className="btn btn-danger">
                            <i className="bi bi-trash me-1"></i>Eliminar
                        </button>
                        <button className="btn btn-outline-secondary">
                            <i className="bi bi-pencil me-1"></i>Editar
                        </button>
                        <button className="btn btn-outline-primary">
                            <i className="bi bi-download me-1"></i>Exportar
                        </button>
                    </div>
                </div>

                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Estados</span>
                    </div>
                    <div className="card-body d-flex flex-wrap gap-2">
                        <button className="btn btn-primary" disabled>
                            Deshabilitado
                        </button>
                        <button className="btn btn-primary" disabled>
                            <span className="spinner-border spinner-border-sm me-1"></span>
                            Cargando...
                        </button>
                        <button className="btn btn-success">
                            <i className="bi bi-check-lg me-1"></i>Completado
                        </button>
                    </div>
                </div>

            </PageBody>
        </>
    )
}

export default Buttons