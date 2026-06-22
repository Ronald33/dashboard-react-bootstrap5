import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Modal } from 'react-bootstrap';

/* =======================
   Validation
======================= */
const schema = yup.object(
{
    nombre: yup.string().required().max(10),
});

/* =======================
   Fields
======================= */
const CategoryFields = ({ register, errors }) =>
{
    return (
        <div className="mb-3">
            <label className="form-label">
                Nombre <span className="text-danger">*</span>
            </label>
            <input
                {...register('nombre')}
                type="text"
                className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                placeholder="Nombre de la categoría"
            />
            {
                errors.nombre &&
                (
                    <div className="invalid-feedback">{errors.nombre.message}</div>
                )
            }
        </div>
    );
};

/* =======================
   Component
======================= */
const CategoriesForm = ({ open, onClose, onSubmit, seleccionado }) => 
{
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid, isDirty },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    // Carga valores al abrir
    useEffect(() => 
    {
        if(open)
        {
            reset(seleccionado ? { nombre: seleccionado.nombre } : { nombre: '' });
        }
    }, [open, seleccionado]);

    return (
        <Modal show={open} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {seleccionado ? 'Editar categoría' : 'Nueva categoría'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CategoryFields register={register} errors={errors} />
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onClose}>
                    Cancelar
                </button>
                <button className="btn btn-primary" disabled={!isValid || !isDirty}
                    onClick={handleSubmit(onSubmit)}
                >
                    Guardar
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default CategoriesForm;