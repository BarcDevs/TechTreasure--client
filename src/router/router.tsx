import {createBrowserRouter} from 'react-router-dom'
import RootLayout from '@/pages/layouts/RootLayout.tsx'
import HomePage from '@/pages/HomePage.tsx'
import ShopLayout from '@/pages/layouts/ShopLayout.tsx'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                path: '',
                children: [{
                    path: 'login',
                    // element: <LoginPage/>
                },
                    {
                        path: 'signup',
                        // element: <SignupPage/>
                    }]
            },
            {
                path: '',
                element: <ShopLayout/>,
                children: [
                    {
                        index: true,
                        element: <HomePage/>
                    }
                ]
            }
        ]
    }
])
