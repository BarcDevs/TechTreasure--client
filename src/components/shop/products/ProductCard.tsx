import {Badge} from '@/components/ui/badge.tsx'
import {Star} from 'lucide-react'
import {Link} from 'react-router-dom'
import {imageUrl} from '@/lib/utils/url.ts'
import {Product} from '@/types'
import {FC} from 'react'
import AddToCartButton from '@/components/elements/AddToCartButton.tsx'
import FavoritesButton from '@/components/elements/FavoritesButton.tsx'

type ProductCardProps = {
    product: Product
}
const ProductCard: FC<ProductCardProps> = ({product}) =>
    (
        <div key={product._id}
             className="flex flex-col group relative rounded-lg border bg-card shadow-sm transition-all hover:shadow-md min-h-[350px]">

            {/* Sale & New Badges */}
            {product.sale && product.sale > 0 && (
                <Badge className="absolute left-2 top-2 z-10 bg-red-500 text-white">-{product.sale}%</Badge>
            )}
            {product.isNew && !product.sale && (
                <Badge className="absolute left-2 top-2 z-10 bg-blue-500 text-white">NEW</Badge>
            )}

            <FavoritesButton
                item={product}
                className="absolute right-2 top-2 z-10 rounded-full p-1.5 shadow-sm transition hover:text-primary"
            />

            <Link to={`/products/${product._id}`} className="flex-center relative flex-auto">
                <img src={imageUrl(product.mainImage[0]?.path) || '/placeholder.svg'}
                     alt={product.name}
                     className="aspect-square h-48 w-48 object-center p-3 transition-transform group-hover:scale-105"/>
            </Link>

            <div className="flex grow flex-col p-4">
                <Link to={`/products/${product._id}`}>
                    <h3 className="line-clamp-1 font-medium group-hover:text-primary">{product.name}</h3>
                </Link>

                {/* Star Rating */}
                <div className="mt-1 flex items-center">
                    {Array.from({length: 5}).map((_, idx) => (
                        <Star key={idx}
                              className={`size-4 ${idx < Math.floor(product.rating) ? 'fill-primary text-primary' : 'fill-muted text-muted-foreground'}`}
                        />
                    ))}
                </div>

                {/* Price & Add to Cart (Ensuring alignment) */}
                <div className="mt-auto flex items-center justify-between">
                    <span className="font-medium">${product.price.toFixed(2)}</span>
                    <AddToCartButton item={product}/>
                </div>
            </div>
        </div>
    )

export default ProductCard
