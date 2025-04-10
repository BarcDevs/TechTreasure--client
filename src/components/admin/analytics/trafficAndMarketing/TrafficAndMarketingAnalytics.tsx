import TrafficSources from './TrafficSources'
import CampaignPerformance from './CampaignPerformance'
import PromotionsImpact from './PromotionsImpact'

const TrafficAndMarketingAnalytics = ({}) => {
    return (
        <section>
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
                Traffic & Marketing Analytics
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <TrafficSources/>
                <CampaignPerformance/>
                <PromotionsImpact/>
            </div>
        </section>
    )
}

export default TrafficAndMarketingAnalytics
