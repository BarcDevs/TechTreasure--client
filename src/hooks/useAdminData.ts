import {useQuery} from '@tanstack/react-query'
import {getAnalytics, getCustomer, getCustomers} from '@/api/admin.ts'
import {Customer, Order} from '@/types/customer'
import {getOrder, getOrders} from '@/api/orders.ts'

type AdminData = {
    customerId?: string | null
    orderId?: string | null
}

export const useAdminData = ({customerId = null, orderId = null}: AdminData) => {
    const {data: customers} = useQuery<{
        customers: Customer[],
        totalPages: number
    }>({
        queryKey: ['customers', customerId ? customerId : null],
        queryFn: () => customerId ? getCustomer(customerId) : getCustomers(),
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000
    })

    const {data: orders} = useQuery<{
        orders: Order[],
        totalPages: number
    }>({
        queryKey: ['orders', orderId ? orderId : null],
        queryFn: () => orderId ? getOrder(orderId) : getOrders(),
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000
    })

    const {data: analytics} = useQuery<Analytics>({
        queryKey: ['analytics'],
        queryFn: () => getAnalytics(),
        refetchOnWindowFocus: false,
        staleTime: 12 * 60 * 1000
    })

    return {
        customers,
        orders,
        analytics
    }
}
