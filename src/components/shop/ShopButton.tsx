import {FC} from 'react'
import {useSelector} from 'react-redux'
import {IRootState} from '@/store'
import IconLink from '@/components/shared/IconLink.tsx'
import cart from '/assets/icons/cart.svg'
import wishlist from '/assets/icons/wishlist.svg'

type ShopButtonProps = {
    to: 'cart' | 'wishlist'
    size?: number
}

const ShopButton: FC<ShopButtonProps> = ({to, size}) => {
    const wishlistItems = useSelector((state: IRootState) => state.wishlist).length
    const cartItems = useSelector((state: IRootState) => state.cart.totalItems)

    return (
        <IconLink
            to={`/${to}`}
            iconPath={to === 'cart' ? cart : wishlist}
            iconName={to}
            badgeCount={to === 'cart' ? cartItems : wishlistItems}
            size={size}
        />
    )
}

export default ShopButton
