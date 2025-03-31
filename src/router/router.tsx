import {createBrowserRouter} from 'react-router-dom'
import RootLayout from '@/pages/layouts/RootLayout.tsx'
import HomePage from '@/pages/HomePage.tsx'
import WishlistPage from '@/pages/WishlistPage.tsx'
import CartPage from '@/pages/CartPage.tsx'
import CheckoutPage from '@/pages/CheckoutPage.tsx'
import ItemPage from '@/pages/ItemPage.tsx'
import ProductsPage from '@/pages/seller/ProductsPage.tsx'
import SellerLayout from '@/pages/layouts/SellerLayout.tsx'
import AddItemPage from '@/pages/seller/AddItemPage.tsx'
import EditItemPage from '@/pages/seller/EditItemPage.tsx'
import store from '@/store'
import {loadAuthState} from '@/store/authSlice.ts'
import ContactPage from '@/pages/ContactPage.tsx'
import CategoriesPage from '@/pages/CategoriesPage.tsx'
import Logout from '@/pages/auth/Logout.ts'
import AuthPage from '@/pages/auth/AuthPage.tsx'
import PrivacyPage from '@/pages/infoPages/PrivacyPage'
import TermsPage from '@/pages/infoPages/TermsPage.tsx'
import FAQ_Page from '@/pages/infoPages/FAQ_Page.tsx'
import AboutUsPage from '@/pages/infoPages/AboutUsPage.tsx'
import SuccessPage from '@/pages/infoPages/SuccessPage.tsx'
import NotFoundPage from '@/pages/infoPages/NotFoundPage.tsx'
import ItemsPage from '@/pages/ItemsPage.tsx'
import AccountPage from '@/pages/AccountPage.tsx'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                path: '',
                children: [
                    {
                        path: 'login',
                        element: <AuthPage type={'login'}/>
                    },
                    {
                        path: 'signup',
                        element: <AuthPage type={'signup'}/>
                    },
                    {
                        path: 'logout',
                        element: <Logout/>
                    }
                ]
            },
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: 'account/me',
                element: <AccountPage/>,
                loader: () => {
                    const authState = JSON.parse(localStorage.getItem('auth-state') || '{}')
                    store.dispatch(loadAuthState(authState))
                    return authState
                },
            },
            {
                path: 'account/:id',
                element: <AccountPage/>
            },
            {
                path: 'seller/:id'
                // element: <SellerPage/>
            },
            {
                path: 'categories',
                children: [
                    {
                        path: '',
                        element: <CategoriesPage/>
                    }
                ]
            },
            {
                path: 'products',
                children: [
                    {
                        path: '',
                        element: <ItemsPage/>
                    },
                    {
                        path: '?page',
                        element: <ItemsPage/>
                    },
                    {
                        path: '?category',
                        element: <ItemsPage/>
                    },
                    {
                        path: '?search',
                        element: <ItemsPage/>
                    },
                    {
                        path: ':id',
                        element: <ItemPage/>
                    },
                ]
            },
            {
                path: 'cart',
                element: <CartPage/>
            },
            {
                path: 'wishlist',
                element: <WishlistPage/>
            },
            {
                path: 'checkout',
                element: <CheckoutPage/>
            },

            {
                path: 'contact',
                element: <ContactPage/>
            },
            {
                path: 'about',
                element: <AboutUsPage/>
            },
            {
                path: 'faq',
                element: <FAQ_Page/>
            },
            {
                path: 'terms',
                element: <TermsPage/>
            },
            {
                path: 'privacy',
                element: <PrivacyPage/>
            },
            {
                path: 'success',
                element: <SuccessPage/>
            },

            {
                path: '*',
                element: <NotFoundPage/>
            }
        ]
    },
    {
        path: 'seller',
        element: <SellerLayout/>,
        loader: () => {
            const authState = JSON.parse(localStorage.getItem('auth-state') || '{}')
            store.dispatch(loadAuthState(authState))
            return authState
        },
        children: [
            {
                index: true
                // element: <SellerHomePage/> todo
            },
            {
                path: 'products',
                element: <ProductsPage/>
            },
            {
                path: 'products/add',
                element: <AddItemPage/>
            },
            {
                path: 'products/edit/:id',
                element: <EditItemPage/>
            },
            {
                path: 'orders'
                // element: <OrdersPage/> todo
            },
            {
                path: 'customers'
                // element: <CustomersPage/> todo
            },
            {
                path: 'customers/:id'
                // element: <CustomerPage/> todo
            },
            {
                path: 'analytics'
                // element: <AnalyticsPage/> todo
            },
            {
                path: '*',
                element: <NotFoundPage/>
            }
        ]
    },
    {
        path: '*',
        element: <NotFoundPage/>
    }
])
