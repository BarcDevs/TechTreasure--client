import RowHeader from '@/components/shared/RowHeader.tsx'
import Button from '@/components/elements/Button.tsx'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'
import {Product} from '@/types'
import Item from '@/components/shop/items/Item.tsx'
import {useQuery} from '@tanstack/react-query'
import {getProducts} from '@/api/products.ts'

const ForYou = ({}) => {
    const {t} = useTranslation([I18N_NAMESPACES.global])
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
            <RowHeader headline={'Just For You'} variant={'white'}>
                <Link to={`/products`}>
                    <Button variant={'white'} text={t(GLOBAL_LOCALES.viewAll)}/>
                </Link>
            </RowHeader>
            <ul className={'flex-start-around max-sm:flex-center-col flex-row flex-wrap gap-5'}>
                {items.data?.products.map(item => (
                    <li key={item._id} className={'shrink-0'}>
                        <Item item={item}/>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default ForYou
