import {useState} from 'react'
import AnalyticsHeader from './AnalyticsHeader.tsx'
import KeyMetricsSection from './keyMetrics/KeyMetricsSection'
import SalesPerformanceSection from './salesPerformance/SalesPerformanceSection'
import CustomerInsightsSection from './CustomerInsightsSection'
import ProductInventorySection from './ProductInventorySection'
import TrafficAndMarketingAnalytics
    from '@/components/seller/analytics/trafficAndMarketing/TrafficAndMarketingAnalytics.tsx'
// import TrafficMarketingSection from './TrafficMarketingSection'

const AnalyticsDashboard = () => {
    const [salesTimeframe, setSalesTimeframe] = useState<'today' | 'week' | 'month'>('week')

    return (
        <div className="mx-auto max-w-7xl">
            <AnalyticsHeader/>

            <KeyMetricsSection
                salesTimeframe={salesTimeframe}
                setSalesTimeframe={setSalesTimeframe}
            />

            {/* Sales Performance */}
            <SalesPerformanceSection/>

            {/* Customer Insights */}
            <CustomerInsightsSection/>

            {/* Product & Inventory Analytics */}
            <ProductInventorySection/>

            {/* Traffic & Marketing Analytics */}
            <TrafficAndMarketingAnalytics/>
        </div>
    )
}

export default AnalyticsDashboard
