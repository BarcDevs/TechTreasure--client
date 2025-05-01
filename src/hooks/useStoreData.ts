import {useQuery} from '@tanstack/react-query'
import {Product} from '@/types'
import {getProducts} from '@/api/products.ts'

export const useStoreData = () => {
    const {data: products, isFetching, isError, error} = useQuery<{
        products: Product[],
        totalPages: number
    }>({
        queryKey: ['items'],
        queryFn: () => getProducts(),
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000
    })

    return {products, isFetching, isError, error}
}
