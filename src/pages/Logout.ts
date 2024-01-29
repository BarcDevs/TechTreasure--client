import Cookies from 'js-cookie'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {logoutAction} from '@/store/authSlice.ts'
import {useEffect} from 'react'

const Logout = ({}) => {
    Cookies.remove('token')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(logoutAction())
        navigate('/', {replace: true})
    }, [])

    return null
}

export default Logout
