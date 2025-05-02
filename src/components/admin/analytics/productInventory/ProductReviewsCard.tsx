import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import ProductReviewItem from '@/components/admin/analytics/productInventory/ProductReviewItem.tsx'
import {Button} from '@/components/ui/button.tsx'

const ProductReviewsCard = ({data}: { data: ProductAnalytics[] }) => {
    const mostReviewedProducts = data
        .sort((a, b) => b.reviews - a.reviews)
        .slice(0, 5)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">
                    Most Reviewed Products
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {mostReviewedProducts.map((product, index) => (
                        <ProductReviewItem key={index} product={product}/>
                    ))}
                </div>
                <Button variant="ghost" size="sm" className="mt-4 w-full">
                    View All Reviews
                </Button>
            </CardContent>
        </Card>
    )
}

export default ProductReviewsCard
