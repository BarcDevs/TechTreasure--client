import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import ProductReviewItem from '@/components/admin/analytics/productInventory/ProductReviewItem.tsx'
import {useLoaderData} from 'react-router-dom'

const ProductReviewsCard = () => {
    const {productReviews} = useLoaderData() as Analytics

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">
                    Most Reviewed Products
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {productReviews.map((product, index) => (
                        <ProductReviewItem key={index} product={product}/>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default ProductReviewsCard
