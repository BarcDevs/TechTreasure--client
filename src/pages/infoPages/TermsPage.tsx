import {Link} from 'react-router-dom'
import Button from '@/components/elements/Button.tsx'
import {useTranslation} from 'react-i18next'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'

const TermsPage = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)

    return (
        <main className={'flex-center-col gap-20'}>
            <div className={'flex-center-col mt-[50px] gap-10'}>
                <section className="bg-white p-6 rounded-lg shadow mb-6">
                    <h1 className="text-3xl font-bold text-blue-600 mb-4">Terms of Use</h1>
                    <h2 className="text-xl font-semibold text-gray-800 mt-4">1. Use of Website</h2>
                    <p className="text-gray-600">You must be at least 18 years old to use this website. You agree not to
                        use our site for any illegal or unauthorized purpose.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">2. Account Responsibility</h2>
                    <p className="text-gray-600">You are responsible for maintaining the security of your account and
                        password. We are not liable for any loss resulting from unauthorized use.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">3. Changes to Terms</h2>
                    <p className="text-gray-600">We reserve the right to update these terms at any time. Continued use
                        of the site after changes means you accept the new terms.</p>
                </section>
            </div>
            <Link to={'/'}>
                <Button text={t(GLOBAL_LOCALES.backToHome)}/>
            </Link>
        </main>
    )
}


export default TermsPage
