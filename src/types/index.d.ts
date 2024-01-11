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
}
