import {useQuery} from '@tanstack/react-query'
import {getProducts} from '@/api/products.ts'
import {Product} from '@/types'
import {useSearchParams} from 'react-router-dom'
import ItemsView from '@/components/shop/items/ItemsView.tsx'
import {Categories} from '@/constants/categories.ts'


const ItemsPage = () => {
    const pageSize = 10
    const [searchParams] = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1;
    const searchTerm = searchParams.get('search') as string | undefined
    const category = searchParams.get('category') as string | undefined

    const items = useQuery<{
        products: Product[],
        totalPages: number
    }>({
        queryKey: ['items', currentPage, searchTerm, category],
        queryFn: () => getProducts({
            limit: pageSize,
            page: currentPage,
            sort: '{"rating":1}',
            search: searchTerm || undefined,
            category: category ? Categories[category].name : undefined
        }),
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000
    })

    return (
        <ItemsView
            items={items.data}
        />
    )
}

export default ItemsPage
