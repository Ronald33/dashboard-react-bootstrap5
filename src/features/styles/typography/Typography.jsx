import PageTitle from '@/components/PageTitle'
import PageBody from '@/components/PageBody'

const Typography = () => {
    return (
        <>
            <PageTitle>Tipografía</PageTitle>
            <PageBody>

                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Títulos</span>
                    </div>
                    <div className="card-body">
                        <h1>h1 — Título principal</h1>
                        <h2>h2 — Título secundario</h2>
                        <h3>h3 — Título terciario</h3>
                        <h4>h4 — Título cuaternario</h4>
                        <h5>h5 — Título quinario</h5>
                        <h6>h6 — Título senario</h6>
                    </div>
                </div>

                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Pesos y estilos</span>
                    </div>
                    <div className="card-body">
                        <p className="fw-bold">Texto en negrita — fw-bold</p>
                        <p className="fw-semibold">Texto semi-negrita — fw-semibold</p>
                        <p className="fw-normal">Texto normal — fw-normal</p>
                        <p className="fw-light">Texto ligero — fw-light</p>
                        <p className="fst-italic">Texto en cursiva — fst-italic</p>
                        <p className="text-decoration-underline">Texto subrayado</p>
                        <p className="text-muted">Texto atenuado — text-muted</p>
                    </div>
                </div>

                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Tamaños</span>
                    </div>
                    <div className="card-body">
                        <p className="fs-1">fs-1 — Texto muy grande</p>
                        <p className="fs-2">fs-2 — Texto grande</p>
                        <p className="fs-3">fs-3 — Texto mediano grande</p>
                        <p className="fs-4">fs-4 — Texto mediano</p>
                        <p className="fs-5">fs-5 — Texto normal</p>
                        <p className="fs-6">fs-6 — Texto pequeño</p>
                    </div>
                </div>

                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Colores de texto</span>
                    </div>
                    <div className="card-body">
                        <p className="text-primary">text-primary</p>
                        <p className="text-secondary">text-secondary</p>
                        <p className="text-success">text-success</p>
                        <p className="text-danger">text-danger</p>
                        <p className="text-warning">text-warning</p>
                        <p className="text-info">text-info</p>
                        <p className="text-muted">text-muted</p>
                    </div>
                </div>

            </PageBody>
        </>
    )
}

export default Typography