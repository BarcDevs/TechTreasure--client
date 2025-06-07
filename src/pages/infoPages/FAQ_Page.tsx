import {Link} from 'react-router-dom'
import Button from '@/components/elements/Button.tsx'
import {useTranslation} from 'react-i18next'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {FAQ} from '@/constants/supportContent.ts'
import FAQ_Card from '@/components/supportContent/FAQ_Card.tsx'

const FAQ_Page = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)

    return (
        <main className={'flex-center-col mx-10 gap-20'}>
            <div className={'mt-[10px] w-full flex-col gap-10'}>
                <div className={'flex-center mb-10 mt-5'}>
                    <h1 className={'text-big-semibold'}>
                        Frequently Asked Questions
                    </h1>
                </div>

                <div className="space-y-6">
                    {FAQ.map((faq) => (
                        <FAQ_Card FAQ_Section={faq}/>
                    ))}
                </div>
            </div>
            <Link to={'/'}>
                <Button text={t(GLOBAL_LOCALES.backToHome)}/>
            </Link>
        </main>
    )
}


export default FAQ_Page
