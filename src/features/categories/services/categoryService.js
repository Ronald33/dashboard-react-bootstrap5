import api from '@/services/api'
const RESOURCE = '/categorias/'
const CategoryService = {}

CategoryService.fetch = async ({ params = {}, config = {} } = {}) =>
{
    const response = await api.get(RESOURCE, { params, ...config })
    return response.data
}

CategoryService.getById = async ({ id, params = {}, config = {} } = {}) => 
{
    const response = await api.get(RESOURCE + id + '/', { params, ...config })
    return response.data
}

CategoryService.create = async ({ data, config = {} } = {}) =>
{
    const response = await api.post(RESOURCE, data, config)
    return response.data
}

CategoryService.update = async ({ id, data, config = {} } = {}) =>
{
    const response = await api.put(RESOURCE + id + '/', data, config)
    return response.data
}

CategoryService.delete = async ({ id, config = {} } = {}) =>
{
    const response = await api.delete(RESOURCE + id + '/', config)
    return response.data
}

export default CategoryService