import * as z from "zod"

const CREDIT_CARD_REGEX = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|(5018|5081|5044|5020|5038|603845|6304|6759|676[1-3]|6799|6220|504834|504817|504645)[0-9]{8,15})[-\s]?[0-9]*$/

const checkoutFormSchema = z.object({
    name: z.string()
        .min(1, {message: "Name is required"})
        .min(2, {message: "Name is too short"}),
    company: z.string().optional(),
    address: z.string()
        .min(1, {message: "Address is required"})
        .min(5, {message: "Address is too short"})
        .regex(/^[#.0-9a-zA-Z\s,-]+$/, {message: "Invalid address"}),
    additional_address: z.string().optional(),
    city: z.string()
        .min(1, {message: "City is required"})
        .min(2, {message: "City name is too short"})
        .regex(/^[a-zA-Z\s]+$/, {message: "Invalid city"}),
    country: z.string()
        .min(1, {message: "Country is required"})
        .min(2, {message: "Country name is too short"})
        .regex(/^[a-zA-Z\s]+$/, {message: "Invalid country"}),
    postcode: z.string(),
    phone: z.string()
        .min(1, {message: "Phone number is required"})
        .min(10, {message: "Phone number is too short"})
        .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {message: "Must be a valid phone number"}),
    email: z.string()
        .min(1, {message: "Email address is required"})
        .email({message: "Must be a valid email"})
})

const creditCardFormSchema = z.object({
    card_number: z.string()
        .min(1, {message: "Card number is required"})
        .regex(CREDIT_CARD_REGEX, {message: "Invalid card number"}),
    cvc: z.string()
        .min(1, {message: "CVC is required"})
        .regex(/^[0-9]{3,4}$/, {message: "Invalid CVC"}),
    expiry_month: z.string()
        .min(2, {message: "Month is required"}),
    expiry_year: z.string()
        .min(2, {message: "Year is required"})
})

export type CheckoutForm = z.infer<typeof checkoutFormSchema>
export type CreditCardForm = z.infer<typeof creditCardFormSchema>
export {checkoutFormSchema, creditCardFormSchema}
