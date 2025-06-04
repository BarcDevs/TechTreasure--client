import api from '@/api/index.ts'
import {Inquiry} from '@/types/customer'

const getCustomers = async () => {
    const response = await api.get('/admin/customers')
    return response.data.data
}

const getCustomer = async (id: string) => {
    const response = await api.get(`/admin/customers/${id}`)
    return response.data.data
}

const getOrders = async () => {
    const response = await api.get('/admin/orders')
    return response.data.data
}

const getOrder = async (id: string) => {
    const response = await api.get(`/admin/orders/${id}`)
    return response.data.data
}

const getOrdersByCustomer = async (customerId: string) => {
    const response = await api.get(`/admin/orders/customer/${customerId}`)
    return response.data.data
}

const getAnalytics = async () => {
    const response = await api.get('/admin/analytics')
    return response.data.data[0]
}

const getStoreStats = async (): Promise<StoreStats> => {
    const response = await api.get('/admin/stats')
    return response.data.data
}

const getInquiries = async () => {
    const response = await api.get('/admin/inquiries')
    return response.data.data
}

const updateInquiry = async (inquiry: Inquiry) => {
    const response = await api.post(`/admin/inquiries/${inquiry._id}/update`, inquiry)
    return response.data.data
}

export {
    getCustomers,
    getCustomer,
    getOrders,
    getOrder,
    getOrdersByCustomer,
    getAnalytics,
    getStoreStats,
    getInquiries,
    updateInquiry
}
