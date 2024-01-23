import {RouterProvider} from 'react-router-dom'
import {router} from '@/router/router.tsx'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {loadCart} from '@/store/cartSlice.ts'
import {loadWishlist} from '@/store/wishlistSlice.ts'
import {IRootState} from '@/store'

function App() {
    const dispatch = useDispatch()
    const cart = useSelector((state: IRootState) => state.cart)
    const wishlist = useSelector((state: IRootState) => state.wishlist)

    const [isInitial, setIsInitial] = useState(true)

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart') as string)
        const wishlist = JSON.parse(localStorage.getItem('wishlist') as string)

        if (cart) dispatch(loadCart(cart))
        if (wishlist) dispatch(loadWishlist(wishlist))

        setIsInitial(false)
    }, [])

    useEffect(() => {
        if (isInitial) return
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        if (isInitial) return
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }, [wishlist])
    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
