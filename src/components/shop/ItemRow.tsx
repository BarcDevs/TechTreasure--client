import {Product} from '@/types'
import RowHeader from '@/components/shared/RowHeader.tsx'
import ItemList from '@/components/shop/ItemList.tsx'
import {useRef} from 'react'
import {CarouselRef} from '@/types/ui'
import ScrollArrows from '@/components/shared/ScrollArrows.tsx'
import Timer from '@/components/shared/Timer.tsx'
import {useTranslation} from 'react-i18next'
import {GLOBAL_LOCALE_KEYS, I18N_NAMESPACES} from '@/constants'

type ItemListProps = {
    name: string,
    headline: string,
    items: Product[]
    rows?: number,
    timerEnd?: Date,
    scroll?: "vertical" | "horizontal" | "none"
}

const ItemRow = ({name, headline, items, rows = 1, timerEnd, scroll}: ItemListProps) => {
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
                        <button className={'w-fit rounded bg-red-500 px-12 py-3 hover:opacity-90'}>
                            <p className={'text-neutral-50 text-body-medium'}>
                                {t(GLOBAL_LOCALE_KEYS.viewAll)}
                            </p>
                        </button>}
                </div>
            </RowHeader>
            <ItemList ref={listRef} {...{items, rows, scroll}}/>
            {scroll !== "none" &&
                <div className={'flex-center'}>
                    <button className={'w-fit px-12 py-3 bg-red-500 rounded hover:opacity-90'}>
                        <p className={'text-neutral-50 text-body-medium'}>
                            {t(GLOBAL_LOCALE_KEYS.viewAllProducts)}
                        </p>
                    </button>
                </div>}
        </section>
    )
}

export default ItemRow
