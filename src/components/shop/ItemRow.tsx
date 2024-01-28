import {Product} from '@/types'
import RowHeader from '@/components/shared/RowHeader.tsx'
import ItemList from '@/components/shop/ItemList.tsx'
import {useRef} from 'react'
import {CarouselRef} from '@/types/ui'
import ScrollArrows from '@/components/shared/ScrollArrows.tsx'
import Timer from '@/components/shared/Timer.tsx'
import {useTranslation} from 'react-i18next'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import Button from '@/components/elements/Button.tsx'

type ItemListProps = {
    name: string,
    headline: string,
    items: Product[] | undefined,
    rows?: number,
    timerEnd?: Date,
    scroll?: "vertical" | "horizontal" | "none",
    isFetching?: boolean
    isError?: boolean
}

const ItemRow = ({name, headline, items, rows = 1, timerEnd, scroll, isFetching, isError}: ItemListProps) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)
    const listRef = useRef<CarouselRef>(null)
    const gaps = {
        vertical: 'gap-[3.75rem]',
        horizontal: 'gap-10',
        none: 'gap-[3.75rem]'
    }

    return (
        <section className={`flex_col ${gaps[scroll || 'none']}`}>
            <RowHeader name={name} headline={headline}>
                <div className={`flex_row h-full grow items-end ${timerEnd ? 'justify-between' : 'justify-end'}`}>
                    {timerEnd && <Timer endTime={timerEnd}/>}
                    {scroll !== "none" ?
                        <ScrollArrows ref={listRef}/> :
                        <Button text={t(GLOBAL_LOCALES.viewAll)}/>
                    }
                </div>
            </RowHeader>
            {items ?
                <ItemList ref={listRef} {...{items, rows, scroll}}/> :
                <p className={'text-body'}>
                    {isFetching ? 'Loading...' : isError ? 'Error has occurred. Please try again later' : 'No items to display'}
                </p>}
            {scroll !== "none" &&
                <div className={'flex-center'}>
                    <Button text={t(GLOBAL_LOCALES.viewAllProducts)}/>
                </div>}
        </section>
    )
}

export default ItemRow
