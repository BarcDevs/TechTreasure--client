import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {ArrowDown, ArrowUp} from 'lucide-react'
import {formatPercentage} from '@/lib/utils/format'
import OrderStatusBar from './OrderStatusBar'
import {useLoaderData} from 'react-router-dom'

const TotalOrdersCard = () => {
    const {orders} = useLoaderData() as Analytics

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                    Total Orders
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">
                        {orders.total}
                    </span>
                    <span className={`flex items-center text-xs ${
                        orders.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                        {orders.trend === 'up' ? (
                            <ArrowUp className="mr-1 size-3"/>
                        ) : (
                            <ArrowDown className="mr-1 size-3"/>
                        )}
                        {formatPercentage(orders.change)}
                    </span>
                </div>
                <div className="mt-4 space-y-2">
                    <OrderStatusBar
                        label="Completed"
                        value={orders.completed}
                        total={orders.total}
                        color="primary"
                    />
                    <OrderStatusBar
                        label="Pending"
                        value={orders.pending}
                        total={orders.total}
                        color="amber-400"
                    />
                    <OrderStatusBar
                        label="Canceled"
                        value={orders.canceled}
                        total={orders.total}
                        color="red-400"
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default TotalOrdersCard
