
import {GLOBAL_LOCALE_KEYS, I18N_NAMESPACES} from '@/constants'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import LanguagePicker from '@/components/shared/LanguagePicker.tsx'


const Top = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)

    return (
        <div className="flex h-fit w-full items-center justify-around bg-black py-3">
            <div className={'w-[100px] max-md:hidden'}/>
            <div className="flex items-center justify-center gap-2">
                <div
                    className="h-fit w-fit text-small text-neutral-50">
                    {t(GLOBAL_LOCALE_KEYS.promo)}
                </div>
                <Link to={'/'}
                      className="text-center font-poppins text-sm font-semibold leading-normal text-neutral-50 underline max-md:hidden">
                    {t(GLOBAL_LOCALE_KEYS.shopNow)}
                </Link>
            </div>

            <div className="flex w-[100px] items-center justify-center gap-[5px]">
                <LanguagePicker/>

                <Link to={'/'}
                      className="text-center font-poppins text-sm font-semibold leading-normal text-neutral-50 underline md:hidden">
                    {t(GLOBAL_LOCALE_KEYS.shopNow)}
                </Link>
            </div>
        </div>
    )
}


export default Top
