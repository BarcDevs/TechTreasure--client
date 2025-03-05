import Wishlist from '@/components/shop/wishlist/Wishlist.tsx'
import ForYou from '@/components/shop/wishlist/ForYou.tsx'

const WishlistPage = ({}) => (
    <main className={'flex_col ml-[5vw] w-[90vw] gap-20'}>
        <Wishlist/>
        <ForYou/>
    </main>
)


export default WishlistPage
