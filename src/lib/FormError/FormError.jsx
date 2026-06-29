import { useEffect, useState } from "react"
import { subscribe, emit } from "./formErrorEvents"
import DefaultFormError from "./DefaultFormError"

let _formErrorComponent = null

const FormError = ({ name, component }) =>
{
    const [errors, setErrors] = useState(null)

    /*
        Orden de prioridad:
        1. (menor) DefaultFormError        → fallback si no se configuró nada
        2.         setComponent()          → global, reemplaza el default
        3. (mayor) prop component          → solo esta instancia, pisa al global
    */
    const ErrorComponent = component || _formErrorComponent || DefaultFormError

    useEffect(() =>
    {
        const unsubscribe = subscribe("FORM_ERROR", (payload) =>
        {
            if(!payload)                     { setErrors(null);         return }
            if(payload.errorTarget === name) { setErrors(payload.data); return }
        })

        return () => unsubscribe()
    }, [name])

    if(!errors) { return null }

    return <ErrorComponent errors={errors} />
}

FormError.registerApi = (axiosInstance) =>
{
    const validateStatus     = axiosInstance.defaults.validateStatus
    const treats400AsSuccess = validateStatus?.(400) ?? false

    const handle400 = (status, data, errorTarget) =>
    {
        if(status === 400) { emit("FORM_ERROR", { data, errorTarget }) }
    }

    axiosInstance.interceptors.request.use((config) =>
    {
        emit("FORM_ERROR", null)
        return config
    })

    axiosInstance.interceptors.response.use(
        (response) =>
        {
            if(treats400AsSuccess)
            {
                handle400(response.status, response.data, response.config?._errorTarget)
            }
            return response
        },
        (error) =>
        {
            if(!treats400AsSuccess)
            {
                handle400(error.response?.status, error.response?.data, error.config?._errorTarget)
            }
            return Promise.reject(error)
        }
    )
}

FormError.setComponent = (component) =>
{
    _formErrorComponent = component
}

export default FormError