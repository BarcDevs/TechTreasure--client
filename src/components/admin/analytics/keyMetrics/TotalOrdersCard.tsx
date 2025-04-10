import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"
import { formatPercentage } from "@/lib/utils/format"
import OrderStatusBar from "./OrderStatusBar"
import { ordersData } from "@/mock/analytics"

const TotalOrdersCard = () => (
    <Card>
        <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
                Total Orders
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">
                    {ordersData.total}
                </span>
                <span className={`flex items-center text-xs ${
                    ordersData.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                    {ordersData.trend === 'up' ? (
                        <ArrowUp className="mr-1 size-3" />
                    ) : (
                        <ArrowDown className="mr-1 size-3" />
                    )}
                    {formatPercentage(ordersData.change)}
                </span>
            </div>
            <div className="mt-4 space-y-2">
                <OrderStatusBar label="Completed" value={ordersData.completed} total={ordersData.total} color="primary" />
                <OrderStatusBar label="Pending" value={ordersData.pending} total={ordersData.total} color="amber-400" />
                <OrderStatusBar label="Canceled" value={ordersData.canceled} total={ordersData.total} color="red-400" />
            </div>
        </CardContent>
    </Card>
)

export default TotalOrdersCard
