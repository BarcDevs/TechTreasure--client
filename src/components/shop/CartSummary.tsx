import Button from '@/components/elements/Button.tsx'
import {Input} from '@/components/ui/input.tsx'
import {Separator} from '@/components/ui/separator.tsx'

const CartSummary = ({}) => {
    const cartSubtotal = 1750
    const shipping = 0
    const total = cartSubtotal + shipping

    return (
        <section className={'w-full flex_row items-start justify-between px-10'}>
            <div className={'flex_row gap-4'}>
                <Input className={'h-12 border-black no-focus text-body placeholder:opacity-50'}
                       placeholder={'Coupon Code'}/>
                <Button className={'text-nowrap'} text={'Apply Coupon'}/>
            </div>
            <div className={'flex-center-col px-6 py-8 gap-4 border border-black rounded text-body'}>
                <h3 className={'mb-2 text-heading-medium  w-[26.5rem] text-start'}>Cart Total</h3>
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
                <Button text={'Proceed to Checkout'}/>
            </div>
        </section>
    )
}

export default CartSummary
