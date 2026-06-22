import { useState } from 'react';

import useConfirm from '@/lib/useConfirm/useConfirm';

import PageTitle from '@/components/PageTitle';
import PageBody from '@/components/PageBody';

import CategoriesTable from './components/CategoriesTable';
import CategoriesForm from './components/CategoriesForm';

import HelpersUI from '@/utils/HelpersUI';

/* =======================
   Datos estáticos
   (reemplazar por fetch a la API)
======================= */
const datosIniciales = 
[
    { id: 1, nombre: 'Electrónica' },
    { id: 2, nombre: 'Ropa' },
    { id: 3, nombre: 'Alimentos' },
    { id: 4, nombre: 'Hogar' },
    { id: 5, nombre: 'Deportes' },
    { id: 6, nombre: 'Juguetes' },
];

/* =======================
   Component
======================= */
const CategoriesPage = () =>
{
    const confirm = useConfirm();

    // Estado de datos
    const [datos, setDatos] = useState(datosIniciales);

    // Estado del formulario
    const [formOpen, setFormOpen] = useState(false);
    const [seleccionado, setSeleccionado] = useState(null);

    /* =======================
       Acciones de la página
       Se puede pasar al PageTitle o al header de la tabla
    ======================= */
    const getAcciones = () => 
    [
        {
            label: 'Nueva categoría',
            icon: 'bi-plus-lg',
            onClick: handleAbrirAgregar,
        },
    ]

    /* =======================
       Handlers
    ======================= */
    const handleAbrirAgregar = () => 
    {
        setSeleccionado(null);
        setFormOpen(true);
    }

    const handleAbrirEditar = (item) =>
    {
        setSeleccionado(item);
        setFormOpen(true);
    }

    const handleCerrarForm = () =>
    {
        setSeleccionado(null);
        setFormOpen(false);
    }

    const handleGuardar = (formData) => 
    {
        if(seleccionado)
        {
            setDatos(datos.map((d) =>
                d.id === seleccionado.id ? { ...d, nombre: formData.nombre } : d
            ));
            HelpersUI.toast.success('Categoría actualizada correctamente');
        }
        else
        {
            setDatos([...datos, { id: Date.now(), nombre: formData.nombre }]);
            HelpersUI.toast.success('Categoría creada correctamente');
        }
        
        handleCerrarForm();
    }

    const handleEliminar = async (item) => 
    {
        const confirmed = await confirm({
            title: '¿Eliminar categoría?',
            message: `¿Estás seguro que deseas eliminar "${item.nombre}"? Esta acción no se puede deshacer.`,
        });
        
        if(!confirmed) { return; }

        setDatos(datos.filter((d) => d.id !== item.id));
        HelpersUI.toast.success('Categoría eliminada correctamente');
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
                <CategoriesTable data={datos}
                    onEditar={handleAbrirEditar}
                    onEliminar={handleEliminar}
                    getAcciones={getAcciones}
                />
            </PageBody>

            <CategoriesForm open={formOpen} seleccionado={seleccionado}
                onClose={handleCerrarForm}
                onSubmit={handleGuardar}
            />
        </>
    )
}

export default CategoriesPage;