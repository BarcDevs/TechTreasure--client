import {configureStore} from '@reduxjs/toolkit'
import cartSlice from '@/store/cartSlice.ts'
import wishlistSlice from '@/store/wishlistSlice.ts'
import authSlice from '@/store/authSlice.ts'

const store = configureStore({
    reducer: {
        cart: cartSlice,
        wishlist: wishlistSlice,
        auth: authSlice
    }
})

export default store
export type IRootState = ReturnType<typeof store.getState>
