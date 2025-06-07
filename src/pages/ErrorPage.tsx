import {useRouteError} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {IRootState} from '@/store'

type RouteError = {
    statusText?: string;
    message?: string;
    status?: number;
}

const ErrorPage = () => {
    const error = useRouteError() as RouteError & { data?: string }
    const isServerError = error.status === 500

    const isAdmin = useSelector((state: IRootState) => state.auth.isAdmin)

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
                <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-red-100">
                    <svg
                        className="size-8 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>

                <h1 className="mb-2 text-2xl font-bold text-gray-800">
                    {isServerError ? 'Server Error' : 'Oops!'}
                </h1>

                <p className="mb-3 text-gray-600">
                    Sorry, an unexpected error has occurred.
                </p>

                {/*error message*/}
                <p className="mb-6 italic text-gray-500">
                    {isAdmin &&
                        error.statusText ||
                        error.data ||
                        error.toString() ||
                        'Unknown error occurred. Please try again later.'}
                </p>

                <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                    <button
                        onClick={() => window.history.back()}
                        className="w-full rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-800 transition duration-150 ease-in-out hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full cursor-pointer rounded-md bg-blue-500 px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Reload Page
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
