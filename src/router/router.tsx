import {createBrowserRouter} from 'react-router-dom'
import RootLayout from '@/pages/layouts/RootLayout.tsx'
import HomePage from '@/pages/HomePage.tsx'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            }
        ]
    }
])
