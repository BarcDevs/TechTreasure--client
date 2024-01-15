import {CartItem as CartItemType} from '@/types'
import {Input} from '@/components/ui/input.tsx'
import {ChangeEvent} from 'react'

const CartItem = ({item}: { item: CartItemType }) => {
    const handleUpdateCart = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e)
    }

    return (
        <tr key={item.id} className={'h-[100px] text-body items-center'}>
            <td>
                <div className={'flex_row justify-start items-center gap-5 pl-10'}>
                    <div className={'h-[54px] w-[54px] flex-center'}>
                        <img src={item.image} alt={item.name}/>
                    </div>
                    <p>{item.name}</p>
                </div>
            </td>
            <td>
                <div className={'flex-center-row'}>
                    <p>${item.price}</p>
                </div>
            </td>
            <td>
                <div className={'flex-center-row'}>
                    <Input type={'number'}
                           value={item.quantity}
                           min={0}
                        // todo max={item.stock}
                           onChange={handleUpdateCart}
                           className={'w-[72px] border-black'}/>
                </div>
            </td>
            <td>
                <div className={'flex-center-row'}>
                    <p>${item.subtotal}</p>
                </div>
            </td>
        </tr>
    )
}

export default CartItem
