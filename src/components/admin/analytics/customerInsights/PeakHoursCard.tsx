import { BarChart, Bar, XAxis, CartesianGrid, LabelList } from "recharts"
import { useLoaderData } from "react-router-dom"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"

const PeakHoursCard = () => {
    const { peakHours } = useLoaderData() as Analytics

    const chartConfig = {
        orders: {
            label: "Orders",
            color: "#3b82f6"
        }
    } satisfies ChartConfig

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">
                    Peak Shopping Hours
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] pt-10 align-middle">
                    <ChartContainer config={chartConfig}>
                        <BarChart
                            accessibilityLayer
                            data={peakHours}
                            margin={{
                                top: 20,
                                bottom: 10
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="hour"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(label) => `Hour: ${label}`}
                                    />
                                }
                            />
                            <Bar
                                dataKey="orders"
                                fill="#3b82f6"
                                radius={4}
                                className="fill-blue-400"
                            >
                                <LabelList
                                    position="top"
                                    offset={8}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export default PeakHoursCard
