import PageTitle from '@/components/PageTitle'
import PageBody from '@/components/PageBody'

const datos = [
    { id: 1, nombre: 'Ana García', email: 'ana@ejemplo.com', estado: 'Activo', rol: 'Admin' },
    { id: 2, nombre: 'Luis Pérez', email: 'luis@ejemplo.com', estado: 'Inactivo', rol: 'Usuario' },
    { id: 3, nombre: 'María López', email: 'maria@ejemplo.com', estado: 'Activo', rol: 'Editor' },
    { id: 4, nombre: 'Carlos Ruiz', email: 'carlos@ejemplo.com', estado: 'Pendiente', rol: 'Usuario' },
    { id: 5, nombre: 'Sofía Torres', email: 'sofia@ejemplo.com', estado: 'Activo', rol: 'Admin' },
]

const estadoBadge = (estado) => {
    const variantes = { Activo: 'success', Inactivo: 'secondary', Pendiente: 'warning' }
    return <span className={`badge bg-${variantes[estado]}`}>{estado}</span>
}

const Tables = () => {
    return (
        <>
            <PageTitle>Tablas</PageTitle>
            <PageBody>

                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Tabla básica</span>
                    </div>
                    <div className="card-body p-0">
                        <table className="table mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datos.map((d) => (
                                    <tr key={d.id}>
                                        <td>{d.id}</td>
                                        <td>{d.nombre}</td>
                                        <td>{d.email}</td>
                                        <td>{d.rol}</td>
                                        <td>{estadoBadge(d.estado)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Tabla con acciones</span>
                    </div>
                    <div className="card-body p-0">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datos.map((d) => (
                                    <tr key={d.id}>
                                        <td>{d.id}</td>
                                        <td>{d.nombre}</td>
                                        <td>{d.email}</td>
                                        <td>{estadoBadge(d.estado)}</td>
                                        <td>
                                            <div className="d-flex gap-1">
                                                <button className="btn btn-outline-primary btn-sm">
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button className="btn btn-outline-danger btn-sm">
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Tabla rayada</span>
                    </div>
                    <div className="card-body p-0">
                        <table className="table table-striped table-hover mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datos.map((d) => (
                                    <tr key={d.id}>
                                        <td>{d.id}</td>
                                        <td>{d.nombre}</td>
                                        <td>{d.email}</td>
                                        <td>{d.rol}</td>
                                        <td>{estadoBadge(d.estado)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </PageBody>
        </>
    )
}

export default Tables