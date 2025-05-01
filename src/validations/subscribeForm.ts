import * as z from "zod"

const subscribeFormSchema = z.object({
    email: z.string().email({message: "Must be a valid email"}),
})

export type SubscribeForm = z.infer<typeof subscribeFormSchema>

export {subscribeFormSchema}
