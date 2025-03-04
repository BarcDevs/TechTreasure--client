import {useEffect, useRef, useState} from 'react'
import CheckoutForm from '@/components/checkout/CheckoutForm.tsx'
import CheckoutSummary from '@/components/checkout/CheckoutSummary.tsx'
import {FormRef} from '@/types/ui'
import {useTranslation} from 'react-i18next'
import {CHECKOUT_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe, StripeElementLocale, StripeElementsOptions} from '@stripe/stripe-js'
import {getPaymentSecret} from '@/api/payment.ts'
import * as defaultLanguage from '@/language';
import {stripeAppearance} from '@/constants/stripeElementConfig.ts'
import {useSelector} from 'react-redux'
import {IRootState} from '@/store'

const stripeClientKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(stripeClientKey)

const CheckoutPage = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.checkout)
    const userInfoRef = useRef<FormRef | null>(null)
    const cart = useSelector((state: IRootState) => state.cart)
    // @ts-ignore
    const [language, setLanguage] = useState<StripeElementLocale>(defaultLanguage)
    const [clientSecretKey, setClientSecretKey] = useState('')

    useEffect(() => {
        setLanguage(localStorage.getItem('language') as StripeElementLocale)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localStorage.getItem('language')])

    useEffect(() => {
        const getSecret = async () => {
            try {
                const secretKey = await getPaymentSecret(cart)
                setClientSecretKey(secretKey)
            } catch (e: Error | any) {
                console.error('Error fetching client secret:', e)
            }
        }

        getSecret()
    }, [])

    const stripeOptions: StripeElementsOptions = {
        clientSecret: clientSecretKey,
        appearance: stripeAppearance,
        locale: language as StripeElementLocale,
    }

    return (
        <main className={'flex_col ml-[5vw] w-[90vw] gap-12 max-sm:ml-[2.5vw] max-sm:w-[95vw]'}>
            <h2 className={'text-big-medium'}>{t(CHECKOUT_LOCALES.checkout)}</h2>
            {clientSecretKey &&
                <Elements stripe={stripePromise} options={stripeOptions}>
                    <div className={'md:flex-row-between mb-10 gap-20'}>
                        <CheckoutForm ref={userInfoRef}/>
                        <CheckoutSummary {...{userInfoRef}}/>
                    </div>
                </Elements>
            }
        </main>
    )
}

export default CheckoutPage
