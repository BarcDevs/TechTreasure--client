import {createBrowserRouter} from 'react-router-dom'
import RootLayout from '@/pages/layouts/RootLayout.tsx'
import HomePage from '@/pages/HomePage.tsx'
import WishlistPage from '@/pages/WishlistPage.tsx'
import CartPage from '@/pages/CartPage.tsx'
import CheckoutPage from '@/pages/CheckoutPage.tsx'
import ItemPage from '@/pages/ItemPage.tsx'
import ProductsPage from '@/pages/admin/ProductsPage.tsx'
import AdminLayout from '@/pages/layouts/AdminLayout.tsx'
import AddItemPage from '@/pages/admin/AddItemPage.tsx'
import EditItemPage from '@/pages/admin/EditItemPage.tsx'
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
import AdminHomePage from '@/pages/admin/AdminHomePage.tsx'
import OrdersPage from '@/pages/admin/OrdersPage.tsx'
import CustomersPage from '@/pages/admin/CustomersPage.tsx'
import CustomerProfilePage from '@/pages/admin/CustomerPage.tsx'
import AnalyticsPage from '@/pages/admin/AnalyticsPage.tsx'
import ordersLoader from '@/loaders/ordersLoader.ts'
import accountLoader from '@/loaders/accountLoader.ts'
import customersLoader from '@/loaders/customersLoader.ts'
import analyticsLoader from '@/loaders/analyticsLoader.ts'
import ErrorPage from '@/pages/ErrorPage.tsx'
import dashboardLoader from '@/loaders/dashboardLoader.ts'
import InquiriesPage from '@/pages/admin/InquiriesPage.tsx'
import inquiriesLoader from '@/loaders/inquiriesLoader.ts'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage />,
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
                loader: accountLoader
            },
            {
                path: 'account/:id',
                element: <AccountPage/>
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
        path: 'admin',
        element: <AdminLayout/>,
        loader: () => {
            const authState = JSON.parse(localStorage.getItem('auth-state') || '{}')
            store.dispatch(loadAuthState(authState))
            return authState
        },
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <AdminHomePage/>,
                loader: dashboardLoader
            },
            {
                path: 'products',
                element: <ProductsPage/>
            },
            {
                path: 'products/low-stock',
                element: <ProductsPage/>,
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
                path: 'orders',
                element: <OrdersPage/>,
                loader: ordersLoader
            },
            {
                path: 'customers',
                element: <CustomersPage/>,
                loader: customersLoader
            },
            {
                path: 'customers/:id',
                element: <CustomerProfilePage/>
            },
            {
                path: 'inquiries',
                element: <InquiriesPage/>,
                loader: inquiriesLoader
            },
            {
                path: 'analytics',
                element: <AnalyticsPage/>,
                loader: analyticsLoader
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
