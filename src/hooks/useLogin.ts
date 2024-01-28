import {MutationFunction, useMutation} from '@tanstack/react-query'
import {storeToken} from '@/api/auth.ts'
import {loginAction} from '@/store/authSlice.ts'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'

export const useLogin = (loginCallback: MutationFunction<any, any>) => {
    const isLoggedIn = useSelector((state: any) => state.auth.isAuthenticated)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn)
            navigate('/', {replace: true})
    }, [])

    return useMutation({
        mutationFn: loginCallback,
        onSuccess: (res) => {
            dispatch(loginAction(res.data.user))
            storeToken(res.token)
            navigate('/', {replace: true})
        }
    })
}
