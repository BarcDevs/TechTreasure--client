import {Separator} from '@/components/ui/separator.tsx'
import {useTranslation} from 'react-i18next'
import {CART_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'

const Summary = ({subtotal, shipping, total, discount}: {
    subtotal: number,
    shipping: number,
    total: number,
    discount?: number
}) => {
    const {t} = useTranslation(I18N_NAMESPACES.cart)

    return (
        <div className={'flex_col text-body w-full gap-4'}>
            <div className={'flex-row-between w-full'}>
                <p>{t(CART_LOCALES.subtotal)}:</p>
                <p>${subtotal}</p>
            </div>
            {discount ?
                <>
                    <Separator className={'h-[0.5px] bg-black'}/>
                    <div className={'flex-row-between w-full text-green-700'}>
                        <p>{t(CART_LOCALES.discount)}:</p>
                        <p>$-{discount}</p>
                    </div>
                </> : undefined
            }
            <Separator className={'h-[0.5px] bg-black'}/>
            <div className={'flex-row-between w-full'}>
                <p>{t(CART_LOCALES.shipping)}:</p>
                <p>{shipping === 0 ? t(CART_LOCALES.free) : `$${shipping}`}</p>
            </div>
            <Separator className={'h-[0.5px] bg-black'}/>
            <div className={'flex-row-between w-full font-bold'}>
                <p>{t(CART_LOCALES.total)}:</p>
                <p>${total}</p>
            </div>
        </div>
    )
}

export default Summary
