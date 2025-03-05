import {Badge} from '@/components/ui/badge.tsx'
import {Heart, Star} from 'lucide-react'
import {Link} from 'react-router-dom'
import {imageUrl} from '@/lib/utils/url.ts'
import {Button} from '@/components/ui/button.tsx'
import {Product} from '@/types'
import {FC} from 'react'

type ProductListItemProps = {
    product: Product
}

const ProductListItem: FC<ProductListItemProps> = ({product}) =>
    (
        <div key={product._id}
             className="group relative flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:flex-row">
            <div className="relative">
                {product.isNew &&
                    <Badge className="absolute left-2 top-2 z-10"
                           variant="secondary">
                        New
                    </Badge>}
                <button
                    className="absolute right-2 top-2 z-10 rounded-full bg-white p-1.5 text-muted-foreground shadow-sm transition-colors hover:text-primary">
                    <Heart className="size-4"/>
                </button>
                <Link to="#">
                    <img src={imageUrl(product.mainImage[0]?.path) || '/placeholder.svg'} alt={product.name}
                         className="size-[150px] object-cover transition-transform group-hover:scale-105 sm:size-[200px]"/>
                </Link>
            </div>
            <div className="flex flex-1 flex-col">
                <Link to="#">
                    <h3 className="font-medium group-hover:text-primary">{product.name}</h3>
                </Link>
                <div className="mt-1 flex items-center">
                    {Array.from({length: 5}).map((_, idx) => (
                        <Star key={idx}
                              className={`size-4 ${idx < Math.floor(product.rating) ?
                                  'fill-primary text-primary' :
                                  'fill-muted text-muted-foreground'}`}/>
                    ))}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                    {product.description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-lg font-medium">${product.price.toFixed(2)}</span>
                    <Button size="sm">
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    )

export default ProductListItem
