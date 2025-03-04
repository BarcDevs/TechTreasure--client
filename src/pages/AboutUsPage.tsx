import {useTranslation} from 'react-i18next'
import {ABOUT_LOCALES, GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {Link} from 'react-router-dom'
import Button from '@/components/elements/Button.tsx'

const AboutUsPage = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.about)

    return (
        <main className={'flex-center-col gap-20 p-5'}>
            <div className={'flex-center-col mt-20 gap-10'}>
                <h1
                    className="font-inter text-[70px] font-medium leading-[115px] tracking-[3.30px] text-black">
                    {t(ABOUT_LOCALES.aboutUsHeadline)}
                </h1>
                <p className={'text-body text-black'}>
                    {t(ABOUT_LOCALES.aboutUsText)}
                </p>
            </div>
            <Link to={'/'}>
                <Button text={t(GLOBAL_LOCALES.backToHome, {ns: I18N_NAMESPACES.global})}/>
            </Link>
        </main>
    )
}

export default AboutUsPage
