# Dashboard — React + Bootstrap 5

Dashboard minimalista hecho desde cero con React + Bootstrap 5. Sin plantillas, sin extras innecesarios.

---

## Stack

- **React 19**
- **React Bootstrap 5** — componentes React para elementos interactivos
- **React Router 7** — manejo de rutas
- **Bootstrap Icons** — íconos
- **Vite** — bundler y servidor de desarrollo
- **TanStack Table** — tablas con sorting, filtering y paginación
- **React Hook Form + Yup + @hookform/resolvers** — formularios y validación
- **Sonner** — notificaciones toast

---

## Cómo arrancar

```bash
npm install
npm run dev
```

---

## Convención de imports

Siempre usa el alias `@` para rutas absolutas, nunca rutas relativas:

```jsx
// Correcto
import PageTitle from '@/components/PageTitle'
import HelpersUI from '@/utils/HelpersUI'

// Nunca
import PageTitle from '../../components/PageTitle'
```

---

## Estructura del proyecto

```
src/
├── app/                        ← configuración global de Redux
│   └── store.js
├── assets/                     ← imágenes, fuentes, íconos estáticos
├── components/                 ← componentes compartidos entre features
│   ├── PageBody.jsx
│   ├── PageTitle.jsx
│   ├── TablePagination.jsx
│   └── input-persona/          ← componentes complejos tienen carpeta propia
│       ├── InputPersona.jsx
│       ├── hooks/
│       ├── services/
│       └── index.js
├── config/                     ← configuración de librerías externas
│   └── yupConfig.js
├── features/                   ← una carpeta por entidad o funcionalidad
│   ├── categories/
│   │   ├── components/
│   │   │   ├── CategoriesForm.jsx
│   │   │   └── CategoriesTable.jsx
│   │   └── CategoriesPage.jsx
│   ├── dashboard/
│   │   └── Dashboard.jsx
│   ├── example/
│   │   └── Example.jsx         ← plantilla vacía para nuevas features
│   └── styles/                 ← guía visual de componentes UI
│       ├── buttons/
│       ├── forms/
│       ├── interactive/
│       ├── others/
│       ├── tables/
│       └── typography/
├── hooks/                      ← custom hooks genéricos reutilizables
├── layouts/                    ← esqueleto visual de la app
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   └── Layout.jsx
├── lib/                        ← plugins propios configurables
│   └── useConfirm/
│       ├── ConfirmModal.jsx
│       ├── ConfirmProvider.jsx
│       ├── useConfirm.js
│       └── index.js
├── services/                   ← instancia base de axios con interceptors
│   └── api.js
├── utils/                      ← funciones puras y helpers
│   └── HelpersUI.jsx
├── _nav.jsx                    ← ítems del menú lateral
├── routes.jsx                  ← rutas de la app
├── App.jsx                     ← raíz con providers globales
└── main.jsx                    ← entry point
```

### `app/`

Configuración global de Redux. Contiene el `store.js` que ensambla todos los
reducers importándolos desde cada feature. Sigue la convención oficial de Redux Toolkit.

### `assets/`

Archivos estáticos que no cambian: imágenes, fuentes, íconos.

### `components/`

Componentes reutilizables compartidos entre múltiples features.
Los componentes simples van sueltos directamente en la carpeta.
Los componentes complejos con múltiples archivos internos tienen su propia subcarpeta.

> Regla: un solo archivo → suelto en `components/` · múltiples archivos → carpeta propia

### `config/`

Configuración de librerías externas. Se importa una sola vez en `main.jsx`
y afecta toda la app. Ejemplo: mensajes globales de validación de Yup.

### `features/`

El corazón de la app. Cada entidad o funcionalidad tiene su propia carpeta
con todo lo que necesita adentro. Si algo solo lo usa una feature, vive adentro.
Si dos features lo necesitan, sube a la carpeta raíz que corresponda.

Subcarpetas disponibles por feature:

| Subcarpeta | Contenido |
|---|---|
| `components/` | Componentes exclusivos de esa feature |
| `hooks/` | Hooks con lógica de negocio de esa feature |
| `services/` | Llamadas a la API de esa feature |
| `slices/` | Estado Redux de esa feature |
| `schemas/` | Esquemas de validación Yup de esa feature |
| `XxxPage.jsx` | Punto de entrada que ensambla todo |

### `hooks/`

Custom hooks genéricos sin lógica de negocio. No mencionan ninguna entidad
del proyecto. Cualquier feature puede usarlos como base.

### `layouts/` vs `components/`

`layouts/` es el esqueleto visual de la app: Header, Sidebar y el Layout
que los ensambla. Están presentes en todas las páginas y no desaparecen al navegar.

`components/` son piezas de contenido reutilizables que viven dentro del esqueleto
pero desaparecen al cambiar de página.

> Pregunta clave: ¿desaparecería si cambio de página? Sí → `components/` · No → `layouts/`

`layouts/components/` contiene las piezas del esqueleto (Header, Sidebar)
que no tienen sentido fuera del layout.

### `lib/`

Plugins propios configurables y reutilizables. Tienen lógica interna propia
y están diseñados para funcionar en cualquier proyecto sin modificarlos.
Si lo podrías publicar en npm sin cambiar nada, va aquí.

### `services/`

Instancia base de axios con interceptors globales: autenticación, manejo de errores,
loader global. Los servicios de cada feature importan esta instancia y la usan.

### `utils/`

Funciones puras y helpers sin React. No usan hooks, no renderizan nada,
o si renderizan son helpers visuales genéricos como `HelpersUI`.

---

## Cómo agregar una página nueva

Son siempre 3 pasos. Ejemplo: agregar "Clientes".

### Paso 1 — Crear la feature

Crea `src/features/clientes/ClientesPage.jsx` usando `src/features/example/Example.jsx` como base:

```jsx
import PageTitle from '@/components/PageTitle'
import PageBody  from '@/components/PageBody'

const ClientesPage = () => {
    return (
        <>
            <PageTitle>Clientes</PageTitle>
            <PageBody>
                {/* Tu contenido acá */}
            </PageBody>
        </>
    )
}

export default ClientesPage
```

### Paso 2 — Agregar la ruta en `routes.jsx`

```jsx
{
    path: '/clientes',
    element: React.lazy(() => import('@/features/clientes/ClientesPage')),
},
```

### Paso 3 — Agregar el ítem en `_nav.jsx`

```jsx
{
    title: 'Clientes',
    icon: 'bi-people',
    to: '/clientes',
},
```

Los íconos son de Bootstrap Icons: https://icons.getbootstrap.com

---

## Cómo agregar un submenú

En `_nav.jsx` agrega un ítem con `children`:

```jsx
{
    title: 'Reportes',
    icon: 'bi-bar-chart',
    children: [
        { title: 'Ventas',   icon: 'bi-graph-up', to: '/reportes/ventas' },
        { title: 'Usuarios', icon: 'bi-people',   to: '/reportes/usuarios' },
    ],
},
```

El Sidebar lo detecta automáticamente, lo muestra como menú desplegable
y lo abre solo si la ruta activa pertenece al grupo.

---

## Cómo hacer un CRUD

La estructura estándar para cualquier CRUD es 3 archivos dentro de la feature:

```
src/features/mi-entidad/
├── components/
│   ├── MiEntidadTable.jsx   ← tabla con TanStack Table
│   └── MiEntidadForm.jsx    ← modal con React Hook Form + Yup
└── MiEntidadPage.jsx        ← estado, lógica y handlers
```

### MiEntidadPage.jsx — patrón base

Maneja el estado, los handlers y ensambla la tabla y el formulario.

```jsx
import { useState }     from 'react'
import useConfirm       from '@/lib/useConfirm/useConfirm'
import HelpersUI        from '@/utils/HelpersUI'
import PageTitle        from '@/components/PageTitle'
import PageBody         from '@/components/PageBody'
import MiEntidadTable   from './components/MiEntidadTable'
import MiEntidadForm    from './components/MiEntidadForm'

const MiEntidadPage = () => {
    const confirm = useConfirm()

    const [datos, setDatos]               = useState([])
    const [formOpen, setFormOpen]         = useState(false)
    const [seleccionado, setSeleccionado] = useState(null)

    const getAcciones = () => [
        { label: 'Nueva entidad', icon: 'bi-plus-lg', onClick: handleAbrirAgregar },
    ]

    const handleAbrirAgregar = () => { setSeleccionado(null); setFormOpen(true) }
    const handleAbrirEditar  = (item) => { setSeleccionado(item); setFormOpen(true) }
    const handleCerrarForm   = () => { setSeleccionado(null); setFormOpen(false) }

    const handleGuardar = (formData) => {
        if (seleccionado) {
            setDatos(datos.map((d) => d.id === seleccionado.id ? { ...d, ...formData } : d))
            HelpersUI.toast.success('Actualizado correctamente')
        } else {
            setDatos([...datos, { id: Date.now(), ...formData }])
            HelpersUI.toast.success('Creado correctamente')
        }
        handleCerrarForm()
    }

    const handleEliminar = async (item) => {
        const confirmed = await confirm({
            title:   '¿Eliminar?',
            message: `¿Estás seguro que deseas eliminar "${item.nombre}"?`,
        })
        if (!confirmed) return
        setDatos(datos.filter((d) => d.id !== item.id))
        HelpersUI.toast.success('Eliminado correctamente')
    }

    return (
        <>
            <PageTitle actions={HelpersUI.gearDropdown(getAcciones())}>
                Mi Entidad
            </PageTitle>
            <PageBody>
                <MiEntidadTable
                    data={datos}
                    onEditar={handleAbrirEditar}
                    onEliminar={handleEliminar}
                    getAcciones={getAcciones}
                />
            </PageBody>
            <MiEntidadForm
                open={formOpen}
                onClose={handleCerrarForm}
                onSubmit={handleGuardar}
                seleccionado={seleccionado}
            />
        </>
    )
}

export default MiEntidadPage
```

### MiEntidadTable.jsx — patrón base

```jsx
import { useMemo, useState }     from 'react'
import { useReactTable, getCoreRowModel, getFilteredRowModel,
         getPaginationRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table'
import HelpersUI        from '@/utils/HelpersUI'
import TablePagination  from '@/components/TablePagination'

const TableBody = ({ table, onEditar, onEliminar }) => {
    const rows = table.getRowModel().rows
    if (rows.length === 0) return <HelpersUI.TbodyEmpty />

    const getCellContent = (cell) => {
        if (cell.column.id === 'acciones') {
            const item = cell.row.original
            return (
                <div className="d-flex gap-1">
                    <button className="btn btn-outline-primary btn-sm" onClick={() => onEditar(item)}>
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => onEliminar(item)}>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            )
        }
        return flexRender(cell.column.columnDef.cell, cell.getContext())
    }

    return (
        <tbody>
            {rows.map((row) => (
                <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>{getCellContent(cell)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}

const MiEntidadTable = ({ data = [], onEditar, onEliminar, getAcciones }) => {
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting]           = useState([{ id: 'id', desc: true }])
    const [pagination, setPagination]     = useState({ pageIndex: 0, pageSize: 10 })

    const columns = useMemo(() => [
        { accessorKey: 'id',     header: 'ID' },
        { accessorKey: 'nombre', header: 'NOMBRE' },
        // Agrega más columnas acá
        { id: 'acciones', header: '', enableSorting: false },
    ], [])

    const table = useReactTable({
        data, columns,
        state: { globalFilter, sorting, pagination },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="card border-0 shadow-sm">
            <HelpersUI.TableSearchInput value={globalFilter} onChange={setGlobalFilter} />
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover table-striped table-bordered mb-0">
                        <HelpersUI.TableHeader table={table} getAcciones={getAcciones} />
                        <TableBody table={table} onEditar={onEditar} onEliminar={onEliminar} />
                    </table>
                </div>
            </div>
            <TablePagination table={table} />
        </div>
    )
}

export default MiEntidadTable
```

### MiEntidadForm.jsx — patrón base

Los campos del formulario se separan en un subcomponente propio dentro del mismo archivo.
Esto mantiene el modal limpio y hace los campos fáciles de localizar y modificar.

```jsx
import { useEffect }    from 'react'
import { useForm }      from 'react-hook-form'
import { yupResolver }  from '@hookform/resolvers/yup'
import * as yup         from 'yup'
import { Modal }        from 'react-bootstrap'

/* =======================
   Validation
======================= */
const schema = yup.object({
    nombre: yup.string().required().max(100),
    // Agrega más campos acá
})

/* =======================
   Fields
======================= */
const MiEntidadFields = ({ register, errors }) => {
    return (
        <div className="mb-3">
            <label className="form-label">Nombre <span className="text-danger">*</span></label>
            <input
                {...register('nombre')}
                type="text"
                className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                placeholder="Nombre"
            />
            {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
            {/* Agrega más campos acá */}
        </div>
    )
}

/* =======================
   Component
======================= */
const MiEntidadForm = ({ open, onClose, onSubmit, seleccionado }) => {
    const { register, handleSubmit, reset, formState: { errors, isValid, isDirty } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    })

    useEffect(() => {
        if (open) {
            reset(seleccionado ? { nombre: seleccionado.nombre } : { nombre: '' })
        }
    }, [open, seleccionado])

    return (
        <Modal show={open} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{seleccionado ? 'Editar' : 'Nuevo'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MiEntidadFields register={register} errors={errors} />
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                <button className="btn btn-primary" onClick={handleSubmit(onSubmit)} disabled={!isValid || !isDirty}>
                    Guardar
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default MiEntidadForm
```

---

## HelpersUI

Helpers visuales reutilizables disponibles en cualquier componente.

```jsx
import HelpersUI from '@/utils/HelpersUI'

// Dropdown de engranaje — recibe array de acciones
HelpersUI.gearDropdown(getAcciones())

// Th con sorting integrado — úsalo en el thead
<HelpersUI.Th header={header} />

// Input de búsqueda global para tablas
<HelpersUI.TableSearchInput value={globalFilter} onChange={setGlobalFilter} />

// Thead completo con sorting y dropdown de acciones
<HelpersUI.TableHeader table={table} getAcciones={getAcciones} />

// Tbody vacío estándar
<HelpersUI.TbodyEmpty />

// Toasts
HelpersUI.toast.success('Guardado correctamente')
HelpersUI.toast.error('Ocurrió un error')
HelpersUI.toast.warning('Atención')
HelpersUI.toast.info('Información')
```

### Cambiar la librería de toasts

Los toasts no están amarrados a Sonner. `HelpersUI.toast` es una capa de abstracción
definida en `utils/HelpersUI.jsx` que por defecto usa Sonner, pero puede reemplazarse
por cualquier otra librería (react-toastify, notistack, etc.) tocando un solo lugar:

```jsx
// utils/HelpersUI.jsx
HelpersUI.toast = {
    success: (msg) => toast.success(msg),
    error:   (msg) => toast.error(msg),
    warning: (msg) => toast.warning(msg),
    info:    (msg) => toast.info(msg),
}
```

El resto de la app siempre llama a `HelpersUI.toast.success(...)` sin saber
qué librería hay por debajo. Para migrar, solo cambias la implementación aquí.

---

## useConfirm

Diálogo de confirmación que emula el `confirm()` nativo pero con un modal de React Bootstrap.
Pausa la ejecución con `await` y retorna `true` o `false` según la decisión del usuario.

```jsx
import useConfirm from '@/lib/useConfirm/useConfirm'

const confirm = useConfirm()

const handleEliminar = async (item) => {
    const confirmed = await confirm({
        title:   '¿Eliminar?',
        message: `¿Seguro que deseas eliminar "${item.nombre}"?`,
    })
    if (!confirmed) return
    // continúa solo si el usuario confirmó
}
```

El `ConfirmProvider` ya está configurado en `App.jsx`. Ver `lib/useConfirm/README.md`
para documentación completa sobre personalización del modal a 3 niveles.

---

## Archivos clave

| Archivo | Qué hace |
|---|---|
| `_nav.jsx` | Ítems y submenús del sidebar |
| `routes.jsx` | Conecta URLs con features |
| `App.jsx` | Raíz con providers globales (ConfirmProvider, BrowserRouter, Toaster) |
| `main.jsx` | Entry point, importa estilos y configura Yup globalmente |
| `utils/HelpersUI.jsx` | Helpers visuales reutilizables |
| `lib/useConfirm/` | Plugin de diálogo de confirmación |
| `components/PageTitle.jsx` | Título de página con soporte de acciones |
| `components/PageBody.jsx` | Contenedor estándar de página |
| `components/TablePagination.jsx` | Paginación reutilizable para tablas |
| `features/example/Example.jsx` | Plantilla vacía para nuevas features |
| `features/categories/` | CRUD de ejemplo con datos estáticos |
| `features/styles/` | Guía visual de componentes UI del proyecto |