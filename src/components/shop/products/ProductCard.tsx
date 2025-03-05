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
             className="group relative rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
            {product.sale && product.sale > 0 &&
                <Badge className="absolute left-2 top-2 z-10">-{product.sale}%</Badge>}
            {product.isNew &&
                <Badge className="absolute left-2 top-2 z-10"
                       variant="secondary">
                    NEW
                </Badge>}
            <div
                className="absolute right-2 top-2 z-10 rounded-full  p-1.5 text-muted-foreground shadow-sm transition-colors hover:text-primary">
                <FavoritesButton item={product}/>
            </div>
            <Link to="#">
                <img src={imageUrl(product.mainImage[0]?.path) || '/placeholder.svg'}
                     alt={product.name}
                     className="h-[200px] w-full object-cover transition-transform group-hover:scale-105"/>
            </Link>
            <div className="p-4">
                <Link to="#">
                    <h3 className="line-clamp-1 font-medium group-hover:text-primary">
                        {product.name}
                    </h3>
                </Link>
                <div className="mt-1 flex items-center">
                    {Array.from({length: 5}).map((_, idx) => (
                        <Star key={idx}
                              className={`size-4 ${idx < Math.floor(product.rating) ?
                                  'fill-primary text-primary' :
                                  'fill-muted text-muted-foreground'}`}/>
                    ))}
                </div>
                <div className="mt-2 flex items-center justify-between">
                        <span className="font-medium">
                            ${product.price.toFixed(2)}
                        </span>
                    <AddToCartButton item={product}/>
                </div>
            </div>
        </div>
    )

export default ProductCard
