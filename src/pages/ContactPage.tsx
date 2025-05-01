import {Link} from 'react-router-dom'
import {I18N_NAMESPACES} from '@/constants/locales.ts'
import {useTranslation} from 'react-i18next'
import NavigationButton from '@/components/elements/Button.tsx'
import ContactForm from '@/components/contact/Form.tsx'
import ContactDetails from '@/components/contact/ContactDetails.tsx'

const ContactPage = () => {
    // todo: add translations
    const {t} = useTranslation(I18N_NAMESPACES.contact)

    return (
        <div className="mx-auto max-w-5xl p-6">
            <h1 className="mb-6 text-center text-3xl font-bold">Contact Us</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ContactDetails/>

                <ContactForm/>
            </div>

            <div className={'flex_row flex-center mt-6'}>
                <Link to={'/'}>
                    <NavigationButton text={t('backToHome', {ns: I18N_NAMESPACES.global})}/>
                </Link>
            </div>
        </div>
    )
}


export default ContactPage
