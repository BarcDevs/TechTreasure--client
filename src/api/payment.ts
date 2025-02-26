import api from '@/api/index.ts'

export const getPaymentSecret = async () => {
    const response = await api.get(`/payment/secret`)
    return response.data.data.secret
}
