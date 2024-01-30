import api from './index'
import {ProductForm} from '@/validations/productForm.ts'
import {toFormData,convertToProductSchema} from '@/lib/utils.ts'

type QueryParams = {
    page?: number,
    limit?: number,
    sort?: string,
    fields?: string,
    filter?: object | string,
    search?: string
}

export const getProducts = async (query?: QueryParams) => {
    if (query?.filter && typeof query.filter === 'object')
        query.filter = JSON.stringify(query.filter)
    const queryString = new URLSearchParams(query as Record<any, any> || {}).toString()

    const response = await api.get(`/products?${queryString}`)
    return response.data.data
}

export const getProduct = async (id: string) => {
    const response = await api.get(`/products/${id}`)
    return response.data.data
}

export const getProductsByCategory = async (category: string) => {
    const response = await api.get(`/products/category/${category}`)
    return response.data.data
}

export const getProductsBySearch = async (search: string) => {
    const response = await api.get(`/products/search/${search}`)
    return response.data.data
}

export const createProduct = async ({data, shopId}: { data: ProductForm, shopId: string }) => {
    const product = toFormData(convertToProductSchema(data, shopId))
    const response = await api.post('/products', product, {headers: {'Content-Type': 'multipart/form-data'}})
    return response.data.data
}

export const updateProduct = async ({id, data, shopId}: { id: string, data: ProductForm, shopId: string }) => {
    const product = toFormData(convertToProductSchema(data, shopId))
    const response = await api.patch(`/products/${id}`, product, {headers: {'Content-Type': 'multipart/form-data'}})
    return response.data.data
}

export const deleteProduct = async (id: string) => {
    const response = await api.delete(`/products/${id}`)
    return response.data
}

export const getStore = async (id: string) => {
    if (!id) return {}
    const response = await api.get(`/user/stores/${id}`)
    return response.data.data
}
