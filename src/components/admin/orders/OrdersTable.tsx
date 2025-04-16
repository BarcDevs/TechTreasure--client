import {FC} from 'react'
import {Order} from '@/types/customer'
import {Checkbox} from '@/components/ui/checkbox.tsx'
import {ArrowUpDown} from 'lucide-react'
import OrderRow from '@/components/admin/orders/OrderRow.tsx'


type OrdersTableProps = {
    orders: Order[]
    selectedOrders: string[]
    onSelectAll: () => void
    onSelectOrder: (orderId: string) => void
    formatDate: (date: string) => string
}

const OrdersTable: FC<OrdersTableProps> =
    ({orders, selectedOrders, onSelectAll, onSelectOrder}) => (
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
                    {['Order', 'Customer', 'Date', 'Total'].map((label) => (
                        // todo: make sort functional
                        <th className="px-4 py-3">
                            <div className="flex items-center">
                                {label}
                                <ArrowUpDown className="ml-1 size-3"/>
                            </div>
                        </th>
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
                    orders.map((order) => (
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

export default OrdersTable
