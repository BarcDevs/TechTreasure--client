import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import {Link, useLoaderData} from 'react-router-dom'
import {Order} from '@/types/customer'
import {Button} from '@/components/ui/button.tsx'

const OrderStatusCard = ({}) => {
    const {orders} = useLoaderData() as { orders: Order[] }

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                    Orders
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="text-center">
                        <div className="text-xl font-bold">
                            {orders.filter(order => order.status === 'pending').length}
                        </div>
                        <div className="text-xs text-gray-500">
                            Pending
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold">
                            {orders.filter(
                                order => order.status !== 'completed' &&
                                    order.status !== 'pending').length}
                        </div>
                        <div className="text-xs text-gray-500">
                            Processing
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold">
                            {orders.filter(order => order.status === 'completed').length}
                        </div>
                        <div className="text-xs text-gray-500">
                            Completed
                        </div>
                    </div>
                </div>

                <Button variant="link" className="mt-2 h-auto p-0 text-xs">
                    <Link to={'/admin/orders'}>
                        View Orders
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}

export default OrderStatusCard
