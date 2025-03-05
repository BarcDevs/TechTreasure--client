import {useQuery} from '@tanstack/react-query'
import {getProducts} from '@/api/products.ts'
import {Product} from '@/types'
import {useSearchParams} from 'react-router-dom'
import ItemsView from '@/components/shop/items/ItemsView.tsx'


const ItemsPage = () => {
    const pageSize = 8
    const [searchParams] = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1;

    const items = useQuery<{
        products: Product[],
        totalPages: number
    }>({
        queryKey: ['items', currentPage],
        queryFn: () => getProducts({
            limit: pageSize,
            page: currentPage,
            sort: '{"rating":1}'
        }),
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000
    })

    return (
        <ItemsView items={items.data}/>
    )
}

export default ItemsPage
