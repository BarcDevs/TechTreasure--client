import api from '@/api/index.ts'
import {ContactForm} from '@/validations/contactForm.ts'
import {SubscribeForm} from '@/validations/subscribeForm.ts'

export const sendContactForm = async (contactForm: ContactForm) => {
    const response = await api.post(`/contact`,
        contactForm
    )
    return response.data.data.message
}

export const subscribe = async (subscribeForm: SubscribeForm) => {
    const response = await api.post(`/contact/subscribe`,
        subscribeForm
    )
    return response.data.data.message
}
