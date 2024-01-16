import Button from '@/components/elements/Button.tsx'
import {Input} from '@/components/ui/input.tsx'
import {Link} from 'react-router-dom'
import Summary from '@/components/shared/Summary.tsx'

const CartSummary = ({}) => {
    const cartSubtotal = 1750
    const shipping = 0
    const total = cartSubtotal + shipping

    return (
        <section className={'flex_row max-lg:flex-center-col w-full items-start justify-between px-10 max-lg:gap-8'}>
            <div className={'flex_row gap-4'}>
                <Input className={'no-focus text-body h-12 min-w-[12rem] border-black placeholder:opacity-50'}
                       placeholder={'Coupon Code'}/>
                <Button className={'whitespace-nowrap text-nowrap'} text={'Apply Coupon'}/>
            </div>
            <div className={'flex-center-col text-body gap-4 rounded border border-black px-6 py-8 lg:ml-10'}>
                <h3 className={'text-heading-medium mb-2 w-[26.5rem] min-w-[15rem] text-start max-lg:w-[20rem]'}>Cart Total</h3>
                <Summary subtotal={cartSubtotal} shipping={shipping} total={total}/>
                <Link to={'/checkout'}>
                    <Button text={'Proceed to Checkout'}/>
                </Link>
            </div>
        </section>
    )
}

export default CartSummary
