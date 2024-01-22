import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {Product, ProductWithColors} from '@/types'

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

export const getImageFile = async (url: string) : Promise<File> => {
    const res = await fetch(url)
    const contentType = res.headers.get('content-type') || 'image/png'
    const blob = await res.blob()
    return new File([blob], 'file', {type: contentType})
}

export const getImagesFromProduct = (images: string | string[] | { [key: string]: string | string[] }) => {
    if (typeof images === 'string') return [getImageFile(images)]
    else if (typeof images === 'object' && !Array.isArray(images))
        return extractImagesFromColorsObj(images)
    else
        return (Promise.all(images.map(image => getImageFile(image))))
}

const extractImagesFromColorsObj = (colors: { [key: string]: string | string[] }) => (
    Object.entries(colors)
        .map(async ([key, value]) => (
            typeof value === 'string' ? Promise.resolve({
                    image: await getImageFile(value),
                    color: key
                }) :
                Promise.all(value.map(async image => ({
                    image: await getImageFile(image),
                    color: key
                })))
        ))
)

