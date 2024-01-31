import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {LoginForm as LoginFormType, loginFormSchema as formSchema} from '@/validations/authForm.ts'
import {Form} from "@/components/ui/form"
import FormInput from '@/components/shared/FormInput.tsx'
import Button from '@/components/elements/Button.tsx'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {AUTH_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {login} from '@/api/auth.ts'
import {useLogin} from '@/hooks/useLogin.ts'
import ErrorMessage from '@/components/elements/ErrorMessage.tsx'
import {getErrorMessage} from '@/lib/utils/error.ts'

const LoginForm = ({}) => {
    const inputStyle = 'p-0 rounded-b-none border-x-0 border-t-0 border-black/50'
    const {t} = useTranslation(I18N_NAMESPACES.authPage)

    const {mutate, error, isError} = useLogin(login)

    const form = useForm<LoginFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: LoginFormType) => {
        mutate(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[370px] flex-col gap-10 space-y-8">
                <div className={'flex-col-start gap-6'}>
                    <h2 className={'text-big-medium'}>{t(AUTH_LOCALES.headlineLogin)}</h2>
                    <p className={'text-body'}>{t(AUTH_LOCALES.subheadingLogin)}</p>
                </div>
                <FormInput name={'email'} placeholder={t(AUTH_LOCALES.email)} type={'email'} className={inputStyle}
                           formControl={form.control}/>
                <FormInput name={'password'} placeholder={t(AUTH_LOCALES.password)} type={'password'}
                           className={inputStyle}
                           formControl={form.control}/>
                <div className={'flex-row-between gap-4'}>
                    <Button className={'capitalize'} type="submit" text={t(AUTH_LOCALES.login)}/>
                    <Button className={'text-body bg-neutral-50 px-0 text-red-500'}
                            text={t(AUTH_LOCALES.forgotPassword)}/>
                </div>
                {isError && <ErrorMessage message={getErrorMessage(error)}/>}
                <Button className={'w-full'} variant={'white'}
                        text={`${t(AUTH_LOCALES.login)} ${t(AUTH_LOCALES.withGoogle)}`}/>
                <div className={'flex-center-row gap-4'}>
                    <p className={'text-body'}>{t(AUTH_LOCALES.alreadyHaveAccount)}</p>
                    <Link to={'/signup'} className={'text-body-medium underline'}>{t(AUTH_LOCALES.signup)}</Link>
                </div>
            </form>
        </Form>
    )
}

export default LoginForm
