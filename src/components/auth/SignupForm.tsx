import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {SignupForm as SignupFormType, signupFormSchema as formSchema} from '@/validations/authForm.ts'
// import {useSubmit} from 'react-router-dom'
import {Form} from "@/components/ui/form"
import FormInput from '@/components/shared/FormInput.tsx'
import Button from '@/components/elements/Button.tsx'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {AUTH_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'

const SignupForm = ({}) => {
    const inputStyle = 'p-0 rounded-b-none border-x-0 border-t-0 border-black/50'
    const {t} = useTranslation(I18N_NAMESPACES.authPage)
    // const submit = useSubmit()
    const form = useForm<SignupFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: SignupFormType) => {
        console.log(values)
        // submit(values, {method: 'post', action: '/signup'})
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[370px] flex-col gap-10 space-y-8">
                <div className={'flex-col-start gap-6'}>
                    <h2 className={'text-big-medium'}>{t(AUTH_LOCALES.headlineSignup)}</h2>
                    <p className={'text-body'}>{t(AUTH_LOCALES.subheadingSignup)}</p>
                </div>
                <FormInput name={'name'} placeholder={t(AUTH_LOCALES.name)} className={inputStyle} formControl={form.control}/>
                <FormInput name={'email'} placeholder={t(AUTH_LOCALES.email)} type={'email'} className={inputStyle}
                           formControl={form.control}/>
                <FormInput name={'password'} placeholder={t(AUTH_LOCALES.password)} type={'password'} className={inputStyle}
                           formControl={form.control}/>
                <FormInput name={'passwordConfirm'} placeholder={t(AUTH_LOCALES.confirmPassword)} type={'password'} className={inputStyle}
                           formControl={form.control}/>
                <div className={'flex_col gap-4'}>
                    <Button className={'w-full capitalize'} type="submit" text={t(AUTH_LOCALES.createAccount)}/>
                    <Button className={'w-full'} variant={'white'}
                            text={`${t(AUTH_LOCALES.signup)} ${t(AUTH_LOCALES.withGoogle)}`}/>
                </div>
                <div className={'flex-center-row gap-4'}>
                    <p className={'text-body'}>Already have an account?</p>
                    <Link to={'/login'} className={'text-body-medium underline'}>Log in</Link>
                </div>
            </form>
        </Form>
    )
}

export default SignupForm
