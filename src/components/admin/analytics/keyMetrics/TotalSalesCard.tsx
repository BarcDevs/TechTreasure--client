import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {formatCurrency, formatPercentage} from '@/lib/utils/format.ts'
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs.tsx'
import {ArrowDown, ArrowUp} from 'lucide-react'
import {useState} from 'react'
import {useLoaderData} from 'react-router-dom'

const TotalSalesCard = () => {
    const {sales} = useLoaderData() as Analytics

    const [salesTimeframe, setSalesTimeframe] = useState<'today' | 'week' | 'month'>('week')
    const setTimeframe = (timeframe: string) => {
        setSalesTimeframe(timeframe as 'today' | 'week' | 'month')
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                    Total Sales
                </CardTitle>
                <Tabs
                    defaultValue={salesTimeframe}
                    onValueChange={setTimeframe}
                    className="w-[180px]">
                    <TabsList className="grid h-7 grid-cols-3">
                        <TabsTrigger value="today" className="text-xs">Today</TabsTrigger>
                        <TabsTrigger value="week" className="text-xs">Week</TabsTrigger>
                        <TabsTrigger value="month" className="text-xs">Month</TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">
                        {formatCurrency(sales[salesTimeframe].value)}
                    </span>
                    <span className={`flex items-center text-xs ${
                        sales[salesTimeframe].trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                        {sales[salesTimeframe].trend === 'up' ? (
                            <ArrowUp className="mr-1 size-3"/>
                        ) : (
                            <ArrowDown className="mr-1 size-3"/>
                        )}
                        {formatPercentage(sales[salesTimeframe].change)}
                    </span>
                </div>
                <div className="mt-4">
                    <div className="h-[40px] w-full">
                        <div className="flex h-full items-end space-x-1">
                            {Array.from({length: 12}).map((_, i) => (
                                <div
                                    key={i}
                                    className="w-full rounded-sm bg-primary/20"
                                    style={{
                                        height: `${Math.max(15, Math.floor(Math.random() * 100))}%`,
                                        backgroundColor: i === 8 ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.2)'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default TotalSalesCard
