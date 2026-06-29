import { useEffect, useState } from "react"
import { subscribe, emit } from "./globalLoaderEvents"
import DefaultLoader from "./DefaultLoader"

let _loaderComponent = null
let _activeRequests  = 0

const updateLoader = (isStarting, showLoading) =>
{
    if(!showLoading) { return }

    if(isStarting) { _activeRequests++ }
    else           { _activeRequests = Math.max(0, _activeRequests - 1) }

    if(_activeRequests === 1 && isStarting) { emit("GLOBAL_LOADING", true)  }
    else if(_activeRequests === 0)          { emit("GLOBAL_LOADING", false) }
}

const GlobalLoader = ({ loader }) =>
{
    const [visible, setVisible] = useState(false)

    const LoaderComponent = _loaderComponent || loader || DefaultLoader

    useEffect(() =>
    {
        const unsubscribe = subscribe("GLOBAL_LOADING", (value) =>
        {
            setVisible(value)
        })

        return () => unsubscribe()
    }, [])

    if(!visible) { return null }

    return <LoaderComponent />
}

GlobalLoader.registerApi = (axiosInstance) =>
{
    axiosInstance.interceptors.request.use((config) =>
    {
        updateLoader(true, config._showLoading ?? true)
        return config
    })

    axiosInstance.interceptors.response.use(
        (response) =>
        {
            updateLoader(false, response.config._showLoading ?? true)
            return response
        },
        (error) =>
        {
            updateLoader(false, error.config?._showLoading ?? true)
            return Promise.reject(error)
        }
    )
}

GlobalLoader.setLoader = (component) =>
{
    _loaderComponent = component
}

export default GlobalLoader
