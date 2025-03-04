import {Category} from '@/types'
import RowHeader from '@/components/shared/RowHeader.tsx'
import {useRef} from 'react'
import {CarouselRef} from '@/types/ui'
import ScrollArrows from '@/components/shared/ScrollArrows.tsx'
import {useTranslation} from 'react-i18next'
import CategoryList from '@/components/shop/CategoryList.tsx'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import Button from '@/components/elements/Button.tsx'
import {Link} from 'react-router-dom'

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
                <Link to={'/categories'}>
                    <Button text={t(GLOBAL_LOCALES.viewAll)}/>
                </Link>
            </div>
        </section>
    )
}

export default CategoryRow
