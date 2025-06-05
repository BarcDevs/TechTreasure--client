import {ProductForm} from '@/validations/productForm.ts'
import {Product} from '@/types'
import {extractFileFromArray, extractFileFromObject, generateFileName} from '@/lib/utils/files.ts'

export const convertToProductSchema = (product: ProductForm): Product => {
    const {price, sale, shippingFee, stock} = product

    const discount = Number(price) * (sale && (Number(sale) > 0) ?
        Number(sale) / 100 : 0)

    return {
        ...product,
        price: Number(price) - discount,
        sale: Number(sale) || undefined,
        shippingFee: Number(shippingFee) || undefined,
        stock: Number(stock),
        oldPrice: discount > 0 ? Number(price) : undefined,
        // @ts-ignore
        defaultColor: product.colors && product.colors.length ? product.colors[0].name : undefined
    }
}

export const toFormData = (data: object) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
            const filename = generateFileName(value)
            formData.append(key, filename)
            return formData.append(filename, value)
        }

        if (value instanceof Array) {
            extractFileFromArray(value, formData)
            return formData.append(key, JSON.stringify(value))
        }

        if (typeof value === 'object') {
            extractFileFromObject(value, formData)
            return formData.append(key, JSON.stringify(value))
        }

        formData.append(key, JSON.stringify(value))
    })
    return formData
}
