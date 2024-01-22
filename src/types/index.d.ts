import {HTMLProps} from 'react'

export type ClassName = HTMLProps<HTMLElement>["className"]

export type BasicProduct = {
    id: string
    name: string
    description: string
    mainImage: string
    images?: string[],
    sizes?: string[]
    rating: number
    votes: number
    price: number
    sale?: number
    saleEndsAt?: Date
    oldPrice?: number
    isNew?: boolean
    category: string
    shippingFee?: number
    stock: number
}

export type ProductWithColors = Omit<BasicProduct, 'mainImage' | 'images'> & {
    mainImage: { [key: ProductWithColors['colors'][number]['name']]: string }
    images?: { [key: ProductWithColors['colors'][number]['name']]: string[] }
    colors: Color[]
    defaultColor: ProductWithColors['colors'][number]['name']
}

export type Product = BasicProduct | ProductWithColors

export type Color = { name: string, hex: string }

export type CartItem = Product & {
    itemVariants?: [{ color?: string, size?: string }]
    quantity: number
    subtotal: number
    totalDiscount?: number
}

export type ManagedProduct = Product & {
    orders: Order[] | string[]
}

export type Order = {
    id: string
    createdAt: Date
    items: CartItem[]
    payment: string
    status: 'pending' | 'processing' | 'shipped' | 'delivered'
    total: number
    trackingNumber?: string
}

export type User = {

}

export type Cart = {
    items: CartItem[]
    subtotal: number
    cartDiscount?: number
    shipping?: number
    total: number
}

export type Category = {
    id: string
    name: string
    icon: string
    items?: Product[] // populated by mongoose
}
