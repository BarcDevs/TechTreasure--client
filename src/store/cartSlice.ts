import {createSlice} from '@reduxjs/toolkit'
import {Cart, CartItem, Product} from '@/types'

const calculateDiscount = (product: Product) =>
    product.sale ? product.price * (product.sale / 100) : 0

const calculateCartTotal = (cart: Cart) =>
    cart.subtotal - (cart.cartDiscount ?? 0) + (cart.shipping ?? 0)

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [] as CartItem[],
        totalItems: 0,
        subtotal: 0,
        shipping: 0,
        cartDiscount: 0,
        total: 0
    } as Cart,
    reducers: {
        addToCart: (cart, {payload: item}: { payload: Product }) => {
            const existingItem = cart.items.find((i) => i.id === item.id)
            if (existingItem) {
                existingItem.quantity += 1
                existingItem.subtotal += item.price
                existingItem.totalDiscount = calculateDiscount(item) + (existingItem.totalDiscount ?? 0)
            } else {
                cart.items.push({
                    ...item,
                    quantity: 1,
                    subtotal: item.price,
                    totalDiscount: calculateDiscount(item)
                })
            }

            cart.totalItems += 1
            cart.subtotal += item.price
            cart.cartDiscount = calculateDiscount(item) + (cart.cartDiscount ?? 0)
            cart.shipping = (item.shippingFee ?? 0) + (cart.shipping ?? 0)
            cart.total = calculateCartTotal(cart)
        },
        removeFromCart: (cart, {payload: item}: { payload: Product }) => {
            const existingItem = cart.items.find((i) => i.id === item.id)
            if (!existingItem) return
            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1
                existingItem.subtotal -= item.price
                existingItem.totalDiscount = calculateDiscount(item) + (existingItem.totalDiscount ?? 0)
            } else {
                cart.items = cart.items.filter((i) => i.id !== item.id)
            }

            cart.totalItems -= 1
            cart.subtotal -= item.price
            cart.cartDiscount = calculateDiscount(item) + (cart.cartDiscount ?? 0)
            cart.shipping = (item.shippingFee ?? 0) + (cart.shipping ?? 0)
            cart.total = calculateCartTotal(cart)
        },
        deleteFromCart: (cart, {payload: item}: { payload: Product }) => {
            const existingItem = cart.items.find((i) => i.id === item.id)
            if (!existingItem) return
            cart.items = cart.items.filter((i) => i.id !== item.id)
            cart.totalItems -= existingItem.quantity
            cart.subtotal -= existingItem.subtotal
            if (cart.cartDiscount)
                cart.cartDiscount = -(existingItem.totalDiscount ?? 0)
            if (cart.shipping)
                cart.shipping -= (existingItem.shippingFee ?? 0) * existingItem.quantity
            cart.total = calculateCartTotal(cart)
        },
        clearCart: (cart) => {
            cart.items = []
            cart.totalItems = 0
            cart.subtotal = 0
            cart.cartDiscount = 0
            cart.shipping = 0
            cart.total = 0
        }
    }
})

export const {addToCart, removeFromCart, deleteFromCart} = cartSlice.actions
export default cartSlice.reducer
