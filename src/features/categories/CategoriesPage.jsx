import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useConfirm from '@/lib/useConfirm/useConfirm';

import PageTitle from '@/components/PageTitle';
import PageBody from '@/components/PageBody';

import CategoriesTable from './components/CategoriesTable';
import CategoriesForm from './components/CategoriesForm';

import HelpersUI from '@/utils/HelpersUI';

import
{
    fetchCategories,
    fetchCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    unsetCategoryItem,
} from './slices/categoriesSlice'

const ERROR_TARGET = 'form_category'

/* =======================
   Component
======================= */
const CategoriesPage = () =>
{
    const confirm = useConfirm();
    const dispatch = useDispatch();

    const { list: categories, item: category, loading } = useSelector((state) => state.categories);

    // Carga inicial de datos
    useEffect(() => 
    {
        dispatch(fetchCategories());
    }, [dispatch])

    // Estado del formulario
    const [formOpen, setFormOpen] = useState(false);

    /* =======================
       Acciones del header
    ======================= */
    const getAcciones = () => [
        {
            label:   'Nueva category',
            icon:    'bi-plus-lg',
            onClick: handleAbrirFormAgregar,
        },
        {
            label:   'Refrescar',
            icon:    'bi-arrow-clockwise',
            onClick: () => dispatch(fetchCategories()),
        },
        {
            label:   'Refrescar sin loader',
            icon:    'bi-arrow-clockwise',
            onClick: () => dispatch(fetchCategories({ config: { showLoading: false } })),
        },
    ]

    /* =======================
       Handlers
    ======================= */
    const handleAbrirFormAgregar = () => 
    {
        dispatch(unsetCategoryItem())
        setFormOpen(true)
    }

    const handleAbrirFormEditar = async (item) => 
    {
        await dispatch(fetchCategoryById({id:item.id}));
        setFormOpen(true)
    }

    const handleCerrarForm = () => 
    {
        setFormOpen(false)
    }

    const handleGuardar = async (formData) => 
    {
        const config = { errorTarget: ERROR_TARGET }
        
        const response = await dispatch(category ? updateCategory({ id: category.id, data: formData, config }) : createCategory({ data: formData, config }))
        
        if(response.payload.success)
        {
            dispatch(fetchCategories())
            handleCerrarForm()
            HelpersUI.toast.success('Category guardada correctamente')
        }
    }

    const handleEliminar = async (item) => 
    {
        const confirmed = await confirm({
            title: '¿Eliminar categoría?',
            message: `¿Estás seguro que deseas eliminar "${item.nombre}"?`,
        });
        
        if(!confirmed) { return; }
        
        const result = await dispatch(deleteCategory({ id: item.id }))
        const response = result.payload;
        
        if(response.success) {
            dispatch(fetchCategories())
            HelpersUI.toast.success('Category eliminada correctamente')
        } else {
            HelpersUI.toast.error('No se pudo eliminar la category')
        }
    }

    /* =======================
       Render
    ======================= */
    return (
        <>
            <PageTitle actions={HelpersUI.gearDropdown(getAcciones())}>
                Categorías
            </PageTitle>
            <PageBody>
                <CategoriesTable data={categories} loading={loading['fetchAll']}
                    onEditar={handleAbrirFormEditar}
                    onEliminar={handleEliminar}
                    getAcciones={getAcciones}
                />
            </PageBody>

            <CategoriesForm open={formOpen} category={category} label={ERROR_TARGET}  key={formOpen ? (category?.id ?? 'nuevo') : 'cerrado'}
                onClose={handleCerrarForm}
                onSubmit={handleGuardar}
            />
        </>
    )
}

export default CategoriesPage;