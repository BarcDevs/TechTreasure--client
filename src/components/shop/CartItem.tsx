import {CartItem as CartItemType} from '@/types'
import {Input} from '@/components/ui/input.tsx'
import {ChangeEvent} from 'react'
import {TableCell, TableRow} from '@/components/ui/table.tsx'

const CartItem = ({item}: { item: CartItemType }) => {
    const handleUpdateCart = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e)
    }

    return (
        <TableRow key={item.id} className={'text-body h-[100px] items-center'}>
            <TableCell className={'pl-10'}>
                <div className={'flex_row items-center justify-start gap-5'}>
                    <div className={'h-[54px] w-[54px] min-h-9 min-w-9 flex-center'}>
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
