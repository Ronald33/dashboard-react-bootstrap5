import { Modal } from 'react-bootstrap'

const ConfirmModal = ({ title, message, onConfirm, onCancel }) => {
    return (
        <Modal show={true} onHide={onCancel} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onCancel}>
                    Cancelar
                </button>
                <button className="btn btn-danger" onClick={onConfirm}>
                    Confirmar
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmModal