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

export const queryClient = new QueryClient

export default api
