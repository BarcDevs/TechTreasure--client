import storage from 'redux-persist/lib/storage'
import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {persistReducer, persistStore} from 'redux-persist'

import cartSlice from '@/store/cartSlice'
import wishlistSlice from '@/store/wishlistSlice'
import authSlice from '@/store/authSlice'
import checkoutSlice from '@/store/checkoutSlice'
import orderDetailsSlice from '@/store/orderDetailsSlice'

const rootReducer = combineReducers({
    cart: cartSlice,
    wishlist: wishlistSlice,
    auth: authSlice,
    checkout: checkoutSlice,
    orderDetails: orderDetailsSlice
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['orderDetails', 'auth', 'cart', 'checkout']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

const persistor = persistStore(store)

export {store, persistor}
export type IRootState = ReturnType<typeof store.getState>
