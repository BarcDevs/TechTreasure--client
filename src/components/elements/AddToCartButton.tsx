import {FC} from 'react'
import {CART_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {addToCart} from '@/store/cartSlice.ts'
import {Product} from '@/types'
import {useDispatch} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {Button} from '@/components/ui/button.tsx'

type AddToCartButtonProps = {
    item: Product,
    hoverable?: boolean,
    itemVariant?: 'wishlist'
}

const AddToCartButton: FC<AddToCartButtonProps> = ({hoverable, item, itemVariant}) => {
    const dispatch = useDispatch()
    const {t} = useTranslation(I18N_NAMESPACES.cart)

    const handleCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        dispatch(addToCart({item}))
    }

    return (
        <>{
            hoverable ?
                <button onClick={handleCartClick}
                        className={`text-body-medium flex-center invisible absolute bottom-3 left-0 h-10 w-full rounded-b bg-black text-neutral-50 ${itemVariant !== 'wishlist' ? 'group-hover:' : ''}visible`}>
                    {t(CART_LOCALES.addToCart, {ns: I18N_NAMESPACES.cart})}
                </button> :
                <Button size="sm"
                        onClick={handleCartClick}
                        className="h-8 rounded-full">
                    {t(CART_LOCALES.addToCart, {ns: I18N_NAMESPACES.cart})}
                </Button>
        }</>
    )
}

export default AddToCartButton
