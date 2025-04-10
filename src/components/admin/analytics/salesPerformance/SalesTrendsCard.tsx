import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx'

const SalesTrendsCard = () => (
    <Card className="lg:col-span-2">
        <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                    Sales Trends
                </CardTitle>
                <Select defaultValue="month">
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="day">Day</SelectItem>
                        <SelectItem value="week">Week</SelectItem>
                        <SelectItem value="month">Month</SelectItem>
                        <SelectItem value="year">Year</SelectItem>
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
                                backgroundColor: i === 22 ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.2)'
                            }}
                        />
                    ))}
                </div>
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>Apr 1</span>
                    <span>Apr 15</span>
                    <span>Apr 30</span>
                </div>
            </div>
        </CardContent>
    </Card>
)

export default SalesTrendsCard
