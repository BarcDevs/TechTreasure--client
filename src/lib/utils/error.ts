import {AxiosError} from 'axios'

export const getErrorMessage = (error: Error) => {
    if (import.meta.env.NODE_ENV !== 'production') console.error(error)
    return error instanceof AxiosError ? error.response?.data.message : 'Something went wrong. Please try again later.'
}
