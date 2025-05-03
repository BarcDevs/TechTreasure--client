import {useEffect, useState} from 'react'
import {useLoaderData} from 'react-router-dom'
import {Bar, BarChart, CartesianGrid, XAxis} from 'recharts'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from '@/components/ui/chart'
import {formatCurrency} from '@/lib/utils/format'
import {generateChartData} from '@/components/admin/analytics/keyMetrics/generateChartData.ts'
import TrendIndicator from '@/components/admin/analytics/keyMetrics/TrendIndicator.tsx'

const chartConfig = {
    sales: {
        label: 'Sales',
        color: '#3b82f6'
    }
} satisfies ChartConfig

const TotalSalesCard = () => {
    const {sales} = useLoaderData() as Analytics

    const [salesTimeframe, setSalesTimeframe] = useState<Timeframe>('week')
    const [totalSales, setTotalSales] = useState<number>(0)

    const setTimeframe = (timeframe: string) => {
        setSalesTimeframe(timeframe as Timeframe)
    }

    const currentData = generateChartData(sales[salesTimeframe])

    useEffect(() => {
        // get the sum of all sales of a timeframe
        const salesData = Object.values(sales[salesTimeframe].value) as unknown as ValueEntry[]

        setTotalSales(salesData.reduce(
            (sum, entry) => sum + entry.amount,
            0
        ))
    }, [salesTimeframe])

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                    Total Sales ($)
                </CardTitle>
                <Tabs
                    defaultValue={salesTimeframe}
                    onValueChange={setTimeframe}
                    className="w-[180px]"
                >
                    <TabsList className="grid h-7 grid-cols-3">
                        {['today', 'week', 'month'].map((timeframe) => (
                            <TabsTrigger
                                key={timeframe}
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
                <div className="mt-4 flex items-baseline space-x-2">
          <span className="text-2xl font-bold">
            {formatCurrency(totalSales)}
          </span>
                    <TrendIndicator
                        trend={sales[salesTimeframe].trend}
                        change={sales[salesTimeframe].change}
                    />
                </div>

                <div className="mt-8">
                    <ChartContainer config={chartConfig}>
                        <BarChart
                            accessibilityLayer
                            data={currentData}
                            margin={{
                                top: 20,
                                bottom: 10
                            }}
                            height={120}
                        >
                            <CartesianGrid vertical={false}/>
                            <XAxis
                                dataKey="period"
                                tickLine={false}
                                tickMargin={8}
                                axisLine={false}
                                fontSize={10}
                            />
                            <ChartTooltip
                                cursor={true}
                                content={<ChartTooltipContent
                                    className={'capitalize'}
                                    hideLabel
                                />}
                            />
                            <Bar
                                dataKey="sales"
                                fill="var(--color-sales)"
                                radius={4}
                            >
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export default TotalSalesCard
