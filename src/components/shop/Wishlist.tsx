import RowHeader from '@/components/shared/RowHeader.tsx'
import {ITEMS} from '@/constants/mocks.ts'
import Item from '@/components/shop/Item.tsx'
import Button from '@/components/elements/Button.tsx'

const Wishlist = ({}) => {
    const wishlistCount = 5
    const removeFromWishlist = () => {
        console.log('remove from wishlist')
    }

    const addAllToCart = () => {

    }

    return (
        <div className={'flex-center-col w-full gap-[60px]'}>
            <RowHeader headline={`Wishlist (${wishlistCount})`} variant={'white'}>
                <Button variant={'white'} text={'Move All To Cart'} onClick={addAllToCart}/>
            </RowHeader>
            <ul className={'flex-start-around max-sm:flex-center-col flex-row flex-wrap gap-5'}>
                {ITEMS.map(item => (
                    <li key={item.id}>
                        <Item item={item} variant={'wishlist'} onDelete={removeFromWishlist}/>
                    </li>
                ))}

            </ul>
        </div>
    )
}

export default Wishlist
