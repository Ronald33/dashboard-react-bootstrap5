import PageTitle from '@/components/PageTitle'
import PageBody from '@/components/PageBody'

const Forms = () => {
    return (
        <>
            <PageTitle>Formularios</PageTitle>
            <PageBody>

                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Inputs básicos</span>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Texto</label>
                                <input type="text" className="form-control" placeholder="Escribe algo..." />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" placeholder="correo@ejemplo.com" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Contraseña</label>
                                <input type="password" className="form-control" placeholder="••••••••" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Número</label>
                                <input type="number" className="form-control" placeholder="0" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Fecha</label>
                                <input type="date" className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Deshabilitado</label>
                                <input type="text" className="form-control" placeholder="No editable" disabled />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Textarea</label>
                                <textarea className="form-control" rows="3" placeholder="Escribe aquí..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Inputs flotantes</span>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="nombre" placeholder="Nombre" />
                                    <label htmlFor="nombre">Nombre completo</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input type="email" className="form-control" id="email" placeholder="Email" />
                                    <label htmlFor="email">Correo electrónico</label>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-floating">
                                    <textarea className="form-control" id="mensaje" placeholder="Mensaje" style={{height: '100px'}}></textarea>
                                    <label htmlFor="mensaje">Mensaje</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Select, checkbox y radio</span>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Select</label>
                                <select className="form-select">
                                    <option>Elige una opción</option>
                                    <option>Opción 1</option>
                                    <option>Opción 2</option>
                                    <option>Opción 3</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <select className="form-select" id="categoria">
                                        <option>Elige una opción</option>
                                        <option>Opción 1</option>
                                        <option>Opción 2</option>
                                    </select>
                                    <label htmlFor="categoria">Categoría</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Checkboxes</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="checkA" />
                                    <label className="form-check-label" htmlFor="checkA">Opción A</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="checkB" />
                                    <label className="form-check-label" htmlFor="checkB">Opción B</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="checkC" disabled />
                                    <label className="form-check-label" htmlFor="checkC">Deshabilitado</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Radios</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="radio" id="radio1" />
                                    <label className="form-check-label" htmlFor="radio1">Opción 1</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="radio" id="radio2" />
                                    <label className="form-check-label" htmlFor="radio2">Opción 2</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="radio" id="radio3" disabled />
                                    <label className="form-check-label" htmlFor="radio3">Deshabilitado</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Switches</label>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="switch1" defaultChecked />
                                    <label className="form-check-label" htmlFor="switch1">Activo</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="switch2" />
                                    <label className="form-check-label" htmlFor="switch2">Inactivo</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="switch3" disabled />
                                    <label className="form-check-label" htmlFor="switch3">Deshabilitado</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Validación</span>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Campo válido</label>
                                <input type="text" className="form-control is-valid" defaultValue="Correcto" />
                                <div className="valid-feedback">¡Se ve bien!</div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Campo inválido</label>
                                <input type="text" className="form-control is-invalid" defaultValue="Error" />
                                <div className="invalid-feedback">Este campo es requerido.</div>
                            </div>
                        </div>
                    </div>
                </div>

            </PageBody>
        </>
    )
}

export default Forms