import {Link} from 'react-router-dom'
import Button from '@/components/elements/Button.tsx'
import {useTranslation} from 'react-i18next'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'

const NotFoundPage = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)

    return (
        <main className={'flex-center-col gap-20'}>
            <div className={'flex-center-col mt-[50px] gap-10'}>
                <h1 className="font-inter text-[110px] font-medium leading-[115px] tracking-[3.30px] text-black">
                    {/*add header here*/}
                </h1>
                <p className={'text-body p-5 text-black'}>
                    {/*add body here*/}
                </p>
            </div>
            <Link to={'/'}>
                <Button text={t(GLOBAL_LOCALES.backToHome)}/>
            </Link>
        </main>
    )
}


export default NotFoundPage
