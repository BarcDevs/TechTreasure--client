import {FC, useEffect, useState} from 'react'
import {Order} from '@/types/customer'
import {Checkbox} from '@/components/ui/checkbox.tsx'
import OrderRow from '@/components/admin/orders/OrderRow.tsx'
import SortButton from '@/components/admin/SortButton.tsx'

type OrdersTableProps = {
    orders: Order[]
    selectedOrders: string[]
    onSelectAll: () => void
    onSelectOrder: (orderId: string) => void
}

const columnToPropertyMap: Record<string, keyof Order> = {
    'Customer': 'customerName',
    'Date': 'date',
    'Total': 'total'
}

const OrdersTable: FC<OrdersTableProps> =
    ({orders, selectedOrders, onSelectAll, onSelectOrder}) => {
        const [sortedOrders, setSortedOrders] = useState<Order[]>(orders)
        const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | ''>('')
        const [sortField, setSortField] = useState<string>('')

        useEffect(() => {
            setSortedOrders(orders)
        }, [orders])

        return (
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                    <tr className="border-b bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                        <th className="px-4 py-3">
                            <Checkbox
                                checked={orders.length > 0 && selectedOrders.length === orders.length}
                                onCheckedChange={onSelectAll}
                                aria-label="Select all orders"
                            />
                        </th>
                        <th className="px-4 py-3">
                            <div className="flex items-center">
                                Order ID
                            </div>
                        </th>
                        {['Customer', 'Date', 'Total'].map((label) => (
                            <SortButton
                                key={label}
                                {...{
                                    label,
                                    data: orders,
                                    setSortedData: setSortedOrders,
                                    columnToPropertyMap,
                                    setSortField,
                                    setSortDirection,
                                    sortDirection,
                                    sortField
                                }}/>
                        ))}
                        <th className="px-4 py-3">Payment</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y">
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                                No orders found
                            </td>
                        </tr>
                    ) : (
                        sortedOrders.map((order) => (
                            <OrderRow
                                key={order._id}
                                {...{order, selectedOrders, onSelectOrder}}
                            />
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        )
    }

export default OrdersTable
