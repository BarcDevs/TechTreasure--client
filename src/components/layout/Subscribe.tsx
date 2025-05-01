import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import send from '/assets/icons/send.svg'
import {useTranslation} from 'react-i18next'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {SubscribeForm, subscribeFormSchema} from '@/validations/subscribeForm.ts'
import {toast} from '@/hooks/use-toast.ts'
import FormInput from '@/components/shared/FormInput.tsx'
import {Form} from '@/components/ui/form.tsx'
import {subscribe} from '@/api/contact.ts'

const Subscribe = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)
    const form = useForm<SubscribeForm>({
        resolver: zodResolver(subscribeFormSchema),
        defaultValues: {
            email: ''
        }
    })

    const onSubmit = async (data: SubscribeForm) => {
        try {
            toast({
                title: 'Successfully subscribed',
                description: await subscribe(data),
                variant: 'success'
            })

            form.reset({ email: '' })
        } catch (error: Error | any) {
            toast({
                title: 'Error subscribing',
                description:
                    error.response?.data.message.includes('duplicate') ?
                        'You are already subscribed' :
                        error.response?.data.message ||
                        error?.message ||
                        'Something went wrong. Please try again.',
                variant: 'destructive'
            })
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <div className="flex flex-col gap-1">
                    <div className={'flex_row gap-2'}>
                        <FormInput
                            formControl={form.control}
                            name="email"
                            type="email"
                            className="no-focus w-[180px] bg-black pl-4 font-poppins text-base font-normal leading-normal text-neutral-50 opacity-40 outline-none placeholder:text-neutral-50"
                            placeholder={t(GLOBAL_LOCALES.emailPlaceholder)}
                            hideError
                        />
                        <button type={'submit'}>
                            <img src={send} alt="send"/>
                        </button>
                    </div>

                    {form.formState.errors.email && (
                        <span className="min-h-[20px] p-1 text-sm text-red-500">
                            {form.formState.errors.email.message?.toString()}
                        </span>
                    )}
                </div>
            </form>
        </Form>
    )
}

export default Subscribe
