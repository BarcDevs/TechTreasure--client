import Sidebar from '@/components/home/Sidebar.tsx'
import Hero from '@/components/home/hero.tsx'
import ItemRow from '@/components/shop/ItemRow.tsx'
import {Categories} from '@/constants/categories.ts'
import CategoryRow from '@/components/shop/CategoryRow.tsx'
import {HOMEPAGE_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {useTranslation} from 'react-i18next'
import {useQuery} from '@tanstack/react-query'
import {getProducts} from '@/api/products.ts'
import {Product} from '@/types'
import {config} from '@/config'

const HomePage = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.homepage)
    const items = useQuery<{
        products: Product[],
        totalPages: number
    }>({
        queryKey: ['items'],
        queryFn: () => getProducts({limit: 10, page: 1, sort: '{"rating":1}'}),
        refetchOnWindowFocus: false
    })
    const products = items.data?.products
    /* todo filter items for sub categories */

    return (
        <main className={'flex-col-start my-5 ml-[5vw] w-[90vw] gap-[8.75rem]'}>
            <div className={'inline-flex h-fit w-full justify-start gap-[3.75rem]'}>
                <Sidebar/>
                <Hero/>
            </div>
            <ItemRow
                name={t(HOMEPAGE_LOCALES.flashSalesTitle)}
                headline={t(HOMEPAGE_LOCALES.flashSalesHeadline)}
                items={
                    products ?
                        products.filter((item: Product) => item.sale) : []}
                scroll={'horizontal'}
                timerEnd={config.TIMER_END_TIME}
                isFetching={items.isFetching}/>
            <CategoryRow name={t(HOMEPAGE_LOCALES.categoriesTitle)}
                         headline={t(HOMEPAGE_LOCALES.categoriesHeadline)}
                         categories={Object.values(Categories)}/>
            <ItemRow name={t(HOMEPAGE_LOCALES.bestSellingTitle)}
                     headline={t(HOMEPAGE_LOCALES.bestSellingHeadline)}
                     items={products &&
                         products.filter((item, i) => i < 4 ||
                             item.isNew)}
                     scroll={'none'}/>
            {/* TODO Featured Sale */}
            <ItemRow name={t(HOMEPAGE_LOCALES.exploreTitle)}
                     headline={t(HOMEPAGE_LOCALES.exploreHeadline)}
                     items={products}
                     rows={2}
                     scroll={'vertical'}/>
            {/* TODO New Arrivals */}
            {/* TODO benefits */}
        </main>
    )
}

export default HomePage
