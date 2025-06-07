import {useDispatch, useSelector} from 'react-redux'
import {IRootState} from '@/store'
import {useEffect, useState} from 'react'
import {loadCart} from '@/store/cartSlice.ts'
import {loadWishlist} from '@/store/wishlistSlice.ts'
import {loadAuthState} from '@/store/authSlice.ts'
import Cookies from 'js-cookie'

export const useLocalRedux = () => {
    const dispatch = useDispatch()
    const cart = useSelector((state: IRootState) => state.cart)
    const wishlist = useSelector((state: IRootState) => state.wishlist)
    const auth = useSelector((state: IRootState) => state.auth)

    const [isInitial, setIsInitial] = useState(true)

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart') as string)
        const wishlist = JSON.parse(localStorage.getItem('wishlist') as string)
        const auth = Cookies.get('token') ?
            JSON.parse(localStorage.getItem('auth-state') as string) : null

        if (cart) dispatch(loadCart(cart))
        if (wishlist) dispatch(loadWishlist(wishlist))
        if (auth) dispatch(loadAuthState(auth))

        setIsInitial(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (isInitial) return
        localStorage.setItem('cart', JSON.stringify(cart))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart])

    useEffect(() => {
        if (isInitial) return
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wishlist])

    useEffect(() => {
        if (isInitial) return
        if (auth)
            localStorage.setItem('auth-state', JSON.stringify(auth))
        else
            localStorage.removeItem('auth-state')
    })
}
