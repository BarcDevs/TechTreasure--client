import {useQuery} from '@tanstack/react-query'
import {getStore} from '@/api/products.ts'
import {Seller, Store} from '@/types'
import {useSelector} from 'react-redux'
import {IRootState} from '@/store'

export const useShop = () => {
    const user = useSelector((state: IRootState) => state.auth.user) as Seller

    return useQuery<Store>({
        queryKey: ['store', 'items'],
        queryFn: () => getStore(user?.store),
        refetchOnWindowFocus: false,
    })
}
