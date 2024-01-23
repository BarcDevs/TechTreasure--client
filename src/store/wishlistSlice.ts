import {createSlice} from '@reduxjs/toolkit'
import {Product} from '@/types'

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: [] as Product[],
    reducers: {
        addToWishlist(wishlist, {payload}: { payload: Product }) {
            if (wishlist.some(item => item.id === payload.id)) return
            wishlist.push(payload)
        },
        removeFromWishlist(wishlist, {payload}: { payload: Product }) {
            const index = wishlist.findIndex(item => item.id === payload.id)
            wishlist.splice(index, 1)
        },
        clearWishlist(wishlist) {
            wishlist.splice(0, wishlist.length)
        }
    }
})

export const {addToWishlist, removeFromWishlist, clearWishlist} = wishlistSlice.actions
export default wishlistSlice.reducer
