import {RouterProvider} from 'react-router-dom'
import {router} from '@/router/router'
import {QueryClientProvider} from '@tanstack/react-query'
import {queryClient} from '@/api'
import {useLocalRedux} from '@/hooks/useLocalRedux'
import ErrorBoundary from '@/components/error/ErrorBoundary'
import {Toaster} from '@/components/ui/toaster'

import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from '@/store'

function App() {
    useLocalRedux()

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    <ErrorBoundary>
                        <RouterProvider router={router} />
                        <Toaster />
                    </ErrorBoundary>
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    )
}

export default App
