import PageTitle from '@/components/PageTitle'
import PageBody from '@/components/PageBody'

const stats = [
    { label: 'Total usuarios', value: '0', icon: 'bi-people', color: '#4f46e5' },
    { label: 'Ventas del mes', value: '0', icon: 'bi-graph-up', color: '#0ea5e9' },
    { label: 'Pedidos', value: '0', icon: 'bi-bag', color: '#10b981' },
    { label: 'Pendientes', value: '0', icon: 'bi-clock', color: '#f59e0b' },
]

const Dashboard = () => {
    return (
        <>
            <PageTitle>Dashboard</PageTitle>
            <PageBody>

                <div className="row g-3 mb-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="col-sm-6 col-xl-3">
                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{ borderTop: `3px solid ${stat.color}` }}
                            >
                                <div className="card-body d-flex align-items-center gap-3">
                                    <div
                                        className="rounded d-flex align-items-center justify-content-center flex-shrink-0"
                                        style={{
                                            width: '44px',
                                            height: '44px',
                                            backgroundColor: `${stat.color}18`,
                                            color: stat.color,
                                            fontSize: '1.2rem',
                                        }}
                                    >
                                        <i className={`bi ${stat.icon}`}></i>
                                    </div>
                                    <div>
                                        <div className="text-muted small mb-1">{stat.label}</div>
                                        <div className="fs-4 fw-bold lh-1">{stat.value}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Últimos registros</span>
                    </div>
                    <div className="card-body p-0">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Estado</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={4} className="text-center text-muted py-4">
                                        Sin datos aún
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </PageBody>
        </>
    )
}

export default Dashboard