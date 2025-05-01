import {useTranslation} from 'react-i18next'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {Link} from 'react-router-dom'
import Button from '@/components/elements/Button.tsx'

const ComingSoon = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)

    return (
        <main className={'flex-center-col gap-20'}>
            <div className={'flex-center-col mt-20 gap-10'}>
                <h1 className={'text-4xl'}>
                    Coming Soon
                </h1>
                {/*</p>*/}
            </div>
            <Link to={'/'}>
                <Button text={t(GLOBAL_LOCALES.backToHome, {ns: I18N_NAMESPACES.global})}/>
            </Link>
        </main>
    )
}

export default ComingSoon
