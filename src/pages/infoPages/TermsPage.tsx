import {Link} from 'react-router-dom'
import Button from '@/components/elements/Button.tsx'
import {useTranslation} from 'react-i18next'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {TERMS_OF_USE} from '@/constants/supportContent.ts'
import TermHeadline from '@/components/supportContent/TermHeadline.tsx'
import TermContent from '@/components/supportContent/TermContent.tsx'

const TermsPage = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)

    return (
        <main className={'flex-center-col gap-20'}>
            <div className={'flex-center-col mt-[50px] gap-10'}>
                <section className="mx-10 mb-6 rounded-lg bg-white p-6 shadow">
                    <h1 className="mb-4 text-3xl font-bold text-blue-600">
                        Terms of Use
                    </h1>

                    {
                        TERMS_OF_USE.map((term) => (
                            <>
                                <TermHeadline>
                                    {term.headline}
                                </TermHeadline>
                                <TermContent>
                                    {term.content}
                                </TermContent>
                            </>
                        ))
                    }
                </section>
            </div>
            <Link to={'/'}>
                <Button text={t(GLOBAL_LOCALES.backToHome)}/>
            </Link>
        </main>
    )
}


export default TermsPage
