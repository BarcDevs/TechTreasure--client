import {Product} from '@/types'
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel.tsx'
import Item from '@/components/shop/Item.tsx'
import {forwardRef, useImperativeHandle, useRef} from 'react'
import {CarouselRef} from '@/types/ui'

type ItemListProps = {
    items: Product[],
    rows?: number
}

const ItemList = forwardRef<CarouselRef, ItemListProps>(({items, rows = 1}, ref) => {
    // make sure we have at least 5 items in each row
    const displayRows = Math.floor((items.length / 5) >= rows ? rows : items.length < 5 ? 1 : (items.length / 5))
    const itemsPerRow = Math.ceil(items.length / displayRows)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const refs = [...Array(displayRows)].map(() => useRef<CarouselRef | null>(null))

    useImperativeHandle(ref, () => ({
        next: () => refs.map(ref => ref.current?.next()),
        prev: () => refs.map(ref => ref.current?.prev())
    }))

    return (
        <section className={'flex flex-col'}>
            {[...Array(displayRows)].map((_, i) => (
                <ul key={i} className={'w-full cursor-grab active:cursor-grabbing'}>
                    <CarouselInstance ref={refs[i]}
                                      items={items.slice(i * itemsPerRow, i * itemsPerRow + itemsPerRow)}/>
                </ul>
            ))}
        </section>
    )
})

const CarouselInstance = forwardRef<CarouselRef, { items: Product[] }>(({items}, ref) => {
    const next = useRef<HTMLButtonElement | null>(null)
    const prev = useRef<HTMLButtonElement | null>(null)

    useImperativeHandle(ref, () => ({
        next: () => next.current?.click(),
        prev: () => prev.current?.click()
    }))

    return (
        <Carousel>
            <CarouselNext ref={next} className={'hidden'}/>
            <CarouselPrevious ref={prev} className={'hidden'}/>
            <CarouselContent className={'w-screen'}>
                {items.map(item => (
                    <CarouselItem key={item._id}
                                  className={'basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5'}>
                        <li>
                            <Item item={item}/>
                        </li>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
})

export default ItemList
