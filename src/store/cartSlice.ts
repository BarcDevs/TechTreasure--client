import {createSlice} from '@reduxjs/toolkit'
import {Cart, CartItem, Product} from '@/types'

const calculateDiscount = (cart: Cart) => {
    if (!cart.discount) return 0
    if (cart.discount.percent)
        return ((cart.discount.percent / 100) * cart.subtotal) + (cart.discount.fixed ?? 0)
    return cart.discount.fixed
}

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
            } else {
                cart.items.push({
                    ...item,
                    quantity: 1,
                    subtotal: item.price
                })
            }

            cart.totalItems += 1
            cart.subtotal += item.price
            cart.cartDiscount = calculateDiscount(cart)
            cart.shipping = (item.shippingFee ?? 0) + (cart.shipping ?? 0)
            cart.total = calculateCartTotal(cart)
        },
        updateCart: (cart, {payload}: { payload: { item: Product, quantity: number } }) => {
            const {item, quantity} = payload
            if (quantity === 0) deleteFromCart(item)

            const existingItem = cart.items.find((i) => i.id === item.id)
            if (!existingItem) return

            cart.totalItems += (quantity - existingItem.quantity)
            cart.subtotal += (item.price * quantity) - existingItem.subtotal
            cart.cartDiscount = calculateDiscount(cart)
            cart.shipping = (item.shippingFee ?? 0) * (quantity - existingItem.quantity) + (cart.shipping ?? 0)
            cart.total = calculateCartTotal(cart)

            existingItem.quantity = quantity
            existingItem.subtotal = item.price * quantity

        },
        updateDiscount: (cart, {payload: discount}: { payload: { percent?: number, fixed?: number } }) => {
            cart.discount = discount
            cart.cartDiscount = calculateDiscount(cart)
        },
        removeFromCart: (cart, {payload: item}: { payload: Product }) => {
            const existingItem = cart.items.find((i) => i.id === item.id)
            if (!existingItem) return
            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1
                existingItem.subtotal -= item.price
            } else {
                cart.items = cart.items.filter((i) => i.id !== item.id)
            }

            cart.totalItems -= 1
            cart.subtotal -= item.price
            cart.cartDiscount = calculateDiscount(cart)
            cart.shipping = (item.shippingFee ?? 0) + (cart.shipping ?? 0)
            cart.total = calculateCartTotal(cart)
        },
        deleteFromCart: (cart, {payload: item}: { payload: Product }) => {
            const existingItem = cart.items.find((i) => i.id === item.id)
            if (!existingItem) return
            cart.items = cart.items.filter((i) => i.id !== item.id)
            cart.totalItems -= existingItem.quantity
            cart.subtotal -= existingItem.subtotal
            cart.cartDiscount = calculateDiscount(cart)
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

export const {addToCart, removeFromCart, deleteFromCart, updateCart, clearCart, updateDiscount, } = cartSlice.actions
export default cartSlice.reducer
