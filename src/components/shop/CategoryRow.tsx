import {Category} from '@/types'
import RowHeader from '@/components/shared/RowHeader.tsx'
import {useRef} from 'react'
import {CarouselRef} from '@/types/ui'
import ScrollArrows from '@/components/shared/ScrollArrows.tsx'
import {useTranslation} from 'react-i18next'
import {GLOBAL_LOCALE_KEYS, I18N_NAMESPACES} from '@/constants'
import CategoryList from '@/components/shop/CategoryList.tsx'

type ItemListProps = {
    name: string,
    headline: string,
    categories: Category[]
}

const CategoryRow = ({name, headline, categories}: ItemListProps) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)
    const listRef = useRef<CarouselRef>(null)

    return (
        <section className={'flex_col gap-[3.75rem]'}>
            <RowHeader name={name} headline={headline}>
                <div className={'flex_row h-full grow items-end justify-end'}>
                    <ScrollArrows ref={listRef}/>
                </div>
            </RowHeader>
            <CategoryList ref={listRef} items={categories}/>
                <div className={'flex-center'}>
                    <button className={'w-fit px-12 py-3 bg-red-500 rounded hover:opacity-90'}>
                        <p className={'text-neutral-50 text-body-medium'}>
                            {t(GLOBAL_LOCALE_KEYS.viewAll)}
                        </p>
                    </button>
                </div>
        </section>
    )
}

export default CategoryRow
