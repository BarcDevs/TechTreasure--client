import * as z from "zod"

const signupFormSchema = z.object({
    name: z.string().min(2).max(50).regex(/^[a-zA-Z ']+$/),
    email: z.string().email(),
    password: z.string().min(8).max(50),
})

const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(50),
})

export type SignupForm = z.infer<typeof signupFormSchema>
export type LoginForm = z.infer<typeof loginFormSchema>

export {signupFormSchema, loginFormSchema}
