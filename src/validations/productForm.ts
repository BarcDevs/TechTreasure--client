import * as z from 'zod'

const NUMBER_REGEX = /^-?\d*(\.\d*)?$/

const formImage = z.instanceof(File).or(z.object(
    {
        image: z.instanceof(File),
        color: z.string()
    }))

const productFormSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.string().min(0, 'Price is required'),
    shippingFee: z.string()
        .regex(NUMBER_REGEX, 'Must be a number')
        .optional(),
    stock: z.string()
        .regex(NUMBER_REGEX, 'Must be a number')
        .optional(),
    category: z.string().min(1, 'Category is required'),
    colors: z.array(
        z.object({
            name: z.string().min(1, 'Color name is required'),
            hex: z.string().min(1, 'Color hex is required')
        })
    ).optional(),
    sizes: z.array(z.string()).optional(),
    mainImage: z.array(formImage).min(1, 'Main image is required'),
    images: z.array(formImage).optional(),
    sale: z.string()
        .regex(NUMBER_REGEX, 'Must be a number')
        .optional(),
    saleEndsAt: z.date().optional(),
    isNew: z.boolean().default(false)
}).superRefine(({sale, saleEndsAt}, ctx) => {
    if (sale && Number(sale) > 0 && !saleEndsAt) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Cannot have a sale without an end date'
        })
    }
})

export type ProductForm = z.infer<typeof productFormSchema>
export {productFormSchema}
