import {createSlice} from '@reduxjs/toolkit'
import {BaseUser} from '@/types'

type AuthState = {
    isAuthenticated: boolean
    isSeller: boolean
    user: BaseUser | undefined
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        isSeller: false,
        user: undefined
    } as AuthState,
    reducers: {
        login(state, {payload: user}: { payload: BaseUser }) {
            state.isAuthenticated = true
            if (user.role === 'seller') {
                state.isSeller = true
            }
            state.user = user
        },
        logout(state) {
            state.isSeller = false
            state.isAuthenticated = false
            state.user = {} as BaseUser
        },
        loadAuthState(_, {payload}: { payload: AuthState}) {
            return payload
        }
    }
})

export default authSlice.reducer
export const {login: loginAction, logout: logoutAction, loadAuthState} = authSlice.actions
