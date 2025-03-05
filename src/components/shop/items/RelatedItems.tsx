import RowHeader from '@/components/shared/RowHeader.tsx'
import {Product} from '@/types'
import Item from '@/components/shop/items/Item.tsx'
import {useQuery} from '@tanstack/react-query'
import {getProducts} from '@/api/products.ts'
import {Link} from 'react-router-dom'
import Button from '@/components/elements/Button.tsx'

const RelatedItems = ({}) => {
    const items = useQuery<{
        products: Product[],
        totalPages: number
    }>({
        queryKey: ['items'],
        queryFn: () => getProducts({
            limit: 10,
            page: 1,
            sort: '{"rating":1}'
        }),
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000
    })

    return (
        <section className={'flex-center-col w-full gap-[60px]'}>
            <RowHeader headline={'Related Items'}/>
            <ul className={'flex-start-around max-sm:flex-center-col w-full flex-row flex-wrap gap-5'}>
                {items.data?.products.map(item => (
                    <li key={item._id} className={'shrink-0'}>
                        <Item item={item}/>
                    </li>
                ))}
            </ul>
            {/*todo: translate*/}
            <Link to={`/products?page=1`}>
                <Button className={'text-body'}
                        text={'View All'}
                />
            </Link>
        </section>
    )
}

export default RelatedItems
