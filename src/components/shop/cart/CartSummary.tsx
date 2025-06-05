import {config} from '@/config'
import Button from '@/components/elements/Button.tsx'
import {Input} from '@/components/ui/input.tsx'
import {Link} from 'react-router-dom'
import Summary from '@/components/shared/Summary.tsx'
import {useDispatch, useSelector} from 'react-redux'
import {IRootState} from '@/store'
import {updateDiscount} from '@/store/cartSlice.ts'
import {useTranslation} from 'react-i18next'
import {CART_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'

const CartSummary = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.cart)
    const dispatch = useDispatch()
    const cart = useSelector((state: IRootState) => state.cart)
    const handleCoupon = (e: React.FormEvent) => {
        e.preventDefault()
        // todo real coupon system
        const form = new FormData(e.currentTarget as HTMLFormElement)
        const coupon = form.get('coupon') as string

        coupon === config.GLOBAL_COUPON_CODE &&
        dispatch(
            updateDiscount({
                ...cart.discount, percent: (cart.discount?.percent ?? 0) + 5
            })
        )
    }

    return (
        <section className={'flex_row max-lg:flex-center-col w-full items-start justify-between px-10 max-lg:gap-8'}>
            <form className={'flex_row gap-4'}
                  onSubmit={handleCoupon}>
                <Input className={'no-focus text-body h-12 min-w-48 border-black placeholder:opacity-50'}
                       name={'coupon'}
                       placeholder={t(CART_LOCALES.couponCode)}/>
                <Button className={'whitespace-nowrap text-nowrap'}
                        text={t(CART_LOCALES.applyCoupon)}
                        type={'submit'}/>
            </form>
            <div className={'flex-center-col text-body gap-4 rounded border border-black px-6 py-8 lg:ml-10'}>
                <h3 className={'text-heading-medium mb-2 w-[26.5rem] min-w-60 text-start max-lg:w-80'}>{t(CART_LOCALES.cartTotal)}</h3>
                <Summary subtotal={cart.subtotal} shipping={cart.shipping || 0} total={cart.total}
                         discount={cart.cartDiscount}/>
                <Link to={'/checkout'}>
                    <Button
                        disabled={cart.total === 0}
                        text={t(CART_LOCALES.proceedToCheckout)}/>
                </Link>
            </div>
        </section>
    )
}

export default CartSummary
