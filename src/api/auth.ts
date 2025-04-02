import api from '@/api/index.ts'
import Cookies from 'js-cookie'

export const login = async ({email, password}: { email: string, password: string }) => {
    const response = await api.post('/auth/login', {email, password})
    return response.data
}

export const signup = async ({name, email, password, role}:
                             { name: string, email: string, password: string, role: 'user' | 'seller' }) => {
    const response = await api.post('/auth/signup', {name, email, password, role})
    return response.data
}

export const storeToken = (token: string) =>
    Cookies.set('token', token, {
        expires: Number(import.meta.env.VITE_JWT_EXPIRATION) || 7,
        secure: true,
        sameSite: 'strict'
    })
