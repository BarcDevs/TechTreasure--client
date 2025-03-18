import * as z from 'zod'
// TODO: add translations for error messages
const profileFormSchema = z.object({
    name: z.string()
        .min(5, 'Name is required'),
    email: z.string()
        .min(1, {message: 'Email address is required'})
        .email({message: 'Must be a valid email'}),
    address: z.string()
        .min(5, 'Must be a valid address'),
    currentPassword: z.string()
        .min(1, {message: 'Current password is required'})
        .min(8, {message: 'Current password is invalid'})
        .max(50),
    newPassword: z.string()
        .min(8, {message: "Password must be at least 8 characters long"})
        .max(50)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            {message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"}),
    confirmPassword: z.string()
}).superRefine((({newPassword, confirmPassword}, ctx) => {
    if (newPassword !== confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords does not match",
        })
    }
}))

export type ProfileForm = z.infer<typeof profileFormSchema>

export {profileFormSchema}
