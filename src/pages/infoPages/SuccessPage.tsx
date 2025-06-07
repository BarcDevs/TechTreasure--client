import {useTranslation} from 'react-i18next'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {Link} from 'react-router-dom'
import Button from '@/components/elements/Button.tsx'
import {useEffect, useState} from 'react'
import {clearCart} from '@/store/cartSlice.ts'
import {useDispatch, useSelector} from 'react-redux'
import {IRootState} from '@/store'
import {completeOrder} from '@/api/payment.ts'
import {resetUserInfo} from '@/store/checkoutSlice.ts'
import {generateOrderId} from '@/lib/utils/orderId.ts'

const SuccessPage = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)
    const dispatch = useDispatch()
    const cart =
        useSelector((state: IRootState) => state.cart)
    const userInfo =
        useSelector((state: IRootState) => state.checkout)
    const [orderDetails, setOrderDetails] = useState<{
        orderId: string,
        trackingNumber: string
    }>({orderId: '', trackingNumber: ''})

    const onSuccessfulOrder = async () => {
        const orderId = generateOrderId()

        const res = await completeOrder(
            orderId,
            cart.total,
            cart.items,
            userInfo
        )

        setOrderDetails({
            orderId,
            trackingNumber: res.trackingNumber
        })
    }

    useEffect(() => {
        onSuccessfulOrder().then(() => {
            dispatch(resetUserInfo())
            dispatch(clearCart())
        })
    }, [])

    return (
        <main className={'flex-center-col gap-20'}>
            <div className={'flex-center-col mt-[50px] gap-10'}>
                <h1
                    className="text-center font-inter text-[70px] font-medium leading-[115px] tracking-[3.30px] text-black">
                    {t(GLOBAL_LOCALES.successHeadline)}
                </h1>
                <p className={'text-body text-black'}>
                    {t(GLOBAL_LOCALES.successText)}
                </p>
                <div className={'flex_col gap-5 rounded-lg bg-white p-8 font-semibold shadow'}>
                    <p>
                        Order number: <span className={'text-body text-red-500'}>
                            {orderDetails.orderId}
                        </span>
                    </p>

                    <p>
                        Tracking number: <span className={'text-body text-red-500'}>
                            {orderDetails.trackingNumber}
                        </span>
                    </p>
                </div>
            </div>
            <Link to={'/'}>
                <Button text={t(GLOBAL_LOCALES.backToHome)}/>
            </Link>
        </main>
    )
}

export default SuccessPage
