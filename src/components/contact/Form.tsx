import {Card, CardContent} from '@/components/ui/card.tsx'
import {Button} from '@/components/ui/button.tsx'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {ContactForm as ContactFormType, contactFormSchema} from '@/validations/contactForm.ts'
import FormInput from '@/components/contact/FormInput.tsx'
import {sendContactForm} from '@/api/contactForm.ts'
import {useEffect, useState} from 'react'
import {useToast} from '@/hooks/use-toast.ts'

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<ContactFormType>({
        resolver: zodResolver(contactFormSchema)
    })

    const [response, setResponse] = useState<string | null>(null)
    const {toast} = useToast()

    const onSubmit = async (data: ContactFormType) => {
        try {
            const message = await sendContactForm(data)
            setResponse(message)
        } catch (error: Error | any) {
            toast({
                title: 'Error sending message',
                description: error?.message || 'Something went wrong. Please try again.',
                variant: 'destructive'
            })
        }
    }

    useEffect(() => {
        if (response) {
            toast({
                title: 'Message Sent',
                description: response,
                variant: 'success'
            })
            setResponse(null)
        }
    }, [response])

    return (
        <Card className="p-6">
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <FormInput name={'name'}
                                   error={errors.name?.message}
                                   register={register}
                                   placeholder={'Your Name *'}
                        />
                        <FormInput name={'email'}
                                   error={errors.email?.message}
                                   register={register}
                                   placeholder={'Your Email *'}
                        />
                        <FormInput name={'phone'}
                                   error={errors.phone?.message}
                                   register={register}
                                   placeholder={'Your Phone *'}
                        />
                    </div>
                    <div>
                <textarea
                    className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={4}
                    placeholder="Your Message"
                    {...register('message')}
                />
                        {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
                    </div>
                    <Button type="submit" className="w-full bg-red-500 text-white">Send Message</Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default ContactForm
