import SalesTrendsCard from '@/components/admin/analytics/salesPerformance/SalesTrendsCard.tsx'
import BestSellingProductsCard from '@/components/admin/analytics/salesPerformance/BestSellingProductsCard.tsx'

const SalesPerformanceSection = () => {
    return (
        <section className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
                Sales Performance
            </h2>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <SalesTrendsCard />
                <BestSellingProductsCard />
            </div>
        </section>
    )
}

export default SalesPerformanceSection
