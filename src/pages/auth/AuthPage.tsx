import SignupForm from '@/components/auth/SignupForm.tsx'
import LoginForm from '@/components/auth/LoginForm.tsx'

const AuthPage = ({type}: { type: 'login' | 'signup' }) => (
    <main className={'flex-center-row'}>
        <div className={'max-md:hidden md:w-[50vw]'}>
            <img src="/assets/images/auth-side-image.png" alt="side-image"/>
        </div>
        <div className={'flex-center w-[50vw]'}>
            {type === 'signup' ? <SignupForm/> : <LoginForm/>}
        </div>
    </main>
)


export default AuthPage
