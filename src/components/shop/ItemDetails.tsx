import {useEffect, useState} from 'react'
import {getImagesOfColor, imageUrl, isProductWithColors} from '@/lib/utils.ts'
import {Product, ProductWithColors} from '@/types'
import Rating from '@/components/elements/Rating.tsx'
import {Separator} from '@/components/ui/separator.tsx'
import QuantitySelector from '@/components/shared/QuantitySelector.tsx'
import Button from '@/components/elements/Button.tsx'
import Icon from '@/components/elements/Icon.tsx'
import DeliveryDetails from '@/components/checkout/DeliveryDetails.tsx'
import ColorPicker from '@/components/shared/ColorPicker.tsx'
import {addToWishlist} from '@/store/wishlistSlice.ts'
import {useDispatch} from 'react-redux'
import {addToCart} from '@/store/cartSlice.ts'

const ItemDetails = ({item}: { item: Product }) => {
    const dispatch = useDispatch()
    const isColors = isProductWithColors(item)

    const [quantity, setQuantity] = useState(item.stock > 0 ? 1 : 0)
    const [color, setColor] = useState((item as ProductWithColors).defaultColor || null)
    const [selectedSize, setSelectedSize] = useState((item.sizes || [])[0])
    const mainImage = isColors ? getImagesOfColor(item.mainImage, color!,true)[0] : item.mainImage[0]
    const [bigImage, setBigImage] = useState(mainImage)

    useEffect(() => {
        if (!isColors) return
        setBigImage(() => getImagesOfColor(item.mainImage, color!,true)[0])
    }, [color])

    const addToCartHandler = () => {
        dispatch(addToCart({item, quantity, variant: {color: color ?? undefined, size: selectedSize}}))
    }

    const addToWishlistHandler = () => {
        dispatch(addToWishlist(item))
    }

    return (
        <section className={'w-full flex-row-between max-md:flex-col'}>
            <section className={'flex-row-between gap-7 max-md:flex-col-reverse'}>
                {item.images && <ul className={'flex-col-start h-fit max-md:flex_row'}>
                    {[mainImage, ...((isColors ? getImagesOfColor(item.images, color!) : item.images) || [])].map(image => image && (
                        <li
                            key={imageUrl(image.path)}
                            className={'w-[100px] h-[100px] max-md:w-[50px] max-md:h-[50px] cursor-pointer p-6'}
                            onClick={() => setBigImage(() => image)}>
                            <img src={image.path} alt={item.name}/>
                        </li>
                    ))}
                </ul>}
                <div className={'h-[600px] w-[500px] max-md:h-[300px] max-md:w-full p-7 flex-center'}>
                    <img src={imageUrl(bigImage?.path)} alt={item.name} className={'object-fill w-full'}/>
                </div>
            </section>
            <section className={'w-[30%] max-md:w-full flex-col-start gap-6'}>
                <div className={'w-full flex-col-start gap-4'}>
                    <h3 className={'text-large-semibold'}>{item.name}</h3>
                    <div className={'flex-row-start gap-2'}>
                        <Rating rating={item.rating}/>
                        <p className={'text-small'}><span className={'opacity-50'}>({item.votes} Reviews) | </span><span
                            className={`${item.stock > 50 ? 'opacity-60 text-green-500' : 'opacity-100 text-red-500'}`}>
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
                                    className={`h-6 w-6 cursor-pointer rounded border border-black flex-center ${size === selectedSize ? 'border-red-500 bg-red-500 text-white' : 'bg-neutral-50 text-black'}`}
                                    onClick={() => setSelectedSize(() => size)}>
                                    <p className={'text-small-medium uppercase'}>{size}</p>
                                </li>)
                            )}
                        </ol>
                    </div>}
                <div className={'flex-row-start gap-4 w-full'}>
                    <QuantitySelector quantity={quantity} setQuantity={setQuantity} max={item.stock}/>
                    <Button text={'Add to Cart'}
                            onClick={addToCartHandler} className={'px-6 grow'}
                    />
                    <button
                        className={'group border border-black/50 bg-neutral-50 flex-center h-full aspect-square rounded p-1'}
                        onClick={addToWishlistHandler}>
                        <Icon path={'/assets/icons/heart.svg'} name={'heart'} size={32}
                              className={'group-hover:hidden'}/>
                        <Icon path={'/assets/icons/heart-filled.svg'} name={'heart'} size={32}
                              className={'hidden group-hover:block'}/>
                    </button>
                </div>
                <DeliveryDetails price={item.shippingFee || 0} className={'mt-4'}/>
            </section>
        </section>
    )
}

export default ItemDetails
