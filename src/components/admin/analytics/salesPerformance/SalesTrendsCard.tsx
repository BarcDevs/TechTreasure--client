import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card.tsx'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select.tsx'
import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

const SalesTrendsCard = () => {
    const { sales } = useLoaderData() as Analytics

    const [salesTimeframe, setSalesTimeframe] = useState<
        'today' | 'week' | 'month' | 'year'
    >('week')

    const timeHighlight = {
        today: ['6am', '12pm', '6pm', '12am'],
        week: ['Tuesday', 'Thursday', 'Saturday'],
        month: ['1st', '15th', '30th'],
        year: ['January', 'July', 'December']
    }

    const salesData = sales[salesTimeframe]

    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                        Sales Trends
                    </CardTitle>
                    <Select
                        value={salesTimeframe}
                        onValueChange={(val) =>
                            setSalesTimeframe(val as 'today' | 'week' | 'month' | 'year')
                        }
                    >
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent>
                            {['Today', 'Week', 'Month', 'Year'].map((timeframe) => {
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
                    {/* Placeholder for line chart */}
                    <div className="flex h-full items-end space-x-2">
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div
                                key={i}
                                className="w-full rounded-sm bg-primary/20"
                                style={{
                                    height: `${Math.max(10, Math.floor(Math.random() * 90))}%`,
                                    backgroundColor:
                                        i === 29
                                            ? 'hsl(var(--primary))'
                                            : 'hsl(var(--primary) / 0.2)'
                                }}
                            />
                        ))}
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                        {timeHighlight[salesTimeframe].map((time, i) => (
                            <span key={i}>{time}</span>
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex flex-col gap-1 text-sm">
          <span className="text-muted-foreground">
            {salesTimeframe.charAt(0).toUpperCase() + salesTimeframe.slice(1)} Sales
          </span>
                    <div className="flex items-center gap-2 text-xl font-semibold">
                        ${salesData.value.toLocaleString(undefined, {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
                        <span
                            className={cn(
                                'flex items-center gap-1 text-sm font-medium',
                                salesData.trend === 'up'
                                    ? 'text-green-600'
                                    : 'text-red-600'
                            )}
                        >
              {salesData.trend === 'up' ? (
                  <TrendingUp size={16} />
              ) : (
                  <TrendingDown size={16} />
              )}
                            {salesData.change}%
            </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SalesTrendsCard
