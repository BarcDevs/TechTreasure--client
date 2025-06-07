import Button from '@/components/elements/Button.tsx'
import {Link} from 'react-router-dom'
import Summary from '@/components/shared/Summary.tsx'
import {useSelector} from 'react-redux'
import {IRootState} from '@/store'
import {useTranslation} from 'react-i18next'
import {CART_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import CouponSystem from '@/components/shop/cart/CouponSystem.tsx'

const CartSummary = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.cart)
    const cart = useSelector((state: IRootState) => state.cart)

    return (
        <section className={'flex_row max-lg:flex-center-col w-full items-start justify-between px-10 max-lg:gap-8'}>
            <CouponSystem/>
            <div className={'flex-center-col text-body gap-4 rounded border border-black px-6 py-8 lg:ml-10'}>
                <h3 className={'text-heading-medium mb-2 w-[26.5rem] min-w-60 text-start max-lg:w-80'}>
                    {t(CART_LOCALES.cartTotal)}
                </h3>
                <Summary
                    subtotal={cart.subtotal}
                    shipping={cart.shipping || 0}
                    total={cart.total}
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
