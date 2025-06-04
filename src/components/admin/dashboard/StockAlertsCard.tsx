import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import {AlertCircle} from 'lucide-react'
import {Link, useLoaderData} from 'react-router-dom'
import {Button} from '@/components/ui/button.tsx'
import {Product} from '@/types'

const PRODUCTS_THRESHOLD = 10
const StockAlertsCard = ({}) => {
    const {products} = useLoaderData() as { products: Product[] }

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                    Stock Alerts
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <AlertCircle className="mr-2 size-5 text-amber-500"/>
                        <span className="text-xl font-bold">
                                            {products.filter(product => product.stock < PRODUCTS_THRESHOLD).length}
                                        </span>
                    </div>
                    <span className="text-sm text-gray-500">
                                        Items Low in Stock
                                    </span>
                </div>
                <Link to={'/admin/products/low-stock'}>
                    <Button variant="link" className="mt-2 h-auto p-0 text-xs">
                        View Items
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}

export default StockAlertsCard
