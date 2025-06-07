import api from '@/api/index.ts'

const getOrders = async () => {
    const response = await api.get('/orders')
    return response.data.data
}

const getOrder = async (id: string) => {
    const response = await api.get(`/orders/${id}`)
    return response.data.data
}

const getOrdersByCustomer = async (customerId: string) => {
    const response = await api.get(`/orders/customer/${customerId}`)
    return response.data.data
}

export {
    getOrders,
    getOrder,
    getOrdersByCustomer
}
