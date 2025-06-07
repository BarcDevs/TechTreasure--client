import {Link} from 'react-router-dom'
import Button from '@/components/elements/Button.tsx'
import {useTranslation} from 'react-i18next'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import PrivacyBody from '@/components/supportContent/PrivacyBody.tsx'
import PrivacyHeadline from '@/components/supportContent/PrivacyHeadline.tsx'
import {PRIVACY_RULES} from '@/constants/supportContent.ts'
import {SUPPORT_DETAILS} from '@/constants/footer.ts'

const PrivacyPage = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)

    return (
        <main className={'flex-center-col gap-20'}>
            <div className={'flex-center-col mt-[50px] gap-10'}>
                <section className="mx-10 rounded-lg bg-white p-6 shadow">
                    <h1 className="mb-4 text-3xl font-bold text-blue-600">
                        Privacy Policy
                    </h1>

                    {PRIVACY_RULES.map((rule) => (
                        <>
                            <PrivacyHeadline>
                                {rule.headline}
                            </PrivacyHeadline>
                            <PrivacyBody>
                                {rule.body}
                            </PrivacyBody>
                        </>
                    ))}
                    <PrivacyHeadline>
                        5. How You Can Contact Us
                    </PrivacyHeadline>
                    <PrivacyBody>
                        If you have any questions about our Privacy Policy, contact us at <a
                        href={`mailto:${SUPPORT_DETAILS.email}`} className="text-blue-500">
                        support@techtreasure.com
                    </a>.
                    </PrivacyBody>
                </section>
            </div>
            <Link to={'/'}>
                <Button text={t(GLOBAL_LOCALES.backToHome)}/>
            </Link>
        </main>
    )
}


export default PrivacyPage
