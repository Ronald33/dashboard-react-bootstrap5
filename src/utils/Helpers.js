import { createAsyncThunk } from '@reduxjs/toolkit'

import api from "@/services/api"

const validateApiConfig = () => 
{
    const validateStatus = api.defaults.validateStatus
    const treats4xxAsSuccess = validateStatus?.(400) ?? false

    if(treats4xxAsSuccess)
    {
        throw new Error('La instancia de Axios tiene validateStatus: () => true. ' + ', elimina esa configuración para que createAppThunk funcione correctamente.');
    }
}

const Helpers = {};

Helpers.api = {};

Helpers.api.createAppThunk = (type, serviceMethod) =>
{
    validateApiConfig()

    return createAsyncThunk(type, async (arg = {}, { rejectWithValue }) =>
    {
        const { config, ...rest } = arg
        const internalConfig =
        {
            _showLoading:         config?.showLoading         !== false,
            _errorTarget:         config?.errorTarget         ?? null,
            _disableErrorHandler: config?.disableErrorHandler === true,
        }
        
        try
        {
            const data = await serviceMethod({ ...rest, config: internalConfig })
            return { success: true, data }  // Éxito
        }
        catch(error)
        {
            return rejectWithValue({ success: false, data: error.response?.data ?? null })  // Error
        }
    })
}

export default Helpers;