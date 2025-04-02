import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import {bestSellingProducts} from '@/mock/analytics.ts'
import ProductItem from '@/components/seller/analytics/salesPerformance/ProductItem.tsx'

const BestSellingProductsCard = () => (
    <Card>
        <CardHeader>
            <CardTitle className="text-base">
                Best-Selling Products
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {bestSellingProducts.map((product, index) => (
                    <ProductItem key={index} product={product} />
                ))}
            </div>
        </CardContent>
    </Card>
)

export default BestSellingProductsCard
