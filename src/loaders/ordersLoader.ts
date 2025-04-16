import {getOrders} from '@/api/admin.ts'
import {Order} from '@/types/customer'

const ordersLoader = async (): Promise<Order[]> => {
    try {
        return await getOrders()
    } catch (error) {
        throw new Response('Failed to fetch orders', {status: 500})
    }
}

export default ordersLoader
