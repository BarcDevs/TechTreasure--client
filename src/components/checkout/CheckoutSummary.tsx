import Summary from '@/components/shared/Summary.tsx'
import {MutableRefObject, useState} from 'react'
import Button from '@/components/elements/Button.tsx'
import {FormRef} from '@/types/ui'
import CheckoutItem from '@/components/checkout/CheckoutItem.tsx'
import {IRootState} from '@/store'
import {useSelector} from 'react-redux'
import {CHECKOUT_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {useTranslation} from 'react-i18next'
import {PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js'
import CouponSystem from '@/components/shop/cart/CouponSystem.tsx'

type Props = {
    userInfoRef: MutableRefObject<FormRef | null>
}

const CheckoutSummary: React.FC<Props> = ({userInfoRef}) => {
    const {t} = useTranslation(I18N_NAMESPACES.checkout)
    const cart = useSelector((state: IRootState) => state.cart)
    const stripe = useStripe()
    const elements = useElements()
    const [errorMessage, setErrorMessage] = useState('')

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault()

        const userInformation = userInfoRef.current?.submit()
        if (!userInformation) return

        if (!stripe || !elements) return

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/success`
            }
        })

        if (error) {
            setErrorMessage(error.message as string)
            return
        }

        console.log(userInfoRef.current)
        // todo send address to backend
    }

    return (
        <> {cart.total <= 0 ?
            <p className={'text-body'}>{t(CHECKOUT_LOCALES.emptyCart)}</p> :
            <section className={'text-body flex-col-start w-[33vw] gap-8 max-lg:w-full max-lg:pt-8 max-md:pr-5'}>
                <div className={'flex-col-start w-full gap-8'}>
                    {cart.items.map(item => (
                        <CheckoutItem item={item}
                                      key={item._id}/>
                    ))}
                </div>

                <div className={'flex-col-start w-full gap-8'}>
                    <Summary subtotal={cart.subtotal}
                             shipping={cart.shipping || 0}
                             total={cart.total}
                             discount={cart.cartDiscount}/>
                </div>

                <div className={'w-full'}>
                    <PaymentElement/>
                </div>

                <CouponSystem/>

                <Button
                    text={t(CHECKOUT_LOCALES.placeOrder)}
                    onClick={handlePlaceOrder}
                />

                {errorMessage && <p className={'text-red-500'}>{errorMessage}</p>}
            </section>
        }</>
    )
}

export default CheckoutSummary
