import {Order} from '@/types/customer'
import {Checkbox} from '@/components/ui/checkbox.tsx'
import {ArrowUpDown, Eye, MoreHorizontal} from 'lucide-react'
import {Button} from '@/components/ui/button.tsx'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx'
import {FC} from 'react'
import PaymentStatusBadge from '@/components/admin/orders/PaymentStatusBadge.tsx'
import FulfillmentStatusBadge from '@/components/admin/orders/FulfillmentStatusBadge.tsx'

type OrdersTableProps = {
    orders: Order[]
    selectedOrders: string[]
    onSelectAll: () => void
    onSelectOrder: (orderId: string) => void
    formatDate: (date: string) => string
}

const OrdersTable: FC<OrdersTableProps> =
    ({orders, selectedOrders, onSelectAll, onSelectOrder, formatDate}: OrdersTableProps) => (
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
                        Order
                        <ArrowUpDown className="ml-1 size-3"/>
                    </div>
                </th>
                <th className="px-4 py-3">
                    <div className="flex items-center">
                        Customer
                        <ArrowUpDown className="ml-1 size-3"/>
                    </div>
                </th>
                <th className="px-4 py-3">
                    <div className="flex items-center">
                        Date
                        <ArrowUpDown className="ml-1 size-3"/>
                    </div>
                </th>
                <th className="px-4 py-3">
                    <div className="flex items-center">
                        Total
                        <ArrowUpDown className="ml-1 size-3"/>
                    </div>
                </th>
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
                    <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                            <Checkbox
                                checked={selectedOrders.includes(order._id)}
                                onCheckedChange={() => onSelectOrder(order._id)}
                                aria-label={`Select order ${order._id}`}
                            />
                        </td>
                        <td className="px-4 py-3 font-medium">
                            {order._id}
                        </td>
                        <td className="px-4 py-3">
                            <div>
                                {order.customer}
                            </div>
                            <div className="text-xs text-gray-500">
                                {order.email}
                            </div>
                        </td>
                        <td className="px-4 py-3">
                            {formatDate(order.date)}
                        </td>
                        <td className="px-4 py-3 font-medium">
                            ${order.total.toFixed(2)}
                        </td>
                        <td className="px-4 py-3">
                            <PaymentStatusBadge status={order.payment}/>
                        </td>
                        <td className="px-4 py-3">
                            <FulfillmentStatusBadge status={order.status}/>
                        </td>
                        <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="size-8">
                                    <Eye className="size-4"/>
                                    <span className="sr-only">
                                        View Order
                                    </span>
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="size-8">
                                            <MoreHorizontal className="size-4"/>
                                            <span className="sr-only">
                                                More Options
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                                        <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                                        <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </td>
                    </tr>
                ))
            )}
            </tbody>
        </table>
    </div>
)

export default OrdersTable
