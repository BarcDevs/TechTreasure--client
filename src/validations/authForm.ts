import * as z from "zod"

const signupFormSchema = z.object({
    name: z.string()
        .min(2, {message: "Name must be at least 2 characters long"})
        .max(50)
        .regex(/^[a-zA-Z ']+$/, {message: "Name can only contain letters, spaces, and apostrophes"}),
    email: z.string().email({message: "Must be a valid email"}),
    password: z.string()
        .min(8, {message: "Password must be at least 8 characters long"})
        .max(50)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            {message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"}),
    passwordConfirm: z.string()
}).superRefine((({password, passwordConfirm}, ctx) => {
    if (password !== passwordConfirm) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords do not match",
        })
    }
}))

const loginFormSchema = z.object({
    email: z.string().email({message: "Invalid email"}),
    password: z.string().min(8, {message: "Invalid password"}).max(50),
})

export type SignupForm = z.infer<typeof signupFormSchema>
export type LoginForm = z.infer<typeof loginFormSchema>

export {signupFormSchema, loginFormSchema}
