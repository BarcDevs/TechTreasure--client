import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import ProductItem from '@/components/admin/analytics/salesPerformance/ProductItem.tsx'
import {useLoaderData} from 'react-router-dom'

const BestSellingProductsCard = () => {
    const {productsAnalytics} = useLoaderData() as Analytics
    const bestSellingProducts = productsAnalytics
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">
                    Best-Selling Products
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {bestSellingProducts.map((product, index) => (
                        <ProductItem key={index} product={product}/>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default BestSellingProductsCard
