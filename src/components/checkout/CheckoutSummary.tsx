import Summary from '@/components/shared/Summary.tsx'
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group.tsx'
import {Label} from '@/components/ui/label.tsx'
import visa from '/assets/icons/visa.svg'
import mastercard from '/assets/icons/mastercard.svg'
import americanExpress from '/assets/icons/american-express.svg'
import {useRef, useState} from 'react'
// import CreditCardForm from '@/components/checkout/CreditCardForm.tsx'
import {Input} from '@/components/ui/input.tsx'
import Button from '@/components/elements/Button.tsx'
import {FormRef} from '@/types/ui'
import {CreditCardForm as CreditCardFormType} from '@/validations/checkoutForm.ts'
import {BillingOptions} from '@/pages/CheckoutPage.tsx'
import CheckoutItem from '@/components/checkout/CheckoutItem.tsx'
import {IRootState} from '@/store'
import {useSelector} from 'react-redux'
import {CART_LOCALES, CHECKOUT_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {useTranslation} from 'react-i18next'
import {PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js'

type CheckoutSummaryProps = {
    onSubmit: (billingOptions: BillingOptions) => void
}

const CheckoutSummary = ({onSubmit}: CheckoutSummaryProps) => {
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

    const handlePlaceOrder = () => {
        if (billingMethod === 'creditCard')
            creditCardFormRef.current?.submit()
        else handleSubmit()
    }

    const handleSubmit = (cardDetails?: CreditCardFormType) => {
        if (billingMethod === 'creditCard' && !cardDetails)
            return console.error('Method is set to credit card but no card details were provided')
        onSubmit(billingMethod === 'cash' ?
            {cash: true, creditCard: null} :
            {cash: false, creditCard: cardDetails!})
    }

    return (
        <section className={'text-body flex-col-start w-[33vw] gap-8 max-lg:w-full max-lg:pt-8 max-md:pr-5'}>
            <div className={'flex-col-start w-full gap-8'}>
                {cart.items.map(item => (
                    <CheckoutItem item={item} key={item._id}/>
                ))}
            </div>

            <div className={'flex-col-start w-full gap-8'}>
                <Summary subtotal={cart.subtotal}
                         shipping={cart.shipping || 0}
                         total={cart.total}
                         discount={cart.cartDiscount}/>
            </div>

            <RadioGroup className={'w-full'} defaultValue={'creditCard'} onValueChange={handleCheckoutRadio}>
                <div className={'flex_row items-center justify-start gap-4'}>
                    <RadioGroupItem id={'creditCard'}
                                    value={'creditCard'}
                                    className={'border-black text-black'}
                                    defaultChecked/>
                    <Label className={'flex-row-between grow items-center'} htmlFor={'creditCard'}>
                        <p>{t(CHECKOUT_LOCALES.creditCard)}</p>
                        {billingMethod === 'cash' &&
                            <div className={'flex_row h-7 gap-2'}>
                                <img src={visa} alt="visa"/>
                                <img src={mastercard} alt="mastercard"/>
                                <img src={americanExpress} alt="american express"/>
                            </div>}
                    </Label>
                </div>
                {billingMethod === 'creditCard' && (
                    // <CreditCardForm ref={creditCardFormRef} onSubmit={handleSubmit}/>
                    <PaymentElement/>
                )}
                <div className={'flex_row items-center justify-start gap-4'}>
                    <RadioGroupItem id={'cash'}
                                    value={'cash'}
                                    className={'border-black text-black'}
                    />
                    <Label htmlFor={'cash'}>
                        {t(CHECKOUT_LOCALES.cash)}
                    </Label>
                </div>
            </RadioGroup>
            <div className={'lg:flex_row flex_col gap-4'}>
                <Input className={'no-focus text-body h-12 min-w-48 border-black placeholder:opacity-50'}
                       placeholder={t(CART_LOCALES.couponCode, {ns: I18N_NAMESPACES.cart})}/>
                <Button className={'whitespace-nowrap text-nowrap'}
                        text={t(CART_LOCALES.applyCoupon, {ns: I18N_NAMESPACES.cart})}/>
            </div>
            <Button text={t(CHECKOUT_LOCALES.placeOrder)} onClick={handlePlaceOrder}/>
        </section>
    )
}

export default CheckoutSummary
