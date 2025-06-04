import {Component, ErrorInfo, ReactNode} from 'react'

type ErrorBoundaryProps = {
    children: ReactNode;
    fallback?: ReactNode;
}

type ErrorBoundaryState = {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = {hasError: false}
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {hasError: true, error}
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Error caught by boundary:', error, errorInfo)
    }

    render(): ReactNode {
        if (this.state.hasError) {
            const isServerOffline = this.state.error?.message.includes('Server is offline')

            return this.props.fallback || (
                <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
                        <div
                            className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-red-100">
                            <svg
                                className="size-6 text-red-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                        </div>

                        <h2 className="mb-2 text-center text-xl font-semibold text-gray-800">
                            {isServerOffline ? 'Server Offline' : 'Something went wrong'}
                        </h2>
                        <p className="mb-6 text-center text-gray-600">
                            {isServerOffline ?
                                'We are unable to connect to the server. Please try again later.' :
                                'We apologize for the inconvenience. The application encountered an unexpected error.'}
                        </p>

                        <button
                            onClick={() => window.location.reload()}
                            className="w-full rounded-md bg-blue-500 px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Reload the page
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
