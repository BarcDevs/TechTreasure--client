import {Badge} from '@/components/ui/badge.tsx'
import {timeSince} from '@/lib/utils/time.ts'
import {FC} from 'react'
import {Order} from '@/types/customer'

const OrderRow: FC<{ order: Order }> = ({order}) =>
    (
        <div key={order._id}
             className="flex items-center justify-between rounded-lg border p-3">
            <div>
                <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                                {order._id}
                                            </span>
                    <Badge
                        variant={
                            order.status === 'pending'
                                ? 'outline'
                                : order.status === 'processing'
                                    ? 'secondary'
                                    : 'default'
                        }
                    >
                        {order.status}
                    </Badge>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                    {order.customerName} • {order.total}
                </div>
                <div className="mt-1 text-xs text-gray-400">
                    {timeSince(order.date)} ago
                </div>
            </div>
            {/*<div className="flex gap-2">*/}
            {/*    {order.status === 'pending' && (*/}
            {/*        <>*/}
            {/*            <Button size="sm" variant="outline" className="size-8 p-0">*/}
            {/*                <CheckCircle className="size-4"/>*/}
            {/*                <span className="sr-only">*/}
            {/*                                                    Accept*/}
            {/*                                                </span>*/}
            {/*            </Button>*/}
            {/*            <Button size="sm" variant="outline" className="size-8 p-0">*/}
            {/*                <XCircle className="size-4"/>*/}
            {/*                <span className="sr-only">*/}
            {/*                                                    Reject*/}
            {/*                                                </span>*/}
            {/*            </Button>*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*    {order.status === 'processing' && (*/}
            {/*        <Button size="sm" variant="outline" className="size-8 p-0">*/}
            {/*            <CheckCircle className="size-4"/>*/}
            {/*            <span className="sr-only">*/}
            {/*                                                Complete*/}
            {/*                                            </span>*/}
            {/*        </Button>*/}
            {/*    )}*/}
            {/*    <Button size="sm" variant="outline" className="size-8 p-0">*/}
            {/*        <Clock className="size-4"/>*/}
            {/*        <span className="sr-only">*/}
            {/*                                            View Details*/}
            {/*                                        </span>*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </div>

    )

export default OrderRow
