import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import {useLoaderData} from 'react-router-dom'

const PeakHoursCard = () => {
    const {peakHours} = useLoaderData() as Analytics

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">
                    Peak Shopping Hours
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px]">
                    <div className="flex h-full items-end space-x-1">
                        {peakHours.map((hour, i) => (
                            <div key={i} className="flex flex-1 flex-col items-center">
                                <div
                                    className="w-full rounded-sm bg-primary/20"
                                    style={{
                                        height: `${(hour.orders / Math.max(...peakHours.map((h) => h.orders))) * 100}%`,
                                        backgroundColor: hour.orders > 100 ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.2)'
                                    }}
                                />
                                <div className="mt-2 text-xs text-gray-500">
                                    {hour.hour}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default PeakHoursCard
