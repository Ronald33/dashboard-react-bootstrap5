# FormError

Plugin de manejo de errores de formulario para React + Axios.

---

## ¿Qué es?

Este _plugin_ escucha automáticamente las respuestas HTTP 400 y permite mostrar errores según un identificador asignado.

---

## Archivos

```
FormError/
├── DefaultFormError.jsx
├── FormError.jsx
├── formErrorEvents.js
└── index.js
```

---

## Instalación

### 1. Instancia de Axios `api.js`

El plugin necesita una instancia de Axios para registrar sus interceptores. Si aún no tienes una, este es el mínimo necesario:

```js
// api.js
import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8000",
})

export default api
```

### 2. Registrar el plugin en `config.js`

```js
// config.js
import api from "./api"
import FormError from '@/lib/FormError'

FormError.registerApi(api)
```

### 3. Importar `config.js` en `main.jsx`

Debe importarse antes que cualquier otra cosa:

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

---

## Uso

### Vincular una petición a un `FormError`

Para hacer uso de este _plugin_, cada petición puede llevar un `_errorTarget` único en su configuración.

```js
api.post("/categorias/", { nombre: "" }, { _errorTarget: "form_categoria" })
```

Luego se debe de colocar el componente `FormError` donde quieras mostrar los errores.

```jsx
<FormError name="form_categoria" />
```

> **Nota:** El componente y la petición se relacionan mediante un mismo identificador (`name` para el componente y `_errorTarget` para las peticiones).

> **Nota:** Los errores se limpian automáticamente al inicio de cada nueva petición.

---

## Personalización del componente

El archivo `DefaultFormError.jsx` **no debe modificarse**. Para cambiar el diseño existen dos opciones:

| Prioridad | Opción | Alcance |
|---|---|---|
| 1 (menor) | `FormError.setComponent()` | Global, reemplaza el default en toda la app |
| 2 (mayor) | Prop `component` en `FormError` | Solo esa instancia, pisa al global |

### Opción 1 — `setComponent()` (global)

Reemplaza el componente por defecto en toda la app. Ideal para definir un diseño consistente desde la configuración central:

```js
// config.js
import api from "./api"
import FormError from "./FormError/FormError"
import MyFormError from "./MyFormError"

FormError.registerApi(api)
FormError.setComponent(MyFormError)
```

### Opción 2 — Prop `component` (solo esa instancia, pisa al global)

Cuando una instancia puntual necesita un diseño diferente al global, se le pasa directamente. Tiene más prioridad que `setComponent()`:

```jsx
<FormError name={errorTarget} component={MyFormError} />
```

---

## Contrato del componente personalizado

El componente personalizado recibe la propiedad `errors`, el cual contendrá el cuerpo del response enviado por el servidor, a continuación se muestra un ejemplo de un complemente personalizado para las respuestas estándar de **Django REST Framework**:

```jsx
// MyFormError.jsx
const MyFormError = ({ errors }) =>
{
    return (
        <div style={{
            marginTop:    "12px",
            padding:      "10px 14px",
            background:   "#fff5f5",
            border:       "1px solid #feb2b2",
            borderRadius: "6px",
            fontSize:     "13px",
            color:        "#c53030",
        }}>
            {Object.entries(errors).map(([field, messages]) =>
            {
                const list = Array.isArray(messages) ? messages : [messages]
                return list.map((msg, i) => (
                    <div key={field + i}>
                        <strong>{field}:</strong> {msg}
                    </div>
                ))
            })}
        </div>
    )
}

export default MyFormError
```

---

## Notas importantes

- El plugin es completamente autónomo: no depende de ninguna utilidad del proyecto.
- El componente `<FormError />` puede colocarse en cualquier parte de la interfaz, no tiene que estar dentro de un formulario.
- Solo reacciona ante respuestas HTTP 400.

---

## Anexo — Integración con Redux Toolkit

Si tu proyecto usa Redux Toolkit, puedes controlar `_errorTarget` desde tus thunks mediante un wrapper sobre `createAsyncThunk`:

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
            _errorTarget: config?.errorTarget || null,
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

Con esto, puedes vincular la petición al componente al despachar un thunk:

```js
const ERROR_TARGET = "form_categoria"

dispatch(createCategoria({ data: formData, config: { errorTarget: ERROR_TARGET } }))
```

```jsx
<FormError name={ERROR_TARGET} />
```
