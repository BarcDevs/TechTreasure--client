import {useState} from 'react'
import {CheckoutForm as CheckoutFormType, CreditCardForm} from '@/validations/checkoutForm.ts'
import CheckoutForm from '@/components/checkout/CheckoutForm.tsx'

type BillingOptions = {
    discount: number | null
} & ({
    cash: false
    creditCard: CreditCardForm
} | {
    cash: true
    creditCard: null
})

const CheckoutPage = ({}) => {
    const [userInformation, setUserInformation] = useState<CheckoutFormType>()
    const [saveDetails, setSaveDetails] = useState(true)
    const [billingOptions, setBillingOptions] = useState<BillingOptions>()

    return (
        <main className={'flex_col ml-[5vw] w-[90vw] gap-20 max-sm:ml-[2.5vw] max-sm:w-[95vw]'}>
            <h2 className={'text-big-medium'}>Checkout</h2>
            <div className={'flex-row-between'}>
                <CheckoutForm {...{setUserInformation, saveDetails, setSaveDetails}}/>
                {/*<CheckoutSummary/>*/}
            </div>
        </main>
    )
}


export default CheckoutPage
