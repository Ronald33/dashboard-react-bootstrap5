# GlobalLoader

Plugin de loader automático para React + Axios.

---

## ¿Qué es?

`GlobalLoader` muestra automáticamente una barra de progreso en la parte superior de la pantalla cada vez que hay peticiones HTTP activas. Se integra con Axios mediante un interceptor.

---

## Archivos

```
GlobalLoader/
├── DefaultLoader.jsx
├── GlobalLoader.jsx
├── globalLoaderEvents.js
└── index.js
```

---

## Instalación

### 1. Instancia de Axios `api.js`

El plugin necesita una instancia de Axios para registrar sus interceptores. Si aún no tienes una, este es el mínimo necesario:

```js
// api.js
import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
})

export default api;
```

### 2. Registrar el plugin en `config.js`

Crea un archivo de configuración cuyo único propósito sea registrar plugins. Aquí se conecta `GlobalLoader` a la instancia de Axios:

```js
// config.js
import api from "./api";
import GlobalLoader from "./GlobalLoader";

GlobalLoader.registerApi(api)
```

### 3. Importar `config.js` en `main.jsx`

Debe importarse antes que cualquier otra cosa para que los interceptores estén registrados desde el inicio:

```jsx
// main.jsx
import "./config.js"   // siempre primero
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
)
```

### 4. Colocar `GlobalLoader` en el árbol de componentes

En `App.jsx` o en el layout raíz:

```jsx
// App.jsx
import GlobalLoader from "./GlobalLoader"

const App = () => (
    <>
        <GlobalLoader />
        {/* resto de tu app */}
    </>
)

export default App
```

---

## Uso

Una vez instalado, el loader aparece y desaparece automáticamente con cada petición HTTP. No requiere ninguna acción adicional.

Para probarlo rápidamente con la API de ejemplo:

```js
// Muestra el loader mientras dura la petición
api.get("/posts")

// Muestra el loader mientras dura la petición
api.post("/posts", { title: "Hola", body: "Mundo", userId: 1 })
```

### Deshabilitar el loader en una petición específica

El plugin lee la propiedad `_showLoading` del config de Axios. Para desactivarlo en una petición específica, pásala como `false`:

```js
api.get("/posts", { _showLoading: false })
api.post("/posts", body, { _showLoading: false })
```

Si no se pasa, el valor por defecto es `true` y el loader se muestra.

---

## Personalización del loader

El archivo `DefaultLoader.jsx` **no debe modificarse**. Para cambiar el diseño, crea tu propio componente y conéctalo mediante alguna de las siguientes opciones:

| Prioridad | Opción | Alcance |
|---|---|---|
| 1 (menor) | Prop `loader` en `GlobalLoader` | Global, declarativo |
| 2 (mayor) | `GlobalLoader.setLoader()` | Global, programático |

### Opción 1 — Prop en el componente (global declarativo)

Ideal cuando quieres definir el diseño global directamente en el JSX de tu app:

```jsx
// App.jsx
import GlobalLoader from "./GlobalLoader/GlobalLoader"
import MyLoader from "./MyLoader"

const App = () => (
    <>
        <GlobalLoader loader={MyLoader} />
        {/* resto de tu app */}
    </>
)

export default App
```

### Opción 2 — `setLoader()` (global programático, pisa a la prop)

Ideal para proyectos con un archivo de configuración central. Si ambas opciones están definidas, `setLoader()` gana:

```js
// config.js
import api from "./api"
import GlobalLoader from "./GlobalLoader/GlobalLoader"
import MyLoader from "./MyLoader"

GlobalLoader.registerApi(api)
GlobalLoader.setLoader(MyLoader)
```

---

## Contrato del componente personalizado

El componente personalizado no recibe props: se renderiza únicamente cuando el loader debe estar visible.

```jsx
// MyLoader.jsx
const MyLoader = () => 
{
    return (
        <>
            <style>{`
                @keyframes global-loader-slide {
                    0%   { left: -40%; width: 40%; }
                    50%  { width: 60%; }
                    100% { left: 110%; width: 40%; }
                }
            `}</style>
            <div style={{
                position:   "fixed",
                top:        0,
                left:       0,
                width:      "100%",
                height:     "4px",
                background: "#e0e0e0",
                zIndex:     9999,
                overflow:   "hidden",
            }}>
                <div style={{
                    position:   "absolute",
                    height:     "100%",
                    background: "#1976d2",
                    animation:  "global-loader-slide 1.2s ease-in-out infinite",
                }} />
            </div>
        </>
    );
}

export default MyLoader;
```

---

## Notas importantes

- El plugin es completamente autónomo: no depende de ninguna utilidad del proyecto.
- El loader permanece visible hasta que **todas** las peticiones activas hayan finalizado.
- `GlobalLoader.registerApi` puede llamarse con múltiples instancias de Axios si el proyecto las tiene.

---

## Anexo — Integración con Redux Toolkit

Si tu proyecto usa Redux Toolkit y quieres controlar `_showLoading` desde tus thunks sin pasarlo manualmente en cada llamada a `api`, puedes crear un wrapper sobre `createAsyncThunk` que traduzca las opciones del usuario al formato interno que Axios espera.

El siguiente ejemplo muestra cómo implementarlo. Solo se incluye la parte relevante para el plugin; cualquier otra lógica queda a criterio del proyecto:

```js
// createAppThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit"

const createAppThunk = (type, serviceMethod) =>
{
    return createAsyncThunk(type, async (arg = {}, { rejectWithValue }) =>
    {
        const { config, ...rest } = arg

        const internalConfig =
        {
            _showLoading: config?.showLoading !== false,  // true por defecto
        }

        try
        {
            return await serviceMethod({ ...rest, config: internalConfig })
        }
        catch(error)
        {
            return rejectWithValue(error)
        }
    })
}

export default createAppThunk
```

Con esto, al despachar un thunk puedes controlar el loader así:

```js
// Muestra el loader (comportamiento por defecto)
dispatch(fetchPosts())

// No muestra el loader
dispatch(fetchPosts({ config: { showLoading: false } }))
```
