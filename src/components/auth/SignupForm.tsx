import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {SignupForm as SignupFormType, signupFormSchema as formSchema} from '@/validations/authForm.ts'
// import {useSubmit} from 'react-router-dom'
import {Form} from "@/components/ui/form"
import FormInput from '@/components/shared/FormInput.tsx'
import Button from '@/components/elements/Button.tsx'
import {Link} from 'react-router-dom'

const SignupForm = ({}) => {
    const inputStyle = 'p-0 rounded-b-none border-x-0 border-t-0 border-black/50'
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
                    <h2 className={'text-big-medium'}>Create an account</h2>
                    <p className={'text-body'}>Enter your details below</p>
                </div>
                <FormInput name={'name'} placeholder={'Name'} className={inputStyle} formControl={form.control}/>
                <FormInput name={'email'} placeholder={'Email'} type={'email'} className={inputStyle}
                           formControl={form.control}/>
                <FormInput name={'password'} placeholder={'Password'} type={'password'} className={inputStyle}
                           formControl={form.control}/>
                <div className={'flex_col gap-4'}>
                    <Button className={'w-full'} type="submit" text={'Create Account'}/>
                    <Button className={'w-full border border-black bg-neutral-50 text-black'}
                            text={'Sign up with Google'}/>
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
