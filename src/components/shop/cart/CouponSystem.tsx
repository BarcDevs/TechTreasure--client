import {useState} from 'react'
import {config} from '@/config'
import {updateDiscount} from '@/store/cartSlice.ts'
import {useDispatch, useSelector} from 'react-redux'
import {IRootState} from '@/store'
import Button from '@/components/elements/Button.tsx'
import {CART_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {Input} from '@/components/ui/input.tsx'
import {useTranslation} from 'react-i18next'
import Icon from '@/components/elements/Icon.tsx'

const CouponSystem = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.cart)

    const dispatch = useDispatch()
    const cart = useSelector((state: IRootState) => state.cart)

    const [couponsApplied, setCouponsApplied] = useState<string[]>([])
    const addCoupon = (e: React.FormEvent) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget as HTMLFormElement)
        const coupon = form.get('coupon') as string

        if (!config.COUPON_CODES[coupon]) return
        if (couponsApplied.includes(coupon)) return

        setCouponsApplied([...couponsApplied, coupon])

        dispatch(
            updateDiscount({
                ...cart.discount,
                percent: (cart.discount?.percent ?? 0) + config.COUPON_CODES[coupon]
            })
        )
    }

    const removeCoupon = (coupon: string) => {
        setCouponsApplied(prevState => prevState.filter(c => c !== coupon))

        dispatch(
            updateDiscount({
                ...cart.discount,
                percent: (cart.discount?.percent ?? 0) - config.COUPON_CODES[coupon]
            })
        )
    }

    return (
        <div>
            <form className={'flex_row gap-4'}
                  onSubmit={addCoupon}>
                <Input className={'no-focus text-body h-12 min-w-48 border-black placeholder:opacity-50'}
                       name={'coupon'}
                       placeholder={t(CART_LOCALES.couponCode)}/>
                <Button className={'whitespace-nowrap text-nowrap'}
                        text={t(CART_LOCALES.applyCoupon)}
                        type={'submit'}/>
            </form>
            {couponsApplied.map(coupon => (
                <div className={'flex_row items-center justify-between gap-4'}>
                    <p
                        key={coupon}
                        className={'text-body-medium gap-2 rounded-md p-2'}>
                        {coupon}
                    </p>
                    <button onClick={() => removeCoupon(coupon)}>
                        <Icon path={'/assets/icons/cancel.svg'} name={'remove'}/>
                    </button>
                </div>
            ))}
        </div>
    )
}

export default CouponSystem
