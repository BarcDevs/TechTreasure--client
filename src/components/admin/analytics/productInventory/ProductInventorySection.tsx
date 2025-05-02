import ProductReviewsCard from '@/components/admin/analytics/productInventory/ProductReviewsCard.tsx'
import LowStockAlertsCard from '@/components/admin/analytics/productInventory/LowStockAlertsCard.tsx'
import StockMovementCard from '@/components/admin/analytics/productInventory/StockMovementCard.tsx'
import {useLoaderData} from 'react-router-dom'

const ProductInventorySection = () => {
    const {productsAnalytics} = useLoaderData() as Analytics

    return (
        <section className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
                Product & Inventory Analytics
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <LowStockAlertsCard data={productsAnalytics}/>
                <ProductReviewsCard data={productsAnalytics}/>
                <StockMovementCard />
            </div>
        </section>
    )
}

export default ProductInventorySection
