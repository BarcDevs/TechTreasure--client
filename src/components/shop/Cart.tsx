import CartItem from '@/components/shop/CartItem.tsx'
import Button from '@/components/elements/Button.tsx'
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {IRootState} from '@/store'
import {clearCart} from '@/store/cartSlice.ts'

const Cart = ({}) => {
    const dispatch = useDispatch()
    const cart = useSelector((state: IRootState) => state.cart)

    const resetCart = () => {
        dispatch(clearCart())
    }

    return (
        <Table className={'table-fixed'}>
            <TableHeader>
                <TableRow className={'text-body-medium'}>
                    <TableHead className={'w-[33%] py-6 pl-10 text-left'}>Product</TableHead>
                    <TableHead className={'text-center'}>Price</TableHead>
                    <TableHead className={'text-center'}>Quantity</TableHead>
                    <TableHead className={'text-center'}>Subtotal</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {cart.items.length ? cart.items.map(item => (
                        <CartItem key={item._id} item={item}/>
                    )) :
                    <TableRow><TableCell colSpan={4} className={'text-center'}>
                        Cart is empty
                    </TableCell></TableRow>}
            </TableBody>
            <TableFooter>
                <TableRow className={'text-body-medium'}>
                    <TableCell className={'pl-0'}>
                        <Link className={'flex-row-start py-6 pl-10'} to={'/items'}>
                            <Button text={'Return to Shop'} variant={'white'}/>
                        </Link>
                    </TableCell>
                    <TableCell/>
                    <TableCell/>
                    <TableCell>
                        <div className={'flex-center-row py-6'}>
                            <Button text={'Reset Cart'} variant={'white'} onClick={resetCart}/>
                        </div>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default Cart
