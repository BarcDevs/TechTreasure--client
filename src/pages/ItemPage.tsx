import {useQuery} from '@tanstack/react-query'
import {useParams} from 'react-router-dom'
import {getProduct} from '@/api/products.ts'
import ItemDetails from '@/components/shop/items/ItemDetails.tsx'
import RelatedItems from '@/components/shop/items/RelatedItems.tsx'

const ItemPage = ({}) => {
    const {id} = useParams()
    const item = useQuery({
        queryKey: ['items', id],
        queryFn: () => getProduct(id as string),
        refetchOnWindowFocus: false
    })

    return (
        <main className={'flex_col ml-[5vw] w-[90vw] gap-[140px] max-sm:ml-[2.5vw] max-sm:w-[95vw] max-sm:gap-20'}>
            {item.data ?
                <ItemDetails item={item.data}/> :
                item.isFetching ? <p>Loading...</p> :
                    item.isError ?
                        <p>Error! Could not load item. please try again, if error persists please contact support</p> :
                        <p>Item not found</p>}
            <RelatedItems/>
        </main>
    )
}


export default ItemPage
