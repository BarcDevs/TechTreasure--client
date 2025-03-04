import {createBrowserRouter} from 'react-router-dom'
import RootLayout from '@/pages/layouts/RootLayout.tsx'
import HomePage from '@/pages/HomePage.tsx'
import NotFoundPage from '@/pages/NotFoundPage.tsx'
import AuthPage from '@/pages/AuthPage.tsx'
import WishlistPage from '@/pages/WishlistPage.tsx'
import CartPage from '@/pages/CartPage.tsx'
import CheckoutPage from '@/pages/CheckoutPage.tsx'
import ItemPage from '@/pages/ItemPage.tsx'
import ProductsPage from '@/pages/seller/ProductsPage.tsx'
import SellerLayout from '@/pages/layouts/SellerLayout.tsx'
import AddItemPage from '@/pages/seller/AddItemPage.tsx'
import EditItemPage from '@/pages/seller/EditItemPage.tsx'
import Logout from '@/pages/Logout.ts'
import store from '@/store'
import {loadAuthState} from '@/store/authSlice.ts'
import SuccessPage from '@/pages/SuccessPage.tsx'
import AboutUsPage from '@/pages/AboutUsPage.tsx'
import FAQ_Page from '@/pages/FAQ_Page.tsx'
import TermsPage from '@/pages/TermsPage.tsx'
import PrivacyPage from '@/pages/PrivacyPage.tsx'
import ContactPage from '@/pages/ContactPage.tsx'
import CategoriesPage from '@/pages/CategoriesPage.tsx'

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
                path: 'account/:id'
                // element: <AccountPage/>
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
                    },
                    {
                        path: ':id'
                        // element: <CategoryPage/>
                    }
                ]
            },
            {
                path: 'items',
                children: [
                    {
                        path: ''
                        // element: <ItemsPage/>
                    },
                    {
                        path: ':id',
                        element: <ItemPage/>
                    },
                    {
                        path: '?search'
                        // element: <ItemsPage/>
                    }
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
                path: 'settings'
                // element: <SettingsPage/> todo
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
