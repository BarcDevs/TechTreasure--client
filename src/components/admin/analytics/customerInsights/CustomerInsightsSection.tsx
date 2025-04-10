import CustomerRetentionCard from '@/components/seller/analytics/customerInsights/CustomerRetentionCard.tsx'
import AverageOrderValueCard from '@/components/seller/analytics/customerInsights/AverageOrderValueCard.tsx'
import PeakHoursCard from '@/components/seller/analytics/customerInsights/PeakHoursCard.tsx'

const CustomerInsightsSection = () => {
    return (
        <section className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
                Customer Insights
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <CustomerRetentionCard />
                <AverageOrderValueCard />
                <PeakHoursCard />
            </div>
        </section>
    )
}

export default CustomerInsightsSection
