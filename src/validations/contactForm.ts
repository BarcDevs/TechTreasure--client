import * as z from 'zod'
// TODO: add translations for error messages
const contactFormSchema = z.object({
    name: z.string()
        .min(5, 'Name is required'),
    email: z.string()
        .min(1, {message: 'Email address is required'})
        .email({message: 'Must be a valid email'}),
    phone: z.string()
        .min(1, {message: 'Phone number is required'})
        .min(10, {message: 'Phone number is too short'})
        .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {message: 'Must be a valid phone number'}),
    message: z.string()
        .min(5, 'Message must be at least 5 characters')
})


export type ContactForm = z.infer<typeof contactFormSchema>

export {contactFormSchema}
