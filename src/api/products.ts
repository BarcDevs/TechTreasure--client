import api from './index'
import {ProductForm} from '@/validations/productForm.ts'
import {toFormData, convertToProductSchema} from '@/lib/utils/data.ts'
import {Product} from '@/types'

type QueryParams = {
    page?: number,
    limit?: number,
    sort?: string,
    fields?: string,
    filter?: object | string,
    search?: string,
    category?: string
}

export const getProducts = async (query?: QueryParams): Promise<{
    products: Product[],
    totalPages: number
}> => {
    if (query?.filter && typeof query.filter === 'object')
        query.filter = JSON.stringify(query.filter)

    const queryString = query && new URLSearchParams(
        Object.entries(query)
            .filter(([, value]) => value !== undefined) // Exclude keys with undefined values
            .reduce((acc, [key, value]) => {
                acc[key] = value
                return acc
            }, {} as Record<any, any>)
    ).toString()

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

export const createProduct = async ({data}: { data: ProductForm, shopId: string }) => {
    const product = toFormData(convertToProductSchema(data))
    const response = await api.post('/products', product, {headers: {'Content-Type': 'multipart/form-data'}})
    return response.data.data
}

export const updateProduct = async ({id, data}: { id: string, data: ProductForm }) => {
    const product = toFormData(convertToProductSchema(data))
    const response = await api.patch(`/products/${id}`, product, {headers: {'Content-Type': 'multipart/form-data'}})
    return response.data.data
}

export const updateProductRating = async (id: string, rating: number) => {
    const response =
        await api.patch(`/products/${id}/rating`, {rating})
    return response.data.data
}

export const deleteProduct = async (id: string) => {
    const response = await api.delete(`/products/${id}`)
    return response.data
}
