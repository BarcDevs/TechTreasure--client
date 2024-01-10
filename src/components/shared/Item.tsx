import {Card, CardContent, CardFooter} from "@/components/ui/card"
import Rating from '@/components/shared/Rating.tsx'
import Icon from '@/components/shared/Icon.tsx'
import eye from '/assets/icons/eye.svg'
import heart from '/assets/icons/heart.svg'
import {Item as Item_T} from '@/types'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {I18N_NAMESPACES} from '@/constants'

type ItemProps = {
    item: Item_T
}

const Item = ({item}: ItemProps) => {
    const navigate = useNavigate()
    const {t} = useTranslation(I18N_NAMESPACES.shop)
    const [isHovered, setIsHovered] = useState(false)

    const handleCardClick = () => {
        navigate(`/item/${item.id}`)
    }

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        console.log('favorite clicked')
    }

    const handleViewClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        console.log('view clicked')
    }

    const handleCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        console.log('add to cart clicked')
    }

    return (
        <article>
            <Card
                className={'w-[270px] gap-4 rounded'}
                onMouseOver={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                <CardContent
                    className={'flex-center relative h-[250px] p-3 cursor-pointer'}
                    onClick={handleCardClick}>
                    {item.discount && item.discount > 0 &&
                        <div
                            className="left-3 top-3 absolute z-10 px-3 py-1 bg-red-500 rounded flex-center text-neutral-50">
                            -{item.discount}%
                        </div>
                    }
                    <div className="w-[34px] right-3 top-3 absolute z-10 flex-col gap-2">
                        <button className={'h-[34px] flex-center'} onClick={handleFavoriteClick}>
                            <Icon path={heart} name={'heart'} size={24}/>
                        </button>
                        <button className={'h-[34px] flex-center'} onClick={handleViewClick}>
                            <Icon path={eye} name={'eye'} size={24}/>
                        </button>
                    </div>
                    <div className={'mx-7 my-6'}>
                        <img src={item.image} alt="item"/>
                    </div>
                    {isHovered &&
                        <button onClick={handleCartClick}
                                className="w-full h-10 bg-black rounded-bl rounded-br absolute bottom-3 left-0 text-neutral-50 text-body-semibold flex-center">
                            {t('addToCart')}
                        </button>}
                </CardContent>
                <CardFooter className={'text-body-medium flex-col-start'}>
                    <div className="text-black">
                        {item.name}
                    </div>
                    {item.oldPrice &&
                        <div className="inline-flex-start gap-3">
                            <div className="text-red-500">${item.price}</div>
                            <div className="text-black line-through opacity-50">${item.oldPrice}</div>
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
