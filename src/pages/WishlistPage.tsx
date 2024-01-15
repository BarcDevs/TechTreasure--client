import Wishlist from "@/components/shop/Wishlist"
import ForYou from '@/components/shop/ForYou.tsx'

const WishlistPage = ({}) => (
    <main className={'flex_col ml-[5vw] w-[90vw] gap-20'}>
        <Wishlist/>
        <ForYou/>
    </main>
)


export default WishlistPage
