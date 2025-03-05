import {useEffect, useState} from 'react'
import {Product, ProductWithColors} from '@/types'
import Rating from '@/components/elements/Rating.tsx'
import {Separator} from '@/components/ui/separator.tsx'
import QuantitySelector from '@/components/shared/QuantitySelector.tsx'
import Button from '@/components/elements/Button.tsx'
import Icon from '@/components/elements/Icon.tsx'
import DeliveryDetails from '@/components/checkout/DeliveryDetails.tsx'
import ColorPicker from '@/components/shared/ColorPicker.tsx'
import {addToWishlist, removeFromWishlist} from '@/store/wishlistSlice.ts'
import {useDispatch, useSelector} from 'react-redux'
import {addToCart} from '@/store/cartSlice.ts'
import {getImagesOfColor} from '@/lib/utils/image.ts'
import {isProductWithColors} from '@/lib/utils/product.ts'
import {imageUrl} from '@/lib/utils/url.ts'
import {IRootState} from '@/store'

const ItemDetails = ({item}: { item: Product }) => {
    const dispatch = useDispatch()
    const isColors = isProductWithColors(item)

    const [quantity, setQuantity] = useState(item.stock > 0 ? 1 : 0)
    const [color, setColor] = useState((item as ProductWithColors).defaultColor || null)
    const [selectedSize, setSelectedSize] = useState((item.sizes || [])[0])
    const mainImage = isColors ? getImagesOfColor(item.mainImage, color!, true)[0] : item.mainImage[0]
    const [bigImage, setBigImage] = useState(mainImage)

    const wishlist = useSelector((state: IRootState) => state.wishlist)

    const [isInWishlist, setIsInWishlist] = useState(wishlist.some(wishlistItem => wishlistItem._id === item._id))

    useEffect(() => {
        if (!isColors) return
        setBigImage(() => getImagesOfColor(item.mainImage, color!, true)[0])
    }, [color])

    useEffect(() => {
        setQuantity(item.stock > 0 ? 1 : 0)
        setSelectedSize((item.sizes || [])[0])
        setColor((item as ProductWithColors).defaultColor || null)
        setBigImage(() => mainImage || item.mainImage[0])
    }, [item, mainImage])

    const addToCartHandler = () => {
        dispatch(addToCart({item, quantity, variant: {color: color ?? undefined, size: selectedSize}}))
    }

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        setIsInWishlist(prevState => !prevState)
        isInWishlist ?
            dispatch(removeFromWishlist(item)) :
            dispatch(addToWishlist(item))
    }


    return (
        <section className={'flex-row-between w-full max-md:flex-col'}>
            <section className={'flex-row-between gap-7 max-md:flex-col-reverse'}>
                {item.images && <ul className={'flex-col-start max-md:flex_row h-fit'}>
                    {[mainImage, ...((isColors ? getImagesOfColor(item.images, color!) : item.images) ||
                        [])].map(image => image && (
                        <li
                            key={imageUrl(image.path)}
                            className={'size-[100px] cursor-pointer p-6 max-md:size-[50px]'}
                            onClick={() => setBigImage(() => image)}>
                            <img src={image.path ? imageUrl(image.path) : 'assets/images/items/imageNotFound.png'}
                                 alt={item.name}/>
                        </li>
                    ))}
                </ul>}
                <div className={'flex-center h-[600px] w-[500px] p-7 max-md:h-[300px] max-md:w-full'}>
                    <img src={imageUrl(bigImage?.path)} alt={item.name} className={'w-full object-fill'}/>
                </div>
            </section>
            <section className={'flex-col-start w-[30%] gap-6 max-md:w-full'}>
                <div className={'flex-col-start w-full gap-4'}>
                    <h3 className={'text-large-semibold'}>{item.name}</h3>
                    <div className={'flex-row-start gap-2'}>
                        <Rating rating={item.rating}/>
                        <p className={'text-small'}><span className={'opacity-50'}>({item.votes} Reviews) | </span><span
                            className={`${item.stock > 50 ? 'text-green-500 opacity-60' : 'text-red-500 opacity-100'}`}>
                            {item.stock > 50 ? 'In Stock' : item.stock > 0 ? `Only ${item.stock} left` : 'Out of Stock'}
                        </span></p>
                    </div>
                    <p className={'text-large-regular'}>${item.price.toFixed(2)}</p>
                </div>
                <p className={'text-body'}>{item.description}</p>
                <Separator className={'h-[0.5px] bg-black'}/>
                {isColors &&
                    <div className={'flex_row flex-start-center gap-6'}>
                        <p className={'text-heading font-inter'}>Colors:</p>
                        <ColorPicker colors={item.colors} color={color} setColor={setColor}/>
                    </div>}
                {item.sizes &&
                    <div className={'flex-row-start gap-6'}>
                        <p className={'text-heading font-inter'}>Size:</p>
                        <ol className={'flex-row-start gap-4'}>
                            {item.sizes.map(size => (
                                <li key={size}
                                    className={`flex-center size-6 cursor-pointer rounded border border-black ${size === selectedSize ? 'border-red-500 bg-red-500 text-white' : 'bg-neutral-50 text-black'}`}
                                    onClick={() => setSelectedSize(() => size)}>
                                    <p className={'text-small-medium uppercase'}>{size}</p>
                                </li>)
                            )}
                        </ol>
                    </div>}
                <div className={'flex-row-start w-full gap-4'}>
                    <QuantitySelector quantity={quantity} setQuantity={setQuantity} max={item.stock}/>
                    <Button text={'Add to Cart'}
                            onClick={addToCartHandler} className={'grow px-6'}
                    />
                    <button
                        className={'flex-center group aspect-square h-full rounded border border-black/50 bg-neutral-50 p-1'}
                        onClick={handleFavoriteClick}>
                        <Icon path={'/assets/icons/heart.svg'} name={'heart'} size={32}
                              className={isInWishlist ? 'hidden' : 'group-hover:hidden'}/>
                        <Icon path={'/assets/icons/heart-filled.svg'} name={'heart'} size={32}
                              className={isInWishlist ? 'block' : 'hidden group-hover:block'}/>
                    </button>
                </div>
                <DeliveryDetails price={item.shippingFee || 0} className={'mt-4'}/>
            </section>
        </section>
    )
}

export default ItemDetails
