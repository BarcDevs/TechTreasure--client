import {createBrowserRouter} from 'react-router-dom'
import RootLayout from '@/pages/layouts/RootLayout.tsx'
import HomePage from '@/pages/HomePage.tsx'
import NotFoundPage from '@/pages/NotFoundPage.tsx'
import AuthPage from '@/pages/AuthPage.tsx'
import WishlistPage from '@/pages/WishlistPage.tsx'
import CartPage from '@/pages/CartPage.tsx'
import CheckoutPage from '@/pages/CheckoutPage.tsx'
import ItemPage from '@/pages/ItemPage.tsx'
import ProductsPage from '@/pages/admin/ProductsPage.tsx'
import AdminLayout from '@/pages/layouts/AdminLayout.tsx'
import AddItemPage from '@/pages/admin/AddItemPage.tsx'
import EditItemPage from '@/pages/admin/EditItemPage.tsx'

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
                        path: ''
                        // element: <CategoriesPage/>
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
                path: 'about'
                // element: <AboutPage/>
            },
            {
                path: 'contact'
                // element: <ContactPage/>
            },

            {
                path: '*',
                element: <NotFoundPage/>
            }
        ]
    },
    {
        path: 'admin',
        // loader: adminLoader
        element: <AdminLayout/>,
        children: [
            {
                index: true
                // element: <AdminHomePage/>
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
                // element: <OrdersPage/>
            },
            {
                path: 'customers'
                // element: <CustomersPage/>
            },
            {
                path: 'customers/:id'
                // element: <CustomerPage/>
            },
            {
                path: 'analytics'
                // element: <AnalyticsPage/>
            },
            {
                path: 'settings'
                // element: <SettingsPage/>
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
