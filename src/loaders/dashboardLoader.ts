import {getAnalytics, getOrders} from '@/api/admin.ts'
import {Order} from '@/types/customer'
import {getProducts} from '@/api/products.ts'
import {Product} from '@/types'

const dashboardLoader = async (): Promise<{
    orders: Order[],
    products: Product[],
    sales: Sales
}> => {
    try {
        const orders = await getOrders()
        const {products} = await getProducts()
        const analytics = await getAnalytics() as Analytics
        const {sales} = analytics

        return {
            orders,
            products,
            sales
        }
    } catch (error) {
        throw new Response('Failed to fetch data', {status: 500})
    }
}

export default dashboardLoader
