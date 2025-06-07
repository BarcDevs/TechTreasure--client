import {Link} from 'react-router-dom'
import Button from '@/components/elements/Button.tsx'
import {useTranslation} from 'react-i18next'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'

const PrivacyPage = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)

    return (
        <main className={'flex-center-col gap-20'}>
            <div className={'flex-center-col mt-[50px] gap-10'}>
                <section className="bg-white p-6 rounded-lg shadow">
                    <h1 className="text-3xl font-bold text-blue-600 mb-4">
                        Privacy Policy
                    </h1>
                    <h2 className="text-xl font-semibold text-gray-800 mt-4">
                        1. Information We Collect
                    </h2>
                    <p className="text-gray-600">We collect personal information such as name, email, and payment
                        details when you make a purchase or sign up for an account.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">
                        2. How We Use Your Information
                    </h2>
                    <p className="text-gray-600">Your information is used to process orders, improve our services, and
                        send promotional offers. We do not sell your data to third parties.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">
                        3. Security Measures
                    </h2>
                    <p className="text-gray-600">We use encryption and secure servers to protect your personal
                        information. However, no online transmission is 100% secure.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">
                        4. Contact Us
                    </h2>
                    <p className="text-gray-600">If you have any questions about our Privacy Policy, contact us at <a
                        href="mailto:support@techtreasure.com" className="text-blue-500">support@techtreasure.com</a>.
                    </p>
                </section>
            </div>
            <Link to={'/'}>
                <Button text={t(GLOBAL_LOCALES.backToHome)}/>
            </Link>
        </main>
    )
}


export default PrivacyPage
