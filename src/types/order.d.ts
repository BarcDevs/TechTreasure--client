export type OrderItem = {
    quantity: number
    price: number
    item: string
}

export type CustomerDetails = {
    name: string
    company?: string
    address: string
    additional_address?: string
    city: string
    country: string
    postcode: string
    phone: string
    email: string
}

export type Order = {
    _id?: string
    amount: number
    orderId: string
    trackingNumber?: string
    items: OrderItem[]
    customerDetails: CustomerDetails
    createdAt?: Date
    updatedAt?: Date
}
