import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {ArrowUpIcon} from 'lucide-react'
import {useLoaderData} from 'react-router-dom'
import {twMerge} from 'tailwind-merge'

export default function AverageOrderValueCard() {
    const {averageOrderValue} = useLoaderData() as Analytics

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold tracking-tight">
                    Average Order Value
                </CardTitle>
                <CardDescription className="flex items-center text-sm">
                    vs previous period
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mt-4 flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-4xl font-bold">
                            ${averageOrderValue.current.toFixed(2)}
                        </p>
                        <p className="text-base text-muted-foreground">
                            Previous:
                            ${averageOrderValue.previous.toFixed(2)}
                        </p>
                    </div>
                    <div
                        className={twMerge(
                            'flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium',
                            averageOrderValue.trend === 'up' ?
                                'bg-emerald-100 text-emerald-700' :
                                'bg-rose-100 text-rose-700'
                        )}
                    >
                        {averageOrderValue.trend === 'up' ?
                            <ArrowUpIcon className="size-3"/> :
                            <ArrowUpIcon className="size-3 rotate-180"/>}
                        <span>{averageOrderValue.change}%</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
