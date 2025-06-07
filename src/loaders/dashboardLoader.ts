import {getAnalytics, getInquiries} from '@/api/admin.ts'
import {Inquiry, Order} from '@/types/customer'
import {getProducts} from '@/api/products.ts'
import {Product} from '@/types'
import {getOrders} from '@/api/orders.ts'

const dashboardLoader = async (): Promise<{
    orders: Order[],
    products: Product[],
    sales: Sales,
    inquiries: Inquiry[]
}> => {
    try {
        const orders = await getOrders()
        const {products} = await getProducts()
        const analytics = await getAnalytics() as Analytics
        const inquiries = await getInquiries()
        const {sales} = analytics

        return {
            orders,
            products,
            sales,
            inquiries
        }
    } catch (error) {
        throw new Response('Failed to fetch data', {status: 500})
    }
}

export default dashboardLoader
