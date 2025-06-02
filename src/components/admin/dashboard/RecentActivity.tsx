import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import {Button} from '@/components/ui/button.tsx'
import {Link, useLoaderData} from 'react-router-dom'
import {Order} from '@/types/customer'
import OrderRow from '@/components/admin/dashboard/OrderRow.tsx'

const RecentActivity = ({}) => {
    const _orders = (useLoaderData() as { orders: Order[] }).orders
    const orders = _orders.slice(0, 5)

    return (
        <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Recent Activity
            </h2>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Recent Orders
                        </CardTitle>
                        <CardDescription>
                            Manage your latest orders
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <OrderRow key={order._id} order={order}/>
                            ))}
                        </div>
                        <Link to={'/admin/orders'}>
                            <Button
                                variant="link"
                                className="mt-4 px-0"
                            >
                                View All Orders
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

export default RecentActivity
