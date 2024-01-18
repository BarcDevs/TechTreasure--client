import RelatedItems from '@/components/shop/RelatedItems.tsx'
import ItemDetails from '@/components/shop/ItemDetails.tsx'

const ItemPage = ({}) => (
    <main className={'flex_col ml-[5vw] w-[90vw] gap-[140px] max-sm:ml-[2.5vw] max-sm:w-[95vw] max-sm:gap-20'}>
        <ItemDetails/>
        <RelatedItems/>
    </main>
)


export default ItemPage
