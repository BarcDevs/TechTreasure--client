import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import {formatCurrency, formatPercentage} from '@/lib/utils/format.ts'
import {ArrowDown, ArrowUp} from 'lucide-react'
import {useLoaderData} from 'react-router-dom'

const AverageOrderValueCard = () => {
    const {averageOrderValue} = useLoaderData() as Analytics

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">
                    Average Order Value
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">{formatCurrency(averageOrderValue.current)}</span>
                    <span className={`flex items-center text-xs ${
                        averageOrderValue.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                        {averageOrderValue.trend === 'up' ? (
                            <ArrowUp className="mr-1 size-3"/>
                        ) : (
                            <ArrowDown className="mr-1 size-3"/>
                        )}
                        {formatPercentage(averageOrderValue.change)}
                    </span>
                </div>
                <div className="mt-4">
                    <div className="text-sm text-gray-500">
                        Previous period: {formatCurrency(averageOrderValue.previous)}
                    </div>
                </div>
                <div className="mt-4 h-[100px]">
                    {/* Placeholder for AOV trend chart */}
                    <div className="flex h-full items-end space-x-1">
                        {Array.from({length: 12}).map((_, i) => (
                            <div
                                key={i}
                                className="w-full rounded-sm bg-primary/20"
                                style={{
                                    height: `${Math.max(20, Math.floor(Math.random() * 100))}%`,
                                    backgroundColor: i >= 9 ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.2)'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default AverageOrderValueCard
