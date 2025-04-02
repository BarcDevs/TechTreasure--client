import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import {formatCurrency} from '@/lib/utils/format.ts'
import RevenueItem from './RevenueItem.tsx'
import {revenueData} from '@/mock/analytics.ts'

const RevenueBreakdownCard = () => (
    <Card>
        <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
                Revenue Breakdown
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(revenueData.total)}</div>
            <div className="mt-4 space-y-2">
                <RevenueItem label="Profits" value={revenueData.profits} total={revenueData.total} color="green-400" />
                <RevenueItem label="Taxes" value={revenueData.taxes} total={revenueData.total} color="blue-400" />
                <RevenueItem label="Fees" value={revenueData.fees} total={revenueData.total} color="amber-400" />
                <RevenueItem label="Refunds" value={revenueData.refunds} total={revenueData.total} color="red-400" />
            </div>
        </CardContent>
    </Card>
)

export default RevenueBreakdownCard
