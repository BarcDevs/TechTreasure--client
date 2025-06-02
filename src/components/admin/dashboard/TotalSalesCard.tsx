import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs.tsx'
import {TrendingDown, TrendingUp} from 'lucide-react'
import {useState} from 'react'
import {useLoaderData} from 'react-router-dom'

const TotalSalesCard = ({}) => {
    const {sales} = useLoaderData() as { sales: Sales[] }
    const [orderTimeframe, setOrderTimeframe] = useState<Timeframe>('today')

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                    Total Sales
                </CardTitle>
                <Tabs
                    defaultValue={orderTimeframe}
                    className="w-[180px]"
                    onValueChange={(timeframe) => setOrderTimeframe(timeframe as Timeframe)}
                >
                    <TabsList className="grid h-7 grid-cols-3">
                        {['today', 'week', 'month'].map((timeframe) => (
                            <TabsTrigger
                                value={timeframe}
                                className="text-xs capitalize"
                            >
                                {timeframe}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold">
                      {/*@ts-ignore*/}
                      {sales[orderTimeframe].total}
                  </span>
                    <span className="flex items-center text-xs text-green-500">
                      {/*@ts-ignore*/}
                        {sales[orderTimeframe].change > 0 ?
                            <TrendingUp className="mr-1 size-3"/> :
                            <TrendingDown className="mr-1 size-3"/>}
                        {/*@ts-ignore*/}
                        {sales[orderTimeframe].change}%
                  </span>
                </div>
            </CardContent>
        </Card>
    )
}

export default TotalSalesCard
