import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"
import { formatPercentage } from "@/lib/utils/format"
import CustomerMetricBox from "./CustomerMetricBox"
import {useLoaderData} from 'react-router-dom'

const NewCustomersCard = () => {
    const {customers} = useLoaderData() as Analytics

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                    New Customers
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">
                        {customers.total}
                    </span>
                    <span className={`flex items-center text-xs ${
                        customers.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                        {customers.trend === 'up' ? (
                            <ArrowUp className="mr-1 size-3"/>
                        ) : (
                            <ArrowDown className="mr-1 size-3"/>
                        )}
                        {formatPercentage(customers.growth)}
                    </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <CustomerMetricBox label="Today" value={customers.new.daily}/>
                    <CustomerMetricBox label="This Week" value={customers.new.weekly}/>
                    <CustomerMetricBox label="This Month" value={customers.new.monthly}/>
                </div>
            </CardContent>
        </Card>
    )
}

export default NewCustomersCard
