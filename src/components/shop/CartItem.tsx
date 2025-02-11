import {CartItem as CartItemType} from '@/types'
import {Input} from '@/components/ui/input.tsx'
import {ChangeEvent} from 'react'
import {TableCell, TableRow} from '@/components/ui/table.tsx'
import Icon from '@/components/elements/Icon.tsx'
import {useDispatch} from 'react-redux'
import {deleteFromCart, updateCart} from '@/store/cartSlice.ts'
import {isProductWithColors} from '@/lib/utils/product.ts'
import {imageUrl} from '@/lib/utils/url.ts'
import {getImagesOfColor} from '@/lib/utils/image.ts'

const CartItem = ({item}: { item: CartItemType }) => {
    const dispatch = useDispatch()

    const handleUpdateCart = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value || Number(e.target.value) < 0) return
        const quantity = Math.min(item.stock, Number(e.target.value))
        dispatch(updateCart({item, quantity}))
    }

    const handleRemoveItem = () => {
        dispatch(deleteFromCart(item))
    }

    return (
        <TableRow key={item._id} className={'text-body group h-[100px] items-center'}>
            <TableCell className={'pl-10'}>
                <div className={'flex_row items-center justify-start gap-5'}>
                    <div className={'flex-center relative size-[54px] min-h-9 min-w-9'}>
                        <button onClick={handleRemoveItem}
                                className={'invisible absolute left-[-10px] top-[-4px] group-hover:visible'}>
                            <Icon path={'/assets/icons/cancel.svg'} name={'remove'}/>
                        </button>
                        <img src={imageUrl(isProductWithColors(item) ?
                            getImagesOfColor(item.mainImage, item.defaultColor, true)[0]?.path :
                            item.mainImage[0].path)}
                             alt={item.name}/>
                    </div>
                    <p>{item.name}</p>
                </div>
            </TableCell>
            <TableCell>
                <div className={'flex-center-row'}>
                    <p>${item.price}</p>
                </div>
            </TableCell>
            <TableCell>
                <div className={'flex-center-row'}>
                    <Input type={'number'}
                           value={item.quantity}
                           min={1}
                           max={item.stock}
                           onChange={handleUpdateCart}
                           className={'w-[72px] border-black'}/>
                </div>
            </TableCell>
            <TableCell>
                <div className={'flex-center-row'}>
                    <p>${item.subtotal}</p>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default CartItem
