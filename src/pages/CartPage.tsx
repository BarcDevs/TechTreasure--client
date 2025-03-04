import Cart from '@/components/shop/Cart.tsx'
import CartSummary from '@/components/shop/CartSummary.tsx'

const CartPage = ({}) => {
    return (
        <main className={'flex_col ml-[5vw] w-[90vw] gap-20 max-sm:ml-[2.5vw] max-sm:w-[95vw]'}>
            <Cart/>
            <CartSummary/>
        </main>
    )
}

export default CartPage
