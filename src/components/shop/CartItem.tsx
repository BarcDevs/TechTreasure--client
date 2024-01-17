import {CartItem as CartItemType} from '@/types'
import {Input} from '@/components/ui/input.tsx'
import {ChangeEvent} from 'react'
import {TableCell, TableRow} from '@/components/ui/table.tsx'
import Icon from '@/components/elements/Icon.tsx'

const CartItem = ({item}: { item: CartItemType }) => {
    const handleUpdateCart = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e)
    }

    const handleRemoveItem = () => {
        console.log('remove')
    }

    return (
        <TableRow key={item.id} className={'text-body group h-[100px] items-center'}>
            <TableCell className={'pl-10'}>
                <div className={'flex_row items-center justify-start gap-5'}>
                    <div className={'flex-center relative h-[54px] min-h-9 w-[54px] min-w-9'}>
                        <button onClick={handleRemoveItem} className={'invisible group-hover:visible absolute top-[-4px] left-[-10px]'}>
                            <Icon path={'/assets/icons/cancel.svg'} name={'remove'}/>
                        </button>
                        <img src={item.image} alt={item.name}/>
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
                           min={0}
                        // todo max={item.stock}
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
