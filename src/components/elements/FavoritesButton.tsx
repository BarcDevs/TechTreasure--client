import Icon from '@/components/elements/Icon.tsx'
import {addToWishlist, removeFromWishlist} from '@/store/wishlistSlice.ts'
import {useDispatch, useSelector} from 'react-redux'
import {IRootState} from '@/store'
import {FC, useState} from 'react'
import {ClassName, Product} from '@/types'
import heart from '/assets/icons/heart.svg'
import {twMerge} from 'tailwind-merge'

type FavoritesButtonProps = {
    item: Product,
    className?: ClassName
}

const FavoritesButton: FC<FavoritesButtonProps> = ({item, className}) => {
    const dispatch = useDispatch()
    const wishlist = useSelector((state: IRootState) => state.wishlist)

    const [isInWishlist, setIsInWishlist] = useState(wishlist.some(wishlistItem => wishlistItem._id === item._id))

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        setIsInWishlist(prevState => !prevState)
        isInWishlist ? dispatch(removeFromWishlist(item)) : dispatch(addToWishlist(item))
    }

    return (
        <button className={twMerge('flex-center h-[34px] bg-transparent', className)}
                onClick={handleFavoriteClick}>
            <Icon path={heart}
                  name={'heart'}
                  size={24}
                  hoverable
                  filled={isInWishlist}
            />
        </button>
    )
}

export default FavoritesButton
