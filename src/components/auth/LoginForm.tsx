import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {LoginForm as LoginFormType, loginFormSchema as formSchema} from '@/validations/authForm.ts'
// import {useSubmit} from 'react-router-dom'
import {Form} from "@/components/ui/form"
import FormInput from '@/components/shared/FormInput.tsx'
import Button from '@/components/elements/Button.tsx'
import {Link} from 'react-router-dom'

const LoginForm = ({}) => {
    const inputStyle = 'p-0 rounded-b-none border-x-0 border-t-0 border-black/50'
    // const submit = useSubmit()
    const form = useForm<LoginFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: LoginFormType) => {
        console.log(values)
        // submit(values, {method: 'post', action: '/signup'})
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[370px] flex-col gap-10 space-y-8">
                <div className={'flex-col-start gap-6'}>
                    <h2 className={'text-big-medium'}>Log in to TechTreasure</h2>
                    <p className={'text-body'}>Enter your details below</p>
                </div>
                <FormInput name={'email'} placeholder={'Email'} type={'email'} className={inputStyle}
                           formControl={form.control}/>
                <FormInput name={'password'} placeholder={'Password'} type={'password'} className={inputStyle}
                           formControl={form.control}/>
                <div className={'flex-row-between gap-4'}>
                    <Button type="submit" text={'Log in'}/>
                    <Button className={'text-body bg-neutral-50 px-0 text-red-500'} text={'Forgot Password?'}/>
                </div>
                <Button className={'w-full border border-black bg-neutral-50 text-black'}
                        text={'Sign up with Google'}/>
                <div className={'flex-center-row gap-4'}>
                    <p className={'text-body'}>Don't have an account?</p>
                    <Link to={'/login'} className={'text-body-medium underline'}>Sign up</Link>
                </div>
            </form>
        </Form>
    )
}

export default LoginForm
