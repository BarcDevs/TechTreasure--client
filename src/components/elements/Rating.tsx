import Star from '@/components/shared/Star.tsx'
import {FC, useState} from 'react'
import {updateProductRating} from '@/api/products.ts'

type Props = {
    rating: number
    id: string
}

const Rating: FC<Props> = ({rating, id}) => {
    const [productRating, setProductRating] = useState(rating)
    const onStarClick = async (newRating: number) => {
        const product = await updateProductRating(id, newRating)

        setProductRating(product.rating)
    }

    return (
        <div className={'inline-flex'}>
            {[...Array(5)].map((_, i) => (
                productRating >= i + .9 ?
                    <Star key={i} rating={i + 1} icon={'full'} onStarClick={onStarClick}/> :
                    productRating >= i + .4 ?
                        <Star key={i} rating={i + 1} icon={'half'} onStarClick={onStarClick}/> :
                        <Star key={i} rating={i + 1} icon={'empty'} onStarClick={onStarClick}/>
            ))}
        </div>
    )
}


export default Rating
