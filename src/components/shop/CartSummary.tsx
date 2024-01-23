import Button from '@/components/elements/Button.tsx'
import {Input} from '@/components/ui/input.tsx'
import {Link} from 'react-router-dom'
import Summary from '@/components/shared/Summary.tsx'
import {useDispatch, useSelector} from 'react-redux'
import {IRootState} from '@/store'
import {updateDiscount} from '@/store/cartSlice.ts'

const CartSummary = ({}) => {
    const dispatch = useDispatch()
    const cart = useSelector((state: IRootState) => state.cart)
    const handleCoupon = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('apply coupon')
        // todo real coupon system
        dispatch(updateDiscount({...cart.discount, percent: (cart.discount?.percent ?? 0) + 5}))
    }

    return (
        <section className={'flex_row max-lg:flex-center-col w-full items-start justify-between px-10 max-lg:gap-8'}>
            <form className={'flex_row gap-4'} onSubmit={handleCoupon}>
                <Input className={'no-focus text-body h-12 min-w-[12rem] border-black placeholder:opacity-50'}
                       name={'coupon'}
                       placeholder={'Coupon Code'}/>
                <Button className={'whitespace-nowrap text-nowrap'}
                        text={'Apply Coupon'}
                        type={'submit'}/>
            </form>
            <div className={'flex-center-col text-body gap-4 rounded border border-black px-6 py-8 lg:ml-10'}>
                <h3 className={'text-heading-medium mb-2 w-[26.5rem] min-w-[15rem] text-start max-lg:w-[20rem]'}>Cart
                    Total</h3>
                <Summary subtotal={cart.subtotal} shipping={cart.shipping || 0} total={cart.total}
                         discount={cart.cartDiscount}/>
                <Link to={'/checkout'}>
                    <Button text={'Proceed to Checkout'}/>
                </Link>
            </div>
        </section>
    )
}

export default CartSummary
