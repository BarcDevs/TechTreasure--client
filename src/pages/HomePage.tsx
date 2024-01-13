import Sidebar from '@/components/home/Sidebar.tsx'
import Hero from '@/components/home/hero.tsx'
import ItemRow from '@/components/shop/ItemRow.tsx'
import {ITEMS} from '@/constants/mocks.ts'
import {Categories} from '@/constants/categories.ts'
import CategoryRow from '@/components/shop/CategoryRow.tsx'
import {HOMEPAGE_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {useTranslation} from 'react-i18next'

const HomePage = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.homepage)
    return (
        <main className={'flex-col-start my-5 ml-[5vw] w-[90vw] gap-[8.75rem]'}>
            <div className={'inline-flex h-fit w-full justify-start gap-[3.75rem]'}>
                <Sidebar/>
                <Hero/>
            </div>
            {/* TODO add translations */}
            <ItemRow name={t(HOMEPAGE_LOCALES.flashSalesTitle)} headline={t(HOMEPAGE_LOCALES.flashSalesHeadline)} items={ITEMS} scroll={'horizontal'} timerEnd={new Date('2024-01-20')}/>
            <CategoryRow name={t(HOMEPAGE_LOCALES.categoriesTitle)} headline={t(HOMEPAGE_LOCALES.categoriesHeadline)} categories={Object.values(Categories)}/>
            <ItemRow name={t(HOMEPAGE_LOCALES.bestSellingTitle)} headline={t(HOMEPAGE_LOCALES.bestSellingHeadline)} items={ITEMS.filter((_, i) => i < 4)} scroll={'none'}/>
            {/* TODO Featured Sale */}
            <ItemRow name={t(HOMEPAGE_LOCALES.exploreTitle)} headline={t(HOMEPAGE_LOCALES.exploreHeadline)} items={ITEMS} rows={2} scroll={'vertical'}/>
            {/* TODO New Arrivals */}
            {/* TODO benefits */}
        </main>
    )
}

export default HomePage
