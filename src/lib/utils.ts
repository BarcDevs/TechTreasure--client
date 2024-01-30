import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {Image, Product, ProductWithColors} from '@/types'

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
    const res = await fetch(url)
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
