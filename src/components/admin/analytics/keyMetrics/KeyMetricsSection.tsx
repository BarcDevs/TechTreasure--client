import TotalSalesCard from './TotalSalesCard'
import TotalOrdersCard from './TotalOrdersCard'
import NewCustomersCard from './NewCustomersCard'
import RevenueBreakdownCard from './RevenueBreakdownCard'

const KeyMetricsSection = () => {
    return (
        <section className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
                Key Metrics Overview
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <TotalSalesCard/>
                <TotalOrdersCard/>
                <NewCustomersCard/>
                <RevenueBreakdownCard/>
            </div>
        </section>
    )
}

export default KeyMetricsSection
