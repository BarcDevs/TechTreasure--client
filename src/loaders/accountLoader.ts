import store from '@/store'
import {loadAuthState} from '@/store/authSlice.ts'

const accountLoader = () => {
    const authState = JSON.parse(localStorage.getItem('auth-state') || '{}')
    store.dispatch(loadAuthState(authState))
    return authState
}

export default accountLoader
