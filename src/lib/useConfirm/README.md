# useConfirm

Plugin de diálogo de confirmación para React + Bootstrap.

---

## ¿Qué es?

`useConfirm` emula el comportamiento del `confirm()` nativo del browser, pero usando un modal de React Bootstrap. Permite pausar la ejecución con `await` y retorna `true` o `false` según la decisión del usuario, sin `try/catch` ni errores en consola.

---

## Archivos

```
confirm/
├── useConfirm.js
├── ConfirmProvider.jsx
└── ConfirmModal.jsx
```

---

## Instalación

### 1. Envolver la app con ConfirmProvider

En `main.jsx` o `App.jsx`:

```jsx
import ConfirmProvider from '@/lib/useConfirm/ConfirmProvider'

const App = () => (
    <ConfirmProvider>
        <RouterProvider router={router} />
    </ConfirmProvider>
)
```

### 2. Usar el hook en cualquier componente

```jsx
import useConfirm from '@/lib/useConfirm/useConfirm'

const MiComponente = () => {
    const confirm = useConfirm()

    const handleEliminar = async (item) => {
        const confirmed = await confirm({ title: '¿Eliminar?', message: '...' })
        if (!confirmed) return
        // continúa solo si el usuario confirmó
        eliminarItem(item.id)
    }
}
```

---

## Uso

### Parámetros de `confirm()`

| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `title` | string | No | Título del modal. Default: `'¿Estás seguro?'` |
| `message` | string | No | Mensaje mostrado en el cuerpo del modal. |
| `onConfirm` | function | No | Callback ejecutado justo antes de cerrar y retornar `true`. |
| `onCancel` | function | No | Callback ejecutado justo antes de cerrar y retornar `false`. |
| `modalComponent` | Component | No | Componente React que reemplaza el modal solo en esta llamada. |

### Ejemplo básico

```js
const confirmed = await confirm({
    title: '¿Eliminar categoría?',
    message: 'Esta acción no se puede deshacer.',
})
if (!confirmed) return
eliminarItem(id)
```

### Con callbacks opcionales

```js
const confirmed = await confirm({
    title: '¿Eliminar?',
    message: 'Esta acción no se puede deshacer.',
    onConfirm: () => console.log('usuario confirmó'),
    onCancel: () => console.log('usuario canceló'),
})
```

---

## Personalización del modal

Los archivos `ConfirmProvider.jsx` y `ConfirmModal.jsx` **no deben modificarse**. Para cambiar el diseño y/o el título por defecto, crea tu propio componente y configura el plugin mediante alguna de las siguientes opciones:

| Prioridad | Opción | Alcance |
|---|---|---|
| 1 (menor) | Props en `ConfirmProvider` | Global, declarativo |
| 2 | `ConfirmProvider.setModal()` / `ConfirmProvider.setTitle()` | Global, programático |
| 3 (mayor) | `title` / `modalComponent` dentro de `confirm()` | Solo esa instancia |

### Opción 1 — Props en el Provider (global declarativo)

Ideal cuando quieres definir la configuración global directamente en el JSX de tu app.

```jsx
import MiModal from '@/components/MiModal'

<ConfirmProvider title="Are you sure?" modalComponent={MiModal}>
    <App />
</ConfirmProvider>
```

Puedes usar una o ambas props de forma independiente:

```jsx
// solo título
<ConfirmProvider title="Are you sure?">

// solo componente
<ConfirmProvider modalComponent={MiModal}>
```

### Opción 2 — setTitle() / setModal() (global programático, pisa a las props)

Ideal para proyectos que tienen un archivo de configuración central (por ejemplo `config.js`), donde se centralizan las decisiones globales de la app.

```js
// config.js
import ConfirmProvider from '@/components/confirm/ConfirmProvider'
import MiModal from '@/components/MiModal'

ConfirmProvider.setTitle('Are you sure?')
ConfirmProvider.setModal(MiModal)
```

Esta opción tiene más peso que las props del Provider. Si ambas están definidas, `setTitle()` y `setModal()` ganan.

### Opción 3 — Parámetros en confirm() (solo esa instancia)

Cuando en un caso puntual necesitas un título o diseño diferente sin afectar el resto de la app.

```js
import MiModalEspecial from '@/components/MiModalEspecial'

const confirmed = await confirm({
    title: 'Título solo para este caso',
    message: 'Solo aquí se usa este diseño.',
    modalComponent: MiModalEspecial,
})
```

Esta opción pisa a todas las demás, pero solo aplica a esa llamada específica.

---

## Contrato del componente personalizado

Todo componente personalizado debe aceptar estas props:

| Prop | Tipo | Descripción |
|---|---|---|
| `title` | string | Título a mostrar en el modal. |
| `message` | string | Mensaje a mostrar en el cuerpo. |
| `onConfirm` | function | Llamar al hacer clic en confirmar. |
| `onCancel` | function | Llamar al hacer clic en cancelar o cerrar. |

> El componente siempre se renderiza con `show={true}` implícitamente: si existe en el DOM es porque debe mostrarse. No necesitas manejarlo.

Ejemplo:

```jsx
const MiModal = ({ title, message, onConfirm, onCancel }) => (
    <Modal show={true} onHide={onCancel} centered>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
            <button onClick={onCancel}>Cancelar</button>
            <button onClick={onConfirm}>Confirmar</button>
        </Modal.Footer>
    </Modal>
)
```

---

## Notas importantes

- `useConfirm()` lanza un error si se usa fuera de `ConfirmProvider`.
- No soporta múltiples confirms apilados: el segundo pisaría al primero. Para confirmaciones no es un caso de uso real.
- No uses este plugin para modales de formularios o contenido complejo, solo para confirmaciones.
- `confirm()` siempre retorna una Promise: debe llamarse con `await` dentro de una función `async`.