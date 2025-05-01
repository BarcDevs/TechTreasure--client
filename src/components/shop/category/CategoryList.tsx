import {Category} from '@/types'
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel.tsx'
import {forwardRef, useImperativeHandle, useRef} from 'react'
import {CarouselRef} from '@/types/ui'
import CategoryCard from '@/components/shop/category/CategoryCard.tsx'

type ItemListProps = {
    items: Category[]
}

const CategoryList = forwardRef<CarouselRef, ItemListProps>(({items}, ref) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const next = useRef<HTMLButtonElement | null>(null)
    const prev = useRef<HTMLButtonElement | null>(null)

    useImperativeHandle(ref, () => ({
        next: () => next.current?.click(),
        prev: () => prev.current?.click()
    }))

    return (
        <section className={'flex flex-col'}>
            <ul className={'w-full cursor-grab active:cursor-grabbing'}>
                <Carousel>
                    <CarouselNext ref={next} className={'hidden'}/>
                    <CarouselPrevious ref={prev} className={'hidden'}/>
                    <CarouselContent className={'w-screen'}>
                        {items.map(item => (
                            <CarouselItem key={item._id}
                                          className={'basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6'}>
                                <li>
                                    <CategoryCard category={item}/>
                                </li>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </ul>
        </section>
    )
})

export default CategoryList
