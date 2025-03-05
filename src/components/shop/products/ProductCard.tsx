import {Badge} from '@/components/ui/badge.tsx'
import {Heart, Star} from 'lucide-react'
import {Link} from 'react-router-dom'
import {imageUrl} from '@/lib/utils/url.ts'
import {Button} from '@/components/ui/button.tsx'
import {Product} from '@/types'
import {FC} from 'react'

type ProductCardProps = {
    product: Product
}
const ProductCard: FC<ProductCardProps> = ({product}) =>
    (
        <div key={product._id}
             className="group relative rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
            {product.sale && product.sale > 0 &&
                <Badge className="absolute left-2 top-2 z-10">-{product.sale}%</Badge>}
            {product.isNew && <Badge className="absolute left-2 top-2 z-10" variant="secondary">New</Badge>}
            <button
                className="absolute right-2 top-2 z-10 rounded-full bg-white p-1.5 text-muted-foreground shadow-sm transition-colors hover:text-primary">
                <Heart className="size-4"/>
            </button>
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
                    <Button size="sm" className="h-8 rounded-full">
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    )

export default ProductCard
