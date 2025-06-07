import {createSlice} from '@reduxjs/toolkit'
import {Cart, CartItem, ItemVariant, Product} from '@/types'

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
        coupons: [] as string[],
        discount: 0,
        cartDiscount: 0,
        total: 0
    } as Cart,
    reducers: {
        addToCart: (cart, {payload: {item, quantity = 1, variant}}:
        { payload: { item: Product, quantity?: number, variant?: ItemVariant } }) => {
            const existingItem = cart.items.find((i) => i._id === item._id)
            if (existingItem) {
                existingItem.quantity += quantity
                existingItem.subtotal += item.price
                existingItem.itemVariants = variant ?
                    [...(existingItem.itemVariants ?? []), ...(new Array(quantity)).fill(variant)] :
                    existingItem.itemVariants
            } else {
                cart.items.push({
                    ...item,
                    quantity,
                    subtotal: item.price,
                    itemVariants: variant ? new Array(quantity).fill(variant) : undefined
                })
            }

            cart.totalItems += 1
            cart.subtotal += item.price
            cart.coupons = []
            cart.cartDiscount = calculateDiscount(cart)
            cart.shipping = (item.shippingFee ?? 0) + (cart.shipping ?? 0)
            cart.total = calculateCartTotal(cart)
        },
        updateCart: (cart, {payload}: { payload: { item: Product, quantity: number } }) => {
            const {item, quantity} = payload
            if (quantity === 0) deleteFromCart(item)

            const existingItem = cart.items.find((i) => i._id === item._id)
            if (!existingItem) return

            cart.totalItems += (quantity - existingItem.quantity)
            cart.subtotal += (item.price * quantity) - existingItem.subtotal
            cart.cartDiscount = calculateDiscount(cart)
            cart.shipping = (item.shippingFee ?? 0) * (quantity - existingItem.quantity) + (cart.shipping ?? 0)
            cart.total = calculateCartTotal(cart)

            existingItem.quantity = quantity
            existingItem.subtotal = item.price * quantity

        },
        updateCoupons: (cart, {payload: coupons}: { payload: string[] }) => {
            console.log(coupons, 'coupons')
            cart.coupons = coupons
        },
        updateDiscount: (cart, {payload: discount}: { payload: { percent?: number, fixed?: number } }) => {
            cart.discount = discount
            cart.cartDiscount = calculateDiscount(cart)
            cart.total = calculateCartTotal(cart)
        },
        removeFromCart: (cart, {payload: item}: { payload: Product }) => {
            const existingItem = cart.items.find((i) => i._id === item._id)
            if (!existingItem) return
            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1
                existingItem.subtotal -= item.price
            } else {
                cart.items = cart.items.filter((i) => i._id !== item._id)
            }

            cart.totalItems -= 1
            cart.subtotal -= item.price
            cart.cartDiscount = calculateDiscount(cart)
            cart.shipping = (item.shippingFee ?? 0) + (cart.shipping ?? 0)
            cart.total = calculateCartTotal(cart)
        },
        deleteFromCart: (cart, {payload: item}: { payload: Product }) => {
            const existingItem = cart.items.find((i) => i._id === item._id)
            if (!existingItem) return
            cart.items = cart.items.filter((i) => i._id !== item._id)
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

            localStorage.removeItem('cart')
        },
        loadCart: (_, {payload: cart}: { payload: Cart }) => cart
    }
})

export const {
    addToCart,
    removeFromCart,
    deleteFromCart,
    updateCart,
    clearCart,
    updateCoupons,
    updateDiscount,
    loadCart
} = cartSlice.actions

export default cartSlice.reducer
