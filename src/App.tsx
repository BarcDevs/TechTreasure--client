import {RouterProvider} from 'react-router-dom'
import {router} from '@/router/router.tsx'
import {QueryClientProvider} from '@tanstack/react-query'
import {queryClient} from '@/api'
import {useLocalRedux} from '@/hooks/useLocalRedux.ts'

function App() {
    useLocalRedux()

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    )
}

export default App
