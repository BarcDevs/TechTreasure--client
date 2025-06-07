import {Order} from '@/types/customer'
import {getOrders} from '@/api/orders.ts'

const ordersLoader = async (): Promise<Order[]> => {
    try {
        return await getOrders()
    } catch (error) {
        throw new Response('Failed to fetch orders', {status: 500})
    }
}

export default ordersLoader
