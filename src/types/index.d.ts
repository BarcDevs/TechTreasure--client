export interface Product {
    id: string
    name: string
    image: string
    rating: number
    votes: number
    price: number
    discount?: number
    oldPrice?: number
    colors?: { name: string, hex: string }[]
    new?: boolean
    category: string
    shipping?: number
}

export interface CartItem extends Product {
    quantity: number
    subtotal: number
    totalDiscount?: number
}

export interface Cart {
    items: CartItem[]
    subtotal: number
    cartDiscount?: number
    shipping?: number
    total: number
}

export interface Category {
    id: string
    name: string
    icon: string
    items?: Product[] // populated by mongoose
}
