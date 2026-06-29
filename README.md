# Dashboard React + Bootstrap 5

> **Rama: `feature/api-integration`**  
> Extiende `master` convirtiendo el módulo de Categorías de datos estáticos a una API REST real, e introduce toda la infraestructura necesaria para que el resto de módulos puedan seguir el mismo patrón.

---

## Qué cambió respecto a `master`

En `master`, el CRUD de Categorías funcionaba con datos en memoria (`useState` local, sin llamadas HTTP). Esta rama reemplaza ese enfoque con:

- Una instancia de **Axios** centralizada con variables de entorno
- **Redux Toolkit** para el estado global y llamadas asíncronas
- Un conjunto de **librerías internas** (`lib/`) que gestionan loading, errores HTTP y errores de formulario de forma automática
- Una **convención de respuesta** uniforme (`{ success, data }`) para todas las operaciones

Los archivos de estilos, layout, routing y componentes base de `master` no se tocaron.

---

## Archivos modificados

| Archivo | Qué cambió |
|---|---|
| `src/main.jsx` | Importa `config/config.js` antes que todo lo demás para registrar interceptores |
| `src/App.jsx` | Agrega `<Provider store={store}>` y `<GlobalLoader />` |
| `src/features/categories/CategoriesPage.jsx` | Reemplaza estado local + datos estáticos por despacho de thunks Redux |
| `src/features/categories/components/CategoriesForm.jsx` | Integra `<ErrorMessage>` y `<FormError>` para errores de validación y errores 400 de la API |
| `src/features/categories/components/CategoriesTable.jsx` | Recibe `loading` como prop para mostrar estado de carga |
| `src/utils/HelpersUI.jsx` | Agrega `HelpersUI.TbodyEmpty` con mensaje de "Cargando..." |
| `package.json` | Agrega `axios`, `@reduxjs/toolkit` y `react-redux` |
| `.gitignore` | Excluye archivos `.env.*` |

## Archivos nuevos

| Archivo / Carpeta | Qué hace |
|---|---|
| `src/app/store.js` | Configura el store de Redux con el reducer de categorías |
| `src/config/config.js` | Registra interceptores y librerías al inicio de la app |
| `src/services/api.js` | Instancia de Axios con `baseURL` y `timeout` desde `.env` |
| `src/utils/Helpers.js` | `createAppThunk` — wrapper de `createAsyncThunk` con convención `{ success, data }` |
| `src/features/categories/services/categoryService.js` | Operaciones CRUD contra la API REST |
| `src/features/categories/slices/categoriesSlice.js` | Estado, thunks y reducers de categorías |
| `src/components/MyErrorMessage.jsx` | Implementación visual de `ErrorMessage` |
| `src/components/MyFormError.jsx` | Implementación visual de `FormError` |
| `src/components/MyLoader.jsx` | Implementación visual de `GlobalLoader` |
| `src/lib/ErrorMessage/` | Lib: error de campo en formularios (react-hook-form) |
| `src/lib/FormError/` | Lib: errores 400 de la API mostrados en el formulario |
| `src/lib/GlobalLoader/` | Lib: loader global vinculado automáticamente a Axios |
| `src/lib/httpErrorHandler/` | Lib: manejo centralizado de errores HTTP |

---

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_API_TIMEOUT=5000
```

| Variable | Descripción |
|---|---|
| `VITE_API_BASE_URL` | URL base de la API REST |
| `VITE_API_TIMEOUT` | Tiempo máximo de espera en ms (por defecto `5000`) |

---

## Instalación y arranque

```bash
npm install
npm run dev
```

---

## Cómo funciona la integración con la API

### 1. Instancia de Axios (`src/services/api.js`)

Axios se configura una sola vez con `baseURL` y `timeout` tomados de las variables de entorno. Esta instancia es la que consumen todos los servicios y sobre la que se registran los interceptores.

### 2. Punto de arranque (`src/config/config.js`)

Se importa al inicio de `main.jsx`, antes que React y los estilos. Registra tres cosas sobre la instancia de Axios:

- **GlobalLoader** — muestra/oculta el loader automáticamente en cada petición
- **HttpErrorHandler** — captura errores HTTP y dispara un toast genérico (excepto 400, que se delega a FormError)
- **FormError** — intercepta respuestas 400 y las envía al formulario correcto mediante `errorTarget`

### 3. Convención de respuesta: `{ success, data }`

Todos los thunks devuelven siempre un objeto con esta forma, sin importar si la operación fue exitosa o no:

```js
// Éxito
{ success: true,  data: <payload de la API> }

// Error
{ success: false, data: <error.response.data o null> }
```

Esto permite guards simples y legibles en los handlers sin necesidad de try/catch:

```js
const response = await dispatch(createCategory({ data: formData, config }));

if (response.payload.success) {
    dispatch(fetchCategories());
    handleCerrarForm();
    HelpersUI.toast.success('Category guardada correctamente');
}
// Si success === false, el error ya fue manejado por FormError o HttpErrorHandler
```

### 4. Thunks con `Helpers.api.createAppThunk`

Wrapper sobre `createAsyncThunk` que normaliza el flujo para toda la app:

```js
// categoriesSlice.js
export const createCategory = Helpers.api.createAppThunk(
    'categories/create',
    ({ data, config }) => CategoryService.create({ data, config })
);
```

Internamente extrae las opciones de `config`, llama al servicio, y siempre resuelve con `{ success, data }` en lugar de rechazar el thunk.

### 5. Opciones de `config` por llamada

Al hacer un dispatch se puede pasar `config` para controlar el comportamiento de esa petición específica:

| Opción | Por defecto | Descripción |
|---|---|---|
| `showLoading` | `true` | Muestra o suprime el loader global |
| `errorTarget` | `null` | Nombre del `<FormError>` que recibirá los errores 400 |
| `disableErrorHandler` | `false` | Suprime el handler de errores HTTP para esa llamada |

```js
// Refrescar sin mostrar loader
dispatch(fetchCategories({ config: { showLoading: false } }));

// Enviar errores 400 al formulario "form_category"
dispatch(createCategory({ data, config: { errorTarget: 'form_category' } }));
```

---

## Librerías internas (`src/lib/`)

Cada librería es independiente, tiene su propio `README.md` y expone una API estática para configuración. El componente visual de cada una es intercambiable.

### ErrorMessage

Muestra el mensaje de error de un campo individual (integrado con react-hook-form).

```jsx
// Registrar el componente visual una vez (en config.js)
ErrorMessage.setComponent(MyErrorMessage);

// Usar en el formulario
<ErrorMessage errors={errors} name="nombre" />
```

### FormError

Captura respuestas 400 de la API y las muestra en el formulario que corresponde, identificado por `name`. Se limpia automáticamente al inicio de cada nueva petición.

```jsx
// Registrar una vez (en config.js)
FormError.registerApi(api);
FormError.setComponent(MyFormError);

// Colocar en el formulario
<FormError name="form_category" />

// Vincular al dispatch
dispatch(createCategory({ data, config: { errorTarget: 'form_category' } }));
```

### GlobalLoader

Muestra un loader mientras hay peticiones activas. Contabiliza las peticiones en vuelo y se oculta solo cuando todas terminan.

```jsx
// Registrar una vez (en config.js)
GlobalLoader.registerApi(api);
GlobalLoader.setLoader(MyLoader);

// Colocar en el árbol de componentes (en App.jsx)
<GlobalLoader />

// Suprimir por petición
dispatch(fetchCategories({ config: { showLoading: false } }));
```

### HttpErrorHandler

Ejecuta una función callback ante errores HTTP (cualquier status que Axios considere error). Los errores 400 con `errorTarget` configurado los gestiona FormError, no este handler.

```js
// Registrar una vez (en config.js)
HttpErrorHandler.registerApi(api);
HttpErrorHandler.setTrigger((error) => {
    const status = error.response?.status ?? error.status;
    if (status === 400) { return; }
    HelpersUI.toast.error('Ocurrió un error realizando la petición.');
});
```

---

## Flujo completo de una operación de escritura

```
Usuario hace clic en "Guardar"
  → handleGuardar despacha createCategory / updateCategory
    → createAppThunk llama a CategoryService
      → Axios lanza la petición
        → GlobalLoader muestra el loader
        → Si la respuesta es 400:  FormError muestra los errores en el modal
        → Si hay otro error HTTP:  HttpErrorHandler muestra el toast genérico
      → El thunk siempre resuelve con { success, data }
    → El handler evalúa response.payload.success
      → true:  refresca la lista, cierra el modal, muestra toast de éxito
      → false: no hace nada adicional (el error ya fue manejado)
```

---

## Cómo usar este patrón en un módulo nuevo

Para conectar cualquier otro módulo a la API, seguir la misma estructura de `categories/`:

**1. Service** — `src/features/mi-entidad/services/miEntidadService.js`
```js
import api from '@/services/api';
const RESOURCE = '/mi-entidad/';
const MiEntidadService = {};

MiEntidadService.fetch  = async ({ params = {}, config = {} } = {}) =>
    (await api.get(RESOURCE, { params, ...config })).data;

MiEntidadService.create = async ({ data, config = {} } = {}) =>
    (await api.post(RESOURCE, data, config)).data;

// ... getById, update, delete

export default MiEntidadService;
```

**2. Slice** — `src/features/mi-entidad/slices/miEntidadSlice.js`
```js
import { createSlice } from '@reduxjs/toolkit';
import Helpers from '@/utils/Helpers';
import MiEntidadService from '../services/miEntidadService';

const SLICE_NAME = 'miEntidad';

export const fetchMiEntidad = Helpers.api.createAppThunk(
    SLICE_NAME + '/fetchAll',
    (arg) => MiEntidadService.fetch(arg)
);
export const createMiEntidad = Helpers.api.createAppThunk(
    SLICE_NAME + '/create',
    ({ data, config }) => MiEntidadService.create({ data, config })
);

const miEntidadSlice = createSlice({
    name: SLICE_NAME,
    initialState: { list: [], item: null, loading: {} },
    reducers: {
        unsetItem(state) { state.item = null; }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            (action) => action.type.startsWith(SLICE_NAME + '/'),
            (state, action) => {
                const [, methodName, status] = action.type.split('/');
                state.loading[methodName] = (status === 'pending');
                if (status === 'fulfilled') {
                    if (methodName === 'fetchAll') { state.list = action.payload?.data ?? action.payload; }
                    if (methodName === 'fetchById') { state.item = action.payload?.data ?? action.payload; }
                }
            }
        );
    }
});

export const { unsetItem } = miEntidadSlice.actions;
export default miEntidadSlice.reducer;
```

**3. Registrar en el store** — `src/app/store.js`
```js
import miEntidadReducer from '@/features/mi-entidad/slices/miEntidadSlice';

export const store = configureStore({
    reducer: {
        // ... reducers existentes
        miEntidad: miEntidadReducer,
    },
});
```