import {createSlice} from '@reduxjs/toolkit'
import {Product} from '@/types'

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: [] as Product[],
    reducers: {
        addToWishlist(wishlist, {payload}: { payload: Product }) {
            if (wishlist.some(item => item._id === payload._id)) return
            wishlist.push(payload)
        },
        removeFromWishlist(wishlist, {payload}: { payload: Product }) {
            const index = wishlist.findIndex(item => item._id === payload._id)
            wishlist.splice(index, 1)
        },
        clearWishlist(wishlist) {
            wishlist.splice(0, wishlist.length)
        },
        loadWishlist: (_, {payload: wishlist}: { payload: Product[] }) => wishlist
    }
})

export const {addToWishlist, removeFromWishlist, clearWishlist, loadWishlist} = wishlistSlice.actions
export default wishlistSlice.reducer
