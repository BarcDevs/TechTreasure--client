import RowHeader from '@/components/shared/RowHeader.tsx'
import Item from '@/components/shop/Item.tsx'
import Button from '@/components/elements/Button.tsx'
import {useDispatch, useSelector} from 'react-redux'
import {IRootState} from '@/store'
import {clearWishlist, removeFromWishlist} from '@/store/wishlistSlice.ts'
import {Product} from '@/types'
import {addToCart} from '@/store/cartSlice.ts'
import {useNavigate} from 'react-router-dom'

const Wishlist = ({}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const wishlist = useSelector((state: IRootState) => state.wishlist)
    const handleRemoveFromWishlist = (item: Product) => {
        dispatch(removeFromWishlist(item))
    }

    const moveAllToCart = () => {
        wishlist.forEach(item => dispatch(addToCart(item)))
        dispatch(clearWishlist())
        navigate('/cart')
    }

    return (
        <div className={'flex-center-col w-full gap-[60px]'}>
            <RowHeader headline={`Wishlist (${wishlist.length})`} variant={'white'}>
                <Button variant={'white'} text={'Move All To Cart'} onClick={moveAllToCart}/>
            </RowHeader>
            <ul className={'flex_row max-sm:flex-center-col flex-row flex-wrap justify-normal gap-5'}>
                {wishlist.length ? wishlist.map(item => (
                        <li key={item._id}>
                            <Item item={item} variant={'wishlist'} onDelete={handleRemoveFromWishlist}/>
                        </li>
                    )) :
                    <p className={'text-body'}>There are no items in wishlist</p>}

            </ul>
        </div>
    )
}

export default Wishlist
