import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import {productReviews} from '@/mock/analytics.ts'
import ProductReviewItem from '@/components/seller/analytics/productInventory/ProductReviewItem.tsx'

const ProductReviewsCard = () => (
    <Card>
        <CardHeader>
            <CardTitle className="text-base">
                Most Reviewed Products
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {productReviews.map((product, index) => (
                    <ProductReviewItem key={index} product={product} />
                ))}
            </div>
        </CardContent>
    </Card>
)

export default ProductReviewsCard
