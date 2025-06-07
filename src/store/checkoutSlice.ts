import {createSlice} from '@reduxjs/toolkit'
import {CheckoutForm as UserInfo} from '@/validations/checkoutForm.ts'

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        name: '',
        company: '',
        address: '',
        additional_address: '',
        city: '',
        country: '',
        postcode: '',
        phone: '',
        email: ''
    } as UserInfo,
    reducers: {
        updateUserInfo(state, {payload}: { payload: UserInfo }) {
            state.name = payload.name
            state.company = payload.company
            state.address = payload.address
            state.additional_address = payload.additional_address
            state.city = payload.city
            state.country = payload.country
            state.postcode = payload.postcode
            state.phone = payload.phone
            state.email = payload.email
        },
        resetUserInfo(state) {
            state.name = ''
            state.company = ''
            state.address = ''
            state.additional_address = ''
            state.city = ''
            state.country = ''
            state.postcode = ''
            state.phone = ''
            state.email = ''
        }
    }
})

export default checkoutSlice.reducer
export const {
    updateUserInfo,
    resetUserInfo
} = checkoutSlice.actions
