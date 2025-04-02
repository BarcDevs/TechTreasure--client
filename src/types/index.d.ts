import {HTMLProps} from 'react'
import {CheckoutForm} from '@/validations/checkoutForm.ts'

export type ClassName = HTMLProps<HTMLElement>['className']

export type BasicProduct = {
    _id: string
    name: string
    description: string
    mainImage: [Image]
    images?: Image[],
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
    store: string
}

export type ProductWithColors = Omit<BasicProduct, 'mainImage'> & {
    mainImage: Image[]
    colors: Color[]
    defaultColor: ProductWithColors['colors'][number]['name']
}

export type Product = BasicProduct | ProductWithColors

export type StoreProduct = {
    name: string
    sales: number
    revenue: number
}

export type Image = { path: string, color?: string }

export type Color = { name: string, hex: string }

export type CartItem = Product & {
    itemVariants?: ItemVariant[]
    quantity: number
    subtotal: number
}

export type ItemVariant = { color?: string, size?: string }

export type ManagedProduct = Product & {
    orders: Order[] | string[]
}

export type Order = {
    _id: string
    createdAt: Date
    items: CartItem[]
    payment: string
    status: 'pending' | 'processing' | 'shipped' | 'delivered'
    total: number
    trackingNumber?: string
}

export type BaseUser = {
    _id: string
    name: string
    email: string
    address: string
    role: Role
    billingDetails?: CheckoutForm[]
    cart?: Cart
    orders?: Order[]
    createdAt: Date
}

export type Seller = {
    role: 'seller'
    store: string
} & BaseUser

export type User = BaseUser | Seller

export type Role = 'user' | 'seller'

export type Cart = {
    items: CartItem[]
    totalItems: number
    subtotal: number
    discount?: {
        percent?: number
        fixed?: number
    }
    cartDiscount?: number
    shipping?: number
    total: number
}

export type Category = {
    _id: string
    name: string
    icon: string
    items?: Product[] // populated by mongoose
}

export type Store = {
    name: string
    products: Product[]
    // todo ratings
}
