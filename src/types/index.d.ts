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
    discount?: number
    oldPrice?: number
    new?: boolean
    category: string
    shipping?: number
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
    quantity: number
    subtotal: number
    totalDiscount?: number
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
