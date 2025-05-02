import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from '@/components/ui/chart'

import {Pie, PieChart} from 'recharts'

import CustomerSegment from '@/components/admin/analytics/customerInsights/CustomerSegment'

import {useLoaderData} from 'react-router-dom'

const CustomerRetentionCard = () => {
    const {customerRetention} = useLoaderData() as Analytics
    const totalCustomers = customerRetention.new + customerRetention.returning

    const colorScheme = {
        new: 'var(--destructive)',
        returning: 'var(--destructive)/0.3'
    }

    const chartData = [
        {
            type: 'new',
            value: customerRetention.new,
            fill: `hsl(${colorScheme.new})`
        },
        {
            type: 'returning',
            value: customerRetention.returning,
            fill: `hsl(${colorScheme.returning})`
        }
    ]

    const chartConfig = {
        new: {
            label: 'New',
            color: `hsl(${colorScheme.new})`
        },
        returning: {
            label: 'Returning',
            color: `hsl(${colorScheme.returning})`
        }
    }

    return (
        <Card>
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-base">
                    New vs Returning Customers
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent hideLabel/>
                            }
                        />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="type"
                            cx="50%"
                            cy="50%"
                            outerRadius="100%"
                            stroke="none"
                        />
                    </PieChart>
                </ChartContainer>
                <div className="mt-4 flex justify-center gap-6">
                    <CustomerSegment
                        color={'red-300'}
                        label="Returning"
                        percentage={Math.round((customerRetention.returning / totalCustomers) * 100)}
                    />
                    <CustomerSegment
                        color={'destructive'}
                        label="New"
                        percentage={Math.round((customerRetention.new / totalCustomers) * 100)}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default CustomerRetentionCard
