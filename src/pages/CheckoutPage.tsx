import {useEffect, useRef, useState} from 'react'
import {CreditCardForm} from '@/validations/checkoutForm.ts'
import CheckoutForm from '@/components/checkout/CheckoutForm.tsx'
import CheckoutSummary from '@/components/checkout/CheckoutSummary.tsx'
import {FormRef} from '@/types/ui'
import {useTranslation} from 'react-i18next'
import {CHECKOUT_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe, StripeElementLocale, StripeElementsOptions} from '@stripe/stripe-js'
import {getPaymentSecret} from '@/api/payment.ts'
import language from '@/language'
import {stripeAppearance} from '@/constants/stripeElementConfig.ts'

const stripeClientKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(stripeClientKey)

export type BillingOptions = ({
    cash: false
    creditCard: CreditCardForm
} | {
    cash: true
    creditCard: null
})

const CheckoutPage = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.checkout)
    const userInfoRef = useRef<FormRef | null>(null)
    const [saveDetails, setSaveDetails] = useState(true)

    const [clientSecretKey, setClientSecretKey] = useState('')

    useEffect(() => {
        const getSecret = async () => {
            try {
                const secretKey = await getPaymentSecret()
                setClientSecretKey(secretKey)
            } catch (e: Error | any) {
                console.error('Error fetching clientSecret:', e)
            }
        }

        getSecret()
    }, [])

    const stripeOptions: StripeElementsOptions = {
        clientSecret: clientSecretKey,
        appearance: stripeAppearance,
        locale: language as StripeElementLocale
        // payment_method_types: ['card'] todo
    }

    const handleSubmit = (billingOptions: BillingOptions) => {
        const userInformation = userInfoRef.current?.submit()
        if (!userInformation) return

        console.log(userInformation, saveDetails, billingOptions)
    }

    return (
        <main className={'flex_col ml-[5vw] w-[90vw] gap-12 max-sm:ml-[2.5vw] max-sm:w-[95vw]'}>
            <h2 className={'text-big-medium'}>{t(CHECKOUT_LOCALES.checkout)}</h2>
            {clientSecretKey &&
                <Elements stripe={stripePromise} options={stripeOptions}>
                    <div className={'md:flex-row-between mb-10 gap-20'}>
                        <CheckoutForm ref={userInfoRef} {...{saveDetails, setSaveDetails}}/>
                        <CheckoutSummary {...{onSubmit: handleSubmit}}/>
                    </div>
                </Elements>
            }
        </main>
    )
}

export default CheckoutPage
