import {Product} from '@/types'
import ProductListItem from '@/components/shop/products/ProductListItem.tsx'

export const ProductList = ({products}: { products: Product[] }) => (
    <div className="space-y-4">
        {products.length ? products.map((product) => (
            <ProductListItem product={product} key={product._id}/>
        )) : <p>No products found</p>}
    </div>
)
