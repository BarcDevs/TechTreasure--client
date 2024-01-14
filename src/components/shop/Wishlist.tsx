import RowHeader from '@/components/shared/RowHeader.tsx'
import {ITEMS} from '@/constants/mocks.ts'
import Item from '@/components/shop/Item.tsx'

const Wishlist = ({}) => {
    const wishlistCount = 5
    const removeFromWishlist = () => {
        console.log('remove from wishlist')
    }
    return (
        <div className={'flex-center-col w-full gap-[60px]'}>
            <RowHeader headline={`Wishlist (${wishlistCount})`} variant={'white'}/>
            <ul className={'flex-start-between flex-row flex-wrap gap-5 max-sm:flex-center-col'}>
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
