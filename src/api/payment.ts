import api from '@/api/index.ts'
import {Cart} from '@/types'
import {ConfirmPaymentData, Stripe, StripeElements} from '@stripe/stripe-js'
import {CustomerDetails} from '@/types/order'

export const getPaymentSecret = async (amount: number) => {
    const response = await api.post('/payment/secret', {
        amount
    })

    return response.data.data.secret
}
