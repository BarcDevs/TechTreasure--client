import {CART} from '@/constants/mocks.ts'
import CartItem from '@/components/shop/CartItem.tsx'
import Button from '@/components/elements/Button.tsx'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

const Cart = ({}) => (
        <Table className={'table-fixed'}>
            <TableHeader>
            <TableRow className={'text-body-medium'}>
                <TableHead className={'py-6 pl-10 text-left w-[33%]'}>Product</TableHead>
                <TableHead className={'text-center'}>Price</TableHead>
                <TableHead className={'text-center'}>Quantity</TableHead>
                <TableHead className={'text-center'}>Subtotal</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {CART.items.map(item => (
                <CartItem key={item.id} item={item}/>
            ))}
            </TableBody>
            <TableFooter>
            <TableRow className={'text-body-medium'}>
                <TableCell className={'pl-0'}>
                    <div className={'flex-row-start pl-10 py-6'}>
                        <Button text={'Return to Shop'} variant={'white'}/>
                    </div>
                </TableCell>
                <TableCell/>
                <TableCell/>
                <TableCell>
                    <div className={'flex-center-row py-6'}>
                        <Button text={'Reset Cart'} variant={'white'}/>
                    </div>
                </TableCell>
            </TableRow>
            </TableFooter>
        </Table>
)

export default Cart
