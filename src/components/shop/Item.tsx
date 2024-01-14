import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx"
import Rating from '@/components/elements/Rating.tsx'
import Icon from '@/components/elements/Icon.tsx'
import eye from '/assets/icons/eye.svg'
import heart from '/assets/icons/heart.svg'
import trash from '/assets/icons/trash.svg'
import {Product} from '@/types'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'

type ItemProps = {
    item: Product
} & WishlistItemProps

type WishlistItemProps = {
    item: Product
    variant: 'wishlist'
    onDelete: () => void
}

const Item = ({item, variant, onDelete}: ItemProps) => {
    const navigate = useNavigate()
    const {t} = useTranslation([I18N_NAMESPACES.shop, I18N_NAMESPACES.global])
    const [isHovered, setIsHovered] = useState(false)

    const handleCardClick = () => {
        navigate(`/item/${item.id}`)
    }

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        console.log('favorite clicked')
    }

    const handlePeekClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        console.log('view clicked')
    }

    const handleCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        console.log('add to cart clicked')
    }

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onDelete()
    }

    return (
        <article>
            <Card
                className={'w-[270px] gap-4 rounded'}
                onMouseOver={() => variant !== 'wishlist' && setIsHovered(true)}
                onMouseLeave={() => variant !== 'wishlist' && setIsHovered(false)}>
                <CardContent
                    className={'flex-center relative h-[250px] cursor-pointer p-3'}
                    onClick={handleCardClick}>
                    {(item.discount && item.discount > 0) ?
                        <div
                            className="flex-center absolute left-3 top-3 z-10 rounded bg-red-500 px-3 py-1 text-neutral-50">
                            -{item.discount}%
                        </div> : item.new &&
                        <div
                            className="flex-center absolute left-3 top-3 z-10 rounded bg-green-500 px-3 py-1 uppercase text-neutral-50">
                            {t(GLOBAL_LOCALES.new, {ns: I18N_NAMESPACES.global})}
                        </div>
                    }
                    <div className="absolute right-3 top-3 z-10 w-[34px] flex-col gap-2">
                        {variant !== 'wishlist' && <>
                            <button className={'flex-center h-[34px]'} onClick={handleFavoriteClick}>
                                <Icon path={heart} name={'heart'} size={24}/>
                            </button>
                            <button className={'flex-center h-[34px]'} onClick={handlePeekClick}>
                                <Icon path={eye} name={'eye'} size={24}/>
                            </button>
                        </>}
                        {variant === 'wishlist' &&
                            <button className={'flex-center h-[34px]'} onClick={handleDeleteClick}>
                                <Icon path={trash} name={'trash'} size={24}/>
                            </button>}
                    </div>
                    <div className={'mx-7 my-6'}>
                        <img className={isHovered || variant === 'wishlist' ? 'max-h-[145px]' : ''} src={item.image} alt="item"/>
                    </div>
                    {isHovered || variant === 'wishlist' &&
                        <button onClick={handleCartClick}
                                className="text-body-medium flex-center absolute bottom-3 left-0 h-10 w-full rounded-b bg-black text-neutral-50">
                            {t('addToCart')}
                        </button>}
                </CardContent>
                <CardFooter className={'text-body-medium flex-col-start'}>
                    <div className="text-black">
                        {item.name}
                    </div>
                    <div className="inline-flex-start gap-3">
                        <div className="text-red-500">${item.price}</div>
                        {item.oldPrice && <div className="text-black line-through opacity-50">${item.oldPrice}</div>}
                    </div>
                    {variant !== 'wishlist' && <div className="inline-flex-start gap-2">
                        <Rating rating={item.rating}/>
                        <div className="text-small-semibold text-black opacity-50">({item.votes})</div>
                    </div>}
                    {/*{item.colors && item.colors.length > 0 &&*/}
                    {/*    <div className="inline-flex-start gap-2">*/}
                    {/*        {item.colors.map(color => (*/}
                    {/*            <input type={'radio'}*/}
                    {/*                   key={color.name}*/}
                    {/*                   className={`h-[15px] w-[15px] rounded-full bg-[${color.hex}]`}*/}
                    {/*            />*/}
                    {/*        ))}*/}
                    {/*    </div>}*/}
                </CardFooter>
            </Card>
        </article>
    )
}

export default Item
