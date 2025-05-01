import api from '@/api/index.ts'
import {ContactForm} from '@/validations/contactForm.ts'

export const sendContactForm = async (contactForm: ContactForm) => {
    const response = await api.post(`/contact`,
        contactForm
    )
    return response.data.data.message
}
