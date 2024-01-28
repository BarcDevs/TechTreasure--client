import {createSlice} from '@reduxjs/toolkit'
import {User} from '@/types'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        isSeller: false,
        user: {} as User
    },
    reducers: {
        login(state, {payload: user}: { payload: User }) {
            state.isAuthenticated = true
            if (user.role === 'seller') {
                state.isSeller = true
            }
            state.user = user
        },
        logout(state) {
            state.isSeller = false
            state.isAuthenticated = false
            state.user = {} as User
        }
    }
})

export default authSlice.reducer
export const {login: loginAction, logout: logoutAction} = authSlice.actions
