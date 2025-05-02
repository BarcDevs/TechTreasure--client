import AnalyticsHeader from './AnalyticsHeader.tsx'
import KeyMetricsSection from './keyMetrics/KeyMetricsSection'
import SalesPerformanceSection from './salesPerformance/SalesPerformanceSection'
import TrafficAndMarketingAnalytics
    from '@/components/admin/analytics/trafficAndMarketing/TrafficAndMarketingAnalytics.tsx'
import CustomerInsightsSection from '@/components/admin/analytics/customerInsights/CustomerInsightsSection.tsx'
import ProductInventorySection from '@/components/admin/analytics/productInventory/ProductInventorySection.tsx'

const AnalyticsDashboard = () =>
    (
        <div className="mx-auto max-w-7xl">
            <AnalyticsHeader/>

            <KeyMetricsSection/>

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

export default AnalyticsDashboard
