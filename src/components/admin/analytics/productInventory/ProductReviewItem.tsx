import {Star} from 'lucide-react'
import {FC} from 'react'

type ProductReviewItemProps = {
    product: {
        name: string
        rating: number
        reviews: number
    }
}

const ProductReviewItem: FC<ProductReviewItemProps> = ({ product }) => (
    <div className="flex items-center justify-between">
        <div className="flex-1">
            <div className="font-medium">{product.name}</div>
            <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={`size-3 ${
                            i < Math.floor(product.rating)
                                ? 'fill-amber-400 text-amber-400'
                                : i < product.rating
                                    ? 'fill-amber-400/50 text-amber-400/50'
                                    : 'fill-gray-200 text-gray-200'
                        }`}
                    />
                ))}
                <span className="ml-1 text-xs text-gray-500">({product.rating})</span>
            </div>
        </div>
        <div className="text-right">
            <div className="font-medium">{product.reviews}</div>
            <div className="text-xs text-gray-500">
                Reviews
            </div>
        </div>
    </div>
)

export default ProductReviewItem
