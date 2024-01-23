import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {isAuthenticated: false, isSeller: false},
    reducers: {
        login(state) {
            state.isAuthenticated = true
        },
        loginAsSeller(state){
            state.isSeller = true
            state.isAuthenticated = true
        },
        logout(state) {
            state.isSeller = false
            state.isAuthenticated = false
        }
    }
})

export default authSlice.reducer
export const authActions = authSlice.actions
