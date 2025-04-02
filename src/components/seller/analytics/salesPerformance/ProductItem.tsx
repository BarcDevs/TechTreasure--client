import {ShoppingCart} from 'lucide-react'
import {formatCurrency} from '@/lib/utils/format.ts'
import {FC} from 'react'
import {StoreProduct} from '@/types'

type ProductItemProps = {
    product: StoreProduct
}

const ProductItem: FC<ProductItemProps> = ({product}) => (
    <div className="flex items-center justify-between">
        <div className="flex-1">
            <div className="font-medium">{product.name}</div>
            <div className="flex items-center text-xs text-gray-500">
                <ShoppingCart className="mr-1 size-3"/>
                {product.sales} sold
            </div>
        </div>
        <div className="text-right">
            <div className="font-medium">{formatCurrency(product.revenue)}</div>
            <div className="text-xs text-gray-500">
                Revenue
            </div>
        </div>
    </div>
)

export default ProductItem
