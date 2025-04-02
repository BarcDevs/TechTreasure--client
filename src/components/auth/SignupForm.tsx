import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {SignupForm as SignupFormType, signupFormSchema as formSchema} from '@/validations/authForm.ts'
import {Form} from '@/components/ui/form'
import FormInput from '@/components/shared/FormInput.tsx'
import Button from '@/components/elements/Button.tsx'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {AUTH_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {signup} from '@/api/auth.ts'
import {useLogin} from '@/hooks/useLogin.ts'
import ErrorMessage from '@/components/elements/ErrorMessage.tsx'
import {getErrorMessage} from '@/lib/utils/error.ts'
import {Checkbox} from '@/components/ui/checkbox.tsx'
import {useState} from 'react'

const SignupForm = ({}) => {
    const inputStyle = 'p-0 rounded-b-none border-x-0 border-t-0 border-black/50'
    const {t} = useTranslation(I18N_NAMESPACES.authPage)
    const [isSeller, setIsSeller] = useState(false)
    const form = useForm<SignupFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            role: 'user',
        }
    })

    const {mutate, error, isError} = useLogin(signup)

    const onSubmit = (values: SignupFormType) => {
        mutate({ ...values, role: isSeller ? 'seller' : 'user' })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[370px] flex-col gap-10 space-y-8">
                <div className={'flex-col-start gap-6'}>
                    <h2 className={'text-big-medium'}>{t(AUTH_LOCALES.headlineSignup)}</h2>
                    <p className={'text-body'}>{t(AUTH_LOCALES.subheadingSignup)}</p>
                </div>
                <FormInput name={'name'} placeholder={t(AUTH_LOCALES.name)} className={inputStyle}
                           formControl={form.control}/>
                <FormInput name={'email'} placeholder={t(AUTH_LOCALES.email)} type={'email'} className={inputStyle}
                           formControl={form.control}/>
                <FormInput name={'password'} placeholder={t(AUTH_LOCALES.password)} type={'password'}
                           className={inputStyle}
                           formControl={form.control}/>
                <FormInput name={'passwordConfirm'} placeholder={t(AUTH_LOCALES.confirmPassword)} type={'password'}
                           className={inputStyle}
                           formControl={form.control}/>
                <div className="flex items-center gap-2">
                    <Checkbox id="seller-checkbox"
                              checked={isSeller}
                              onCheckedChange={(checked) => setIsSeller(checked as boolean)}
                    />
                    <label htmlFor="seller-checkbox"
                           className="text-sm">
                        {/*todo: add translation*/}
                        Sign up as a seller
                    </label>
                </div>

                <div className={'flex_col gap-4'}>
                    <Button className={'w-full capitalize'} type="submit" text={t(AUTH_LOCALES.createAccount)}/>
                    <Button className={'w-full'} variant={'white'} type={'button'}
                            text={`${t(AUTH_LOCALES.signup)} ${t(AUTH_LOCALES.withGoogle)}`}/>
                </div>
                {isError && <ErrorMessage
                    message={getErrorMessage(error)}/>}
                <div className={'flex-center-row gap-4'}>
                    <p className={'text-body'}>{t(AUTH_LOCALES.alreadyHaveAccount)}</p>
                    <Link to={'/login'} className={'text-body-medium underline'}>{t(AUTH_LOCALES.login)}</Link>
                </div>
            </form>
        </Form>
    )
}

export default SignupForm
