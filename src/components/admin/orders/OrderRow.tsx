import {Checkbox} from '@/components/ui/checkbox.tsx'
import PaymentStatusBadge from '@/components/admin/orders/PaymentStatusBadge.tsx'
import FulfillmentStatusBadge from '@/components/admin/orders/FulfillmentStatusBadge.tsx'
import {Order} from '@/types/customer'
import {formatDate} from '@/lib/utils/time.ts'
import {FC} from 'react'

type OrderRowProps = {
    order: Order,
    selectedOrders: string[],
    onSelectOrder: (orderId: string) => void
}

const OrderRow: FC<OrderRowProps> =
    ({order, selectedOrders, onSelectOrder}) =>
        (
            <tr key={order._id} className="cursor-pointer hover:bg-gray-50">
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
                        {order.customerName}
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
                {/*<td className="px-4 py-3">*/}
                {/*    <div className="flex items-center gap-2">*/}
                {/*        <Button variant="ghost" size="icon" className="size-8">*/}
                {/*            <Eye className="size-4"/>*/}
                {/*            /!*todo: add order link*!/*/}
                {/*            <span className="sr-only">*/}
                {/*                        View Order*/}
                {/*                    </span>*/}
                {/*        </Button>*/}
                {/*        <DropdownMenu>*/}
                {/*            <DropdownMenuTrigger asChild>*/}
                {/*                <Button variant="ghost" size="icon" className="size-8">*/}
                {/*                    <MoreHorizontal className="size-4"/>*/}
                {/*                    <span className="sr-only">*/}
                {/*                                More Options*/}
                {/*                            </span>*/}
                {/*                </Button>*/}
                {/*            </DropdownMenuTrigger>*/}
                {/*            <DropdownMenuContent align="end">*/}
                {/*                <DropdownMenuItem>View Details</DropdownMenuItem>*/}
                {/*                <DropdownMenuItem>Update Status</DropdownMenuItem>*/}
                {/*                <DropdownMenuItem>Contact Customer</DropdownMenuItem>*/}
                {/*                <DropdownMenuItem>Print Invoice</DropdownMenuItem>*/}
                {/*            </DropdownMenuContent>*/}
                {/*        </DropdownMenu>*/}
                {/*    </div>*/}
                {/*</td>*/}
            </tr>
        )

export default OrderRow
