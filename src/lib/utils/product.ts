import {Product, ProductWithColors} from '@/types'

export const isProductWithColors = (product: Product): product is ProductWithColors => {
    return 'colors' in product
}
