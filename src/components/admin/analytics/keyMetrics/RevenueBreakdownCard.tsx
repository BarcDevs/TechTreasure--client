import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import {formatCurrency} from '@/lib/utils/format.ts'
import RevenueItem from './RevenueItem.tsx'
import {useLoaderData} from 'react-router-dom'

const RevenueBreakdownCard = () => {
    const {revenue} = useLoaderData() as Analytics

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                    Revenue Breakdown
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(revenue.total)}</div>
                <div className="mt-4 space-y-2">
                    <RevenueItem
                        label="Profits"
                        value={revenue.profits}
                        total={revenue.total}
                        color="green-400"/>
                    <RevenueItem
                        label="Taxes"
                        value={revenue.taxes}
                        total={revenue.total}
                        color="blue-400"/>
                    <RevenueItem
                        label="Fees"
                        value={revenue.fees}
                        total={revenue.total}
                        color="amber-400"/>
                    <RevenueItem
                        label="Refunds"
                        value={revenue.refunds}
                        total={revenue.total}
                        color="red-400"/>
                </div>
            </CardContent>
        </Card>
    )
}

export default RevenueBreakdownCard
