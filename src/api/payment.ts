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

type StripePayload = {
    stripe: Stripe,
    elements: StripeElements,
    confirmParams: ConfirmPaymentData,
}

export const confirmPayment =
    async (
        {stripe, elements, confirmParams}: StripePayload) => {
        return await stripe.confirmPayment({
            elements,
            confirmParams
        })
    }

export const completeOrder = async (
    orderId: string,
    amount: number,
    items: Cart['items'],
    customerDetails: CustomerDetails) => {
    const res = await api.post('/payment/complete', {
        orderId,
        amount,
        items,
        customerDetails
    })

    return res.data.data
}
