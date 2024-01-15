import Button from '@/components/elements/Button.tsx'
import {Input} from '@/components/ui/input.tsx'
import {Separator} from '@/components/ui/separator.tsx'
import {Link} from 'react-router-dom'

const CartSummary = ({}) => {
    const cartSubtotal = 1750
    const shipping = 0
    const total = cartSubtotal + shipping

    return (
        <section className={'flex_row w-full items-start justify-between px-10 max-lg:flex-center-col max-lg:gap-8'}>
            <div className={'flex_row gap-4'}>
                <Input className={'no-focus text-body h-12 border-black placeholder:opacity-50 min-w-[12rem]'}
                       placeholder={'Coupon Code'}/>
                <Button className={'text-nowrap whitespace-nowrap'} text={'Apply Coupon'}/>
            </div>
            <div className={'flex-center-col text-body gap-4 rounded border border-black px-6 py-8 lg:ml-10'}>
                <h3 className={'mb-2 text-heading-medium w-[26.5rem] min-w-[15rem] max-lg:w-[20rem] text-start'}>Cart Total</h3>
                <div className={'flex-row-between w-full'}>
                    <p>Subtotal:</p>
                    <p>${cartSubtotal}</p>
                </div>
                <Separator className={'bg-black h-[1px]'}/>
                <div className={'flex-row-between w-full'}>
                    <p>Shipping:</p>
                    <p>{shipping === 0 ? 'Free' : `$${shipping}`}</p>
                </div>
                <Separator className={'bg-black h-[1px]'}/>
                <div className={'flex-row-between w-full'}>
                    <p>Total:</p>
                    <p>${total}</p>
                </div>
                <Link to={'/checkout'}>
                    <Button text={'Proceed to Checkout'}/>
                </Link>
            </div>
        </section>
    )
}

export default CartSummary
