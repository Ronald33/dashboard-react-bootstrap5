import { useState } from 'react'
import { Modal, Offcanvas, Accordion } from 'react-bootstrap'
import PageTitle from '@/components/PageTitle'
import PageBody from '@/components/PageBody'

const Interactive = () => {
    const [modal, setModal] = useState(false)
    const [modalConfirm, setModalConfirm] = useState(false)
    const [drawer, setDrawer] = useState(false)

    return (
        <>
            <PageTitle>Interactivos</PageTitle>
            <PageBody>

                {/* Modales */}
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Modales</span>
                    </div>
                    <div className="card-body d-flex gap-2">
                        <button className="btn btn-primary" onClick={() => setModal(true)}>
                            Modal básico
                        </button>
                        <button className="btn btn-danger" onClick={() => setModalConfirm(true)}>
                            Modal de confirmación
                        </button>
                    </div>
                </div>

                {/* Accordion */}
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Accordion</span>
                    </div>
                    <div className="card-body">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Sección 1</Accordion.Header>
                                <Accordion.Body>
                                    Contenido de la sección 1.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Sección 2</Accordion.Header>
                                <Accordion.Body>
                                    Contenido de la sección 2.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Sección 3</Accordion.Header>
                                <Accordion.Body>
                                    Contenido de la sección 3.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>

                {/* Offcanvas */}
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-white border-bottom">
                        <span className="fw-semibold">Offcanvas (Drawer)</span>
                    </div>
                    <div className="card-body">
                        <button className="btn btn-outline-primary" onClick={() => setDrawer(true)}>
                            Abrir drawer
                        </button>
                    </div>
                </div>

            </PageBody>

            {/* Modal básico */}
            <Modal show={modal} onHide={() => setModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Título del modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Contenido del modal. Acá puedes poner un formulario, información, lo que necesites.</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setModal(false)}>
                        Cerrar
                    </button>
                    <button className="btn btn-primary" onClick={() => setModal(false)}>
                        Guardar
                    </button>
                </Modal.Footer>
            </Modal>

            {/* Modal de confirmación */}
            <Modal show={modalConfirm} onHide={() => setModalConfirm(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>¿Estás seguro?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Esta acción no se puede deshacer. ¿Deseas continuar?
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setModalConfirm(false)}>
                        Cancelar
                    </button>
                    <button className="btn btn-danger" onClick={() => setModalConfirm(false)}>
                        Sí, eliminar
                    </button>
                </Modal.Footer>
            </Modal>

            {/* Drawer */}
            <Offcanvas show={drawer} onHide={() => setDrawer(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Drawer lateral</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <p>Contenido del drawer. Útil para filtros, detalles, formularios secundarios.</p>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Interactive