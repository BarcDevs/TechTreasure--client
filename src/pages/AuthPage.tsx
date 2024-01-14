import SignupForm from '@/components/auth/SignupForm.tsx'

const AuthPage = ({type}: { type: 'login' | 'signup' }) => (
    <main className={'flex-center-row'}>
        <div className={'max-md:hidden md:w-[50vw]'}>
            <img src="/assets/images/auth-side-image.png" alt="side-image"/>
        </div>
        <div className={'flex-center w-[50vw]'}>
            {type === 'signup' ? <SignupForm/> : /*<LoginForm/>*/ null}
        </div>
    </main>
)


export default AuthPage
