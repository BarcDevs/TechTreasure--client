import {RouterProvider} from 'react-router-dom'
import {router} from '@/router/router.tsx'
import {QueryClientProvider} from '@tanstack/react-query'
import {queryClient} from '@/api'
import {useLocalRedux} from '@/hooks/useLocalRedux.ts'
import ErrorBoundary from '@/components/error/ErrorBoundary.tsx'
import {Toaster} from '@/components/ui/toaster.tsx'

function App() {
    useLocalRedux()

    return (
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
                <RouterProvider router={router}/>
                <Toaster/>
            </ErrorBoundary>
        </QueryClientProvider>
    )
}

export default App
