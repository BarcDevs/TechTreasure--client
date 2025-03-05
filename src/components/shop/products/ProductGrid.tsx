import {Product} from '@/types'
import ProductCard from '@/components/shop/products/ProductCard.tsx'

export const ProductGrid = ({products}: { products: Product[] }) => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.length ? products.map((product) => (
            <ProductCard product={product} key={product._id}/>
        )) : <p>No products found</p>}
    </div>
)
