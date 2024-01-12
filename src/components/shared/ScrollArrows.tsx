import {forwardRef, MutableRefObject} from 'react'
import {CarouselRef} from '@/types/ui'
import Icon from '@/components/shared/Icon.tsx'
import arrowRight from '/assets/icons/arrow-right.svg'
import arrowLeft from '/assets/icons/arrow-left.svg'

const ScrollArrows = forwardRef<CarouselRef>(({}, ref) =>
    (
        <div className={'flex_row flex-nowrap'}>
            <button className={'p-2.5'} onClick={()=> (ref as MutableRefObject<CarouselRef>).current?.prev()}>
                <Icon path={arrowLeft} name={'arrow-left'} size={24}/>
            </button>
            <button className={'p-2.5'} onClick={()=> (ref as MutableRefObject<CarouselRef>).current?.next()}>
                <Icon path={arrowRight} name={'arrow-right'} size={24}/>
            </button>
        </div>
    ))

export default ScrollArrows
