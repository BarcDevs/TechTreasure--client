import {MutationFunction, useMutation} from '@tanstack/react-query'
import {storeToken} from '@/api/auth.ts'
import {loginAction} from '@/store/authSlice.ts'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export const useLogin = (loginCallback: MutationFunction<any, any>) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: loginCallback,
        onSuccess: (res) => {
            dispatch(loginAction(res.data.user))
            storeToken(res.token)
            navigate('/', {replace: true})
        }
    })
}
