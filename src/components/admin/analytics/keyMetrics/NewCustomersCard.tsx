import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"
import { formatPercentage } from "@/lib/utils/format"
import CustomerMetricBox from "./CustomerMetricBox"
import { customersData } from "@/mock/analytics"

const NewCustomersCard = () => (
    <Card>
        <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
                New Customers
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">
                    {customersData.total}
                </span>
                <span className={`flex items-center text-xs ${
                    customersData.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                    {customersData.trend === 'up' ? (
                        <ArrowUp className="mr-1 size-3" />
                    ) : (
                        <ArrowDown className="mr-1 size-3" />
                    )}
                    {formatPercentage(customersData.growth)}
                </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <CustomerMetricBox label="Today" value={customersData.new.daily} />
                <CustomerMetricBox label="This Week" value={customersData.new.weekly} />
                <CustomerMetricBox label="This Month" value={customersData.new.monthly} />
            </div>
        </CardContent>
    </Card>
)

export default NewCustomersCard
