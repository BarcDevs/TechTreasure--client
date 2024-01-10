import {Card, CardContent, CardFooter} from "@/components/ui/card"
import Rating from '@/components/shared/Rating.tsx'
import Icon from '@/components/shared/Icon.tsx'
import eye from '/assets/icons/eye.svg'
import heart from '/assets/icons/heart.svg'
import {Item} from '@/types'

type ItemProps = {
    item: Item
}

const Item = ({item}: ItemProps) => {
    return (
        <article>
            <Card className={'w-[270px] gap-4 rounded'}>
                <CardContent className={'h-[250px] flex-center p-3 relative'}>
                    {item.discount && item.discount > 0 &&
                        <div
                            className="left-3 top-3 absolute z-10 px-3 py-1 bg-red-500 rounded flex-center text-neutral-50">
                            -{item.discount}%
                        </div>
                    }
                    <div className="w-[34px] right-3 top-3 absolute z-10 flex-col gap-2">
                        <button className={'h-[34px] flex-center'}>
                            <Icon path={heart} name={'heart'} size={24}/>
                        </button>
                        <button className={'h-[34px] flex-center'}>
                            <Icon path={eye} name={'eye'} size={24}/>
                        </button>
                    </div>
                    <div className={'mx-7 my-6'}>
                        <img src={item.image} alt="item"/>
                    </div>
                </CardContent>
                <CardFooter className={'text-body-medium flex-col-start'}>
                    <div className="text-black">
                        {item.name}
                    </div>
                    {item.oldPrice &&
                        <div className="inline-flex-start gap-3">
                            <div className="text-red-500">${item.price}</div>
                            <div className="opacity-50 text-black line-through">${item.oldPrice}</div>
                        </div>}
                    <div className="inline-flex-start gap-2">
                        {!item.oldPrice && <div className="text-red-500">${item.price}</div>}
                        <Rating rating={item.rating}/>
                        <div className="opacity-50 text-black text-small-semibold">({item.votes})</div>
                    </div>
                </CardFooter>
            </Card>
        </article>
    )
}

export default Item
