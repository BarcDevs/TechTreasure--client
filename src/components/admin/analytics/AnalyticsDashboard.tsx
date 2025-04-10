import {useState} from 'react'
import AnalyticsHeader from './AnalyticsHeader.tsx'
import KeyMetricsSection from './keyMetrics/KeyMetricsSection'
import SalesPerformanceSection from './salesPerformance/SalesPerformanceSection'
import TrafficAndMarketingAnalytics
    from '@/components/seller/analytics/trafficAndMarketing/TrafficAndMarketingAnalytics.tsx'
import CustomerInsightsSection from '@/components/seller/analytics/customerInsights/CustomerInsightsSection.tsx'
import ProductInventorySection from '@/components/seller/analytics/productInventory/ProductInventorySection.tsx'

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
