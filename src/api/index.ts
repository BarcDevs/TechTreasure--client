import axios from 'axios'
import Cookies from 'js-cookie'
import {QueryClient} from '@tanstack/react-query'

const SERVER_URL = import.meta.env.VITE_SERVER_URL
const api = axios.create({
    baseURL: `${SERVER_URL}/api`,
    withCredentials: true,
    headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
    }
})

api.interceptors.response.use(
    response => response,
    error => {
        const errorData = error.response?.data

        if (errorData?.message === 'jwt expired' ||
            (errorData?.status === 'failed' && errorData?.message === 'jwt expired')) {

            console.log('JWT token expired, logging out user')

            Cookies.remove('token')

            window.location.href = '/login'

            return Promise.reject(new Error('Your session has expired. Please log in again.'))
        }

        return Promise.reject(error)
    }
)

export const queryClient = new QueryClient

export default api
