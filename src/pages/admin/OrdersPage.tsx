import {useEffect, useState} from 'react'
import {useLoaderData} from 'react-router-dom'
import FilterBar from '@/components/admin/orders/FilterBar'
import OrderStatusTabs from '@/components/admin/orders/OrderStatusTabs'
import PaginationControls from '@/components/admin/orders/PaginationControls'
import PageHeader from '@/components/admin/layout/PageHeader.tsx'
import {Order} from '@/types/customer'

const getFilteredOrders = (
    orders: Order[] | undefined,
    activeTab: string,
    searchQuery: string
): Order[] => {
    if (!orders) return []

    return orders.filter((order) => {
        const statusMatch = activeTab === 'all' || order.status === activeTab

        const searchMatch = searchQuery
            ? [order._id, order.customer, order.email].some((field) =>
                field.toLowerCase().includes(searchQuery.toLowerCase())
            )
            : true

        return statusMatch && searchMatch
    })
}

const OrdersPage = () => {
    const orders = useLoaderData() as Order[]
    const [activeTab, setActiveTab] = useState('all')
    const [selectedOrders, setSelectedOrders] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([])

    useEffect(() => {
        orders && orders ?
            setFilteredOrders(getFilteredOrders(orders, activeTab, searchQuery)) :
            setFilteredOrders([])
    }, [activeTab, searchQuery, orders])

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
                <PageHeader
                    title={'Orders'}
                    subtitle={'Manage and process your store orders'}
                />

                <FilterBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedOrders={selectedOrders}
                />

                {filteredOrders && (
                    <OrderStatusTabs
                        filteredOrders={filteredOrders}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        selectedOrders={selectedOrders}
                        setSelectedOrders={setSelectedOrders}
                    />
                )}

                {filteredOrders && (
                    <PaginationControls
                        totalItems={filteredOrders.length}
                        itemsPerPage={10}
                        currentPage={1}
                    />
                )}
            </div>
        </div>
    )
}

export default OrdersPage
