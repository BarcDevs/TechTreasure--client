import {useQuery} from '@tanstack/react-query'
import {getStore} from '@/api/products.ts'
import {Seller} from '@/types'
import {useSelector} from 'react-redux'
import {IRootState} from '@/store'

export const useShop = () => {
    const user = useSelector((state: IRootState) => state.auth.user)

    return useQuery({
        queryKey: ['store', 'items'],
        queryFn: () => getStore((user as Seller).store),
        refetchOnWindowFocus: false
    })
}
