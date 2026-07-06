import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Modal } from 'react-bootstrap';
import ErrorMessage from '@/lib/ErrorMessage';
import FormError from '@/lib/FormError';

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
const CategoryFields = ({ register, errors, label }) =>
{
    return (
        <>
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
                <ErrorMessage errors={errors} name="nombre" />
            </div>
            <div className="mt-3">
                <FormError name={label} />
            </div>
        </>
    );
};

/* =======================
   Component
======================= */
const CategoriesForm = ({ open, onClose, onSubmit, category, label }) => 
{
    const defaultValues = category
    ? {
        nombre: category.nombre,
    }
    : {
        nombre: '',
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        // shouldUnregister: true, // al ocultar un campo, se elimina del form state
        defaultValues
    });

    const submitHandler = handleSubmit((data) =>
    {
        const payload = { ...data };

        // delete payload.attribute;

        onSubmit(payload);
    });

    return (
        <Modal show={open} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {category ? 'Editar categoría' : 'Nueva categoría'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CategoryFields register={register} errors={errors} label={label} />
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onClose}>
                    Cancelar
                </button>
                <button className="btn btn-primary" disabled={!isValid || !isDirty}
                    onClick={submitHandler}
                >
                    Guardar
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default CategoriesForm;