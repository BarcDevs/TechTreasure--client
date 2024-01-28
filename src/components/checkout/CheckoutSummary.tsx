import Summary from '@/components/shared/Summary.tsx'
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group.tsx'
import {Label} from '@/components/ui/label.tsx'
import visa from '/assets/icons/visa.svg'
import mastercard from '/assets/icons/mastercard.svg'
import americanExpress from '/assets/icons/american-express.svg'
import {useRef, useState} from 'react'
import CreditCardForm from '@/components/checkout/CreditCardForm.tsx'
import {Input} from '@/components/ui/input.tsx'
import Button from '@/components/elements/Button.tsx'
import {FormRef} from '@/types/ui'
import {CreditCardForm as CreditCardFormType} from '@/validations/checkoutForm.ts'
import {BillingOptions} from '@/pages/CheckoutPage.tsx'
import CheckoutItem from '@/components/checkout/CheckoutItem.tsx'
import {IRootState} from '@/store'
import {useSelector} from 'react-redux'

type CheckoutSummaryProps = {
    onSubmit: (billingOptions: BillingOptions) => void
}

const CheckoutSummary = ({onSubmit}: CheckoutSummaryProps) => {
    const cart = useSelector((state: IRootState) => state.cart)
    const creditCardFormRef = useRef<FormRef | null>(null)
    const [billingMethod, setBillingMethod] = useState<'cash' | 'creditCard'>('creditCard')
    const handleCheckoutRadio = (value: string) => {
        if (value !== 'creditCard' && value !== 'cash') return
        setBillingMethod(() => value)
    }

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
        <section className={'text-body flex-col-start w-[33vw] gap-8'}>
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
                        <p>Credit Card</p>
                        <div className={'flex_row h-7 gap-2'}>
                            <img src={visa} alt="visa"/>
                            <img src={mastercard} alt="mastercard"/>
                            <img src={americanExpress} alt="american express"/>
                        </div>
                    </Label>
                </div>
                {billingMethod === 'creditCard' && (
                    <CreditCardForm ref={creditCardFormRef} onSubmit={handleSubmit}/>
                )}
                <div className={'flex_row items-center justify-start gap-4'}>
                    <RadioGroupItem id={'cash'}
                                    value={'cash'}
                                    className={'border-black text-black'}
                    />
                    <Label htmlFor={'cash'}>
                        Cash on delivery
                    </Label>
                </div>
            </RadioGroup>
            <div className={'flex_row gap-4'}>
                <Input className={'no-focus text-body h-12 min-w-[12rem] border-black placeholder:opacity-50'}
                       placeholder={'Coupon Code'}/>
                <Button className={'whitespace-nowrap text-nowrap'} text={'Apply Coupon'}/>
            </div>
            <Button text={'Place Order'} onClick={handlePlaceOrder}/>
        </section>
    )
}

export default CheckoutSummary
