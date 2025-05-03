import {useState} from 'react'
import {useLoaderData} from 'react-router-dom'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts'
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from '@/components/ui/chart'
import SalesTrendIndicator from '@/components/admin/analytics/salesPerformance/SalesTrendIndicator.tsx'
import {generateChartData} from '@/components/admin/analytics/salesPerformance/generateChartData.ts'
import {tooltipTimeFormatter} from '@/lib/utils/tooltipTimeFormatter.ts'

const chartColor = '#3b82f6' // Tailwind blue-500
const chartConfig = {
    sales: {
        label: 'Sales',
        color: chartColor
    }
} satisfies ChartConfig

const SalesTrendsCard = () => {
    const {sales} = useLoaderData() as Analytics

    const [salesTimeframe, setSalesTimeframe] = useState<Timeframe>('week')

    const salesData = sales[salesTimeframe]

    const chartData = generateChartData(salesData, salesTimeframe)

    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                        Sales Trends
                    </CardTitle>
                    <SalesTrendIndicator
                        trend={salesData.trend}
                        change={salesData.change}
                    />
                    <Select
                        value={salesTimeframe}
                        onValueChange={(val) =>
                            setSalesTimeframe(val as Timeframe)
                        }
                    >
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Period"/>
                        </SelectTrigger>
                        <SelectContent>
                            {['Today', 'Week', 'Month'].map((timeframe) => {
                                const value = timeframe.toLowerCase()
                                return (
                                    <SelectItem
                                        key={value}
                                        value={value}
                                        className="cursor-pointer capitalize"
                                    >
                                        {timeframe}
                                    </SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ChartContainer config={chartConfig}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={chartData}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: 0,
                                    bottom: 20
                                }}
                            >
                                <CartesianGrid
                                    vertical={false}
                                    stroke="#e5e7eb" // Tailwind gray-200
                                />
                                <XAxis
                                    dataKey="period"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={10}
                                    tick={{fontSize: 12}}
                                />
                                <YAxis
                                    hide
                                />
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent
                                            className="w-[150px]"
                                            nameKey="sales"
                                            labelFormatter={(value) =>
                                                tooltipTimeFormatter(value, salesTimeframe, '/04/2025')
                                            }
                                        />
                                    }
                                />
                                <Line
                                    type="monotone"
                                    dataKey="sales"
                                    stroke={chartColor}
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{
                                        r: 6,
                                        fill: chartColor,
                                        strokeWidth: 2,
                                        stroke: '#ffffff'
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export default SalesTrendsCard
