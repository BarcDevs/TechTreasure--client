import {CheckoutForm} from '@/validations/checkoutForm.ts'

export type CarouselRef = {
    next: () => void
    prev: () => void
}

interface FormRef {
    submit: () => void
}

export interface CheckoutFormRef extends FormRef {
    submit: () => CheckoutForm | undefined
}
