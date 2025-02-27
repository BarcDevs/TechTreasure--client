import api from '@/api/index.ts'
import {Cart} from '@/types'

export const getPaymentSecret = async (cart: Cart) => {
    const response = await api.post(`/payment/secret`, {
        amount: cart.total
    })
    return response.data.data.secret
}
