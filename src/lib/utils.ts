import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {Product, ProductWithColors} from '@/types'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const isProductWithColors = (product: Product): product is ProductWithColors => {
    return 'colors' in product
}
