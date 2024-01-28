import api from '@/api/index.ts'

export const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', {email, password})
    return response.data
}

export const signup = async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/signup', {name, email, password})
    return response.data
}

