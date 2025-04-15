import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import {customerRetention} from '@/mock/analytics.ts'
import CustomerSegment from '@/components/admin/analytics/customerInsights/CustomerSegment.tsx'

const CustomerRetentionCard = () => (
    <Card>
        <CardHeader>
            <CardTitle className="text-base">
                New vs Returning Customers
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex justify-center">
                {/* Placeholder for pie chart */}
                <div className="relative size-[180px] rounded-full border-8 border-primary">
                    <div
                        className="absolute inset-0 rounded-full bg-blue-400"
                        style={{
                            clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((customerRetention.new / 100) * 2 * Math.PI)}% ${50 - 50 * Math.sin((customerRetention.new / 100) * 2 * Math.PI)}%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)`
                        }}
                    />
                </div>
            </div>
            <div className="mt-4 flex justify-center gap-6">
                <CustomerSegment color="primary" label="Returning" percentage={customerRetention.returning} />
                <CustomerSegment color="blue-400" label="New" percentage={customerRetention.new} />
            </div>
        </CardContent>
    </Card>
)

export default CustomerRetentionCard
