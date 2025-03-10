import {Card, CardContent, CardFooter} from '@/components/ui/card.tsx'
import Rating from '@/components/elements/Rating.tsx'
import Icon from '@/components/elements/Icon.tsx'
// import eye from '/assets/icons/eye.svg'
import heart from '/assets/icons/heart.svg'
import trash from '/assets/icons/trash.svg'
import {Product, ProductWithColors} from '@/types'
import {useNavigate} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {CART_LOCALES, GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {getImagesOfColor} from '@/lib/utils/image.ts'
import {useState} from 'react'
import ColorPicker from '@/components/shared/ColorPicker.tsx'
import {useDispatch, useSelector} from 'react-redux'
import {addToWishlist, removeFromWishlist} from '@/store/wishlistSlice.ts'
import {addToCart} from '@/store/cartSlice.ts'
import {isProductWithColors} from '@/lib/utils/product.ts'
import {imageUrl} from '@/lib/utils/url.ts'
import {IRootState} from '@/store'

type ItemProps = {
    item: Product
    variant?: never
    onDelete?: never
}

type WishlistItemProps = {
    item: Product
    variant: 'wishlist'
    onDelete: (item: Product) => void
}

const Item = ({item, variant, onDelete}: ItemProps | WishlistItemProps) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {t} = useTranslation([I18N_NAMESPACES.shop, I18N_NAMESPACES.global])

    const isColors = isProductWithColors(item)
    const [color, setColor] = useState((item as ProductWithColors).defaultColor || null)
    const imagePath = isColors ? getImagesOfColor(item.mainImage, color!, true)[0]?.path : item.mainImage[0].path
    const handleCardClick = () => {
        navigate(`/items/${item._id}`)
    }

    const wishlist = useSelector((state: IRootState) => state.wishlist)

    const [isInWishlist, setIsInWishlist] = useState(wishlist.some(wishlistItem => wishlistItem._id === item._id))

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        setIsInWishlist(prevState => !prevState)
        isInWishlist ? dispatch(removeFromWishlist(item)) : dispatch(addToWishlist(item))
    }

    // const handlePeekClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.stopPropagation()
    //     console.log('view clicked')
    // }

    const handleCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        dispatch(addToCart({item}))
    }

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onDelete!(item)
    }

    return (
        <article>
            <Card
                className={'group w-[270px] gap-4 rounded'}
            >
                <CardContent
                    className={'flex-center relative h-[250px] cursor-pointer p-3'}
                    onClick={handleCardClick}>
                    {(item.sale && item.sale > 0) ?
                        <div
                            className="flex-center absolute left-3 top-3 z-10 rounded bg-red-500 px-3 py-1 text-neutral-50">
                            -{item.sale}%
                        </div> : item.isNew &&
                        <div
                            className="flex-center absolute left-3 top-3 z-10 rounded bg-green-500 px-3 py-1 uppercase text-neutral-50">
                            {t(GLOBAL_LOCALES.new, {ns: I18N_NAMESPACES.global})}
                        </div>
                    }
                    <div className="absolute right-3 top-3 z-10 w-[34px] flex-col gap-2">
                        {variant !== 'wishlist' && <>
                            <button className={'flex-center h-[34px]'}
                                    onClick={handleFavoriteClick}>
                                <Icon path={heart}
                                      name={'heart'}
                                      size={24}
                                      hoverable
                                      filled={isInWishlist}
                                />
                            </button>
                            {/*todo: add peek floating window*/}
                            {/*<button className={'flex-center h-[34px]'} onClick={handlePeekClick}>*/}
                            {/*    <Icon path={eye} name={'eye'} size={24} hoverable/>*/}
                            {/*</button>*/}
                        </>}
                        {variant === 'wishlist' &&
                            <button className={'flex-center h-[34px]'} onClick={handleDeleteClick}>
                                <Icon path={trash} name={'trash'} size={24} hoverable/>
                            </button>}
                    </div>
                    <div className={'mx-7 my-6'}>
                        <img
                            className={variant !== 'wishlist' ? 'group-hover:max-h-[145px]' : 'max-h-[145px]'}
                            src={imagePath ? imageUrl(imagePath) : imageUrl(item.mainImage[0]?.path)}
                            alt="item"/>
                    </div>
                    <button onClick={handleCartClick}
                            className={`text-body-medium flex-center invisible absolute bottom-3 left-0 h-10 w-full rounded-b bg-black text-neutral-50 ${variant !== 'wishlist' ? 'group-hover:' : ''}visible`}>

                        {t(CART_LOCALES.addToCart, {ns: I18N_NAMESPACES.cart})}
                    </button>
                </CardContent>
                <CardFooter className={'text-body-medium flex-col-start gap-2'}>
                    <div className="text-black">
                        {item.name}
                    </div>
                    <div className="inline-flex-start gap-3">
                        <div className="text-red-500">${Math.round(item.price)}</div>
                        {item.oldPrice &&
                            <div className="text-black line-through opacity-50">${Math.round(item.oldPrice)}</div>}
                    </div>
                    {variant !== 'wishlist' && <div className="inline-flex-start gap-2">
                        <Rating rating={item.rating}/>
                        <div className="text-small-semibold text-black opacity-50">({item.votes})</div>
                    </div>}
                    {isColors && <ColorPicker colors={item.colors} color={color} setColor={setColor}/>}
                </CardFooter>
            </Card>
        </article>
    )
}

export default Item
