import {CART} from '@/constants/mocks.ts'
import CartItem from '@/components/shop/CartItem.tsx'
import Button from '@/components/elements/Button.tsx'

const Cart = ({}) => (
        <table className={'table-auto'}>
            <thead>
            <tr className={'text-body-medium'}>
                <th className={'py-6 pl-10 text-left'}>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
            </tr>
            </thead>
            <tbody>
            {CART.map(item => (
                <CartItem item={item}/>
            ))}
            </tbody>
            <tfoot>
            <tr>
                <td>
                    <div className={'flex-row-start pl-10 py-6'}>
                        <Button text={'Return to Shop'} variant={'white'}/>
                    </div>
                </td>
                <td/>
                <td/>
                <td>
                    <div className={'flex_row justify-end py-6'}>
                        <Button text={'Reset Cart'} variant={'white'}/>
                    </div>
                </td>
            </tr>
            </tfoot>
        </table>
)

export default Cart
