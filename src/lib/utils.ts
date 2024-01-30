import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {Image, Product, ProductWithColors} from '@/types'
import {ProductForm} from '@/validations/productForm.ts'
import {AxiosError} from 'axios'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const isProductWithColors = (product: Product): product is ProductWithColors => {
    return 'colors' in product
}

export const getContrastColor = (hexColor: string) => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16)
    const g = parseInt(hexColor.slice(3, 5), 16)
    const b = parseInt(hexColor.slice(5, 7), 16)

    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

    // Use black or white text based on luminance
    return luminance > 0.5 ? '#000000' : '#ffffff'
}

export const getImageFile = async (url: string): Promise<File> => {
    const res = await fetch(imageUrl(url))
    const contentType = res.headers.get('content-type') || 'image/png'
    const blob = await res.blob()
    return new File([blob], 'file', {type: contentType})
}

export const getImagesFromProduct = async (images: Image[]): Promise<Awaited<(File | {
    image: File,
    color: string
})>[] | void[]> => {
    return await Promise.all(images.map(image => {
        image.color ?
            getImageFile(image.path) :
            {image: getImageFile(image.path), color: image.color}
    }))
}

export const getImagesOfColor = (images: Image[], color: string, one?: boolean) => {
    return one ?
        [images.find(image => image.color === color)] :
        images.filter(image => image.color === color)
}

export const convertToProductSchema = (product: ProductForm, store: string): Product | ProductWithColors => {
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
        mainImage: convertImages(product.mainImage),
        images: convertImages(product.images),
        store,
        // @ts-ignore
        defaultColor: product.colors && product.colors.length ? product.colors[0].name : undefined
    }
}

const convertImages = (images: ProductForm['mainImage'] | ProductForm['images']): Image[] => {
    if (!images) throw new Error('No images provided')

    return images.map(image => {
        if (image instanceof File)
            return {path: saveImage(image)}
        return {path: saveImage(image.image), color: image.color}
    })
}

const saveImage = (image: File): string => {
    // todo save the image in some storage
    return URL.createObjectURL(image)
}

export const imageUrl = (path: string | undefined) =>
    `${import.meta.env.VITE_APP_API_BASE_URL ?? 'http://localhost:3000'}/images/products/${path}`

export const getErrorMessage = (error: Error) => {
    if (import.meta.env.NODE_ENV !== 'production') console.error(error)
    return error instanceof AxiosError ? error.response?.data.message : 'Something went wrong. Please try again later.'
}
