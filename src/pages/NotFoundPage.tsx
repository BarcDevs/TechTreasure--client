import {useTranslation} from 'react-i18next'
import {I18N_NAMESPACES} from '@/constants/locales.ts'
import {Link} from 'react-router-dom'
import Button from '@/components/elements/Button.tsx'

const NotFoundPage = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)
    return (
        <main className={'flex-center-col gap-20'}>
            <div className={'flex-center-col mt-[250px] gap-10'}>
                <h1
                    className="font-inter text-[110px] font-medium leading-[115px] tracking-[3.30px] text-black">
                    {t('notFoundHeadline')}
                </h1>
                <p className={'text-body text-black'}>
                    {t('notFoundText')}
                </p>
            </div>
            <Link to={'/'}>
                <Button text={t('backToHome')}/>
            </Link>
        </main>
    )
}


export default NotFoundPage
