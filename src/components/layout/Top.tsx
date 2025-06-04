import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import LanguagePicker from '@/components/shared/LanguagePicker.tsx'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'


const Top = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)

    return (
        <div className="flex h-fit w-full items-center justify-around bg-black py-3">
            <div className={'w-[100px] p-3 max-md:hidden'}/>
            <div className="flex items-center justify-center gap-2 pl-1.5">
                <div
                    className="text-small size-fit text-neutral-50">
                    {t(GLOBAL_LOCALES.promo)}
                </div>
                <Link to={'/products/660dd51e612c62d3b92c2b4d'}
                      className="text-center font-poppins text-sm font-semibold leading-normal text-neutral-50 underline max-md:hidden">
                    {t(GLOBAL_LOCALES.shopNow)}
                </Link>
            </div>

            <div className="flex w-[100px] items-center justify-center gap-[5px]">
                <LanguagePicker className={'max-md:hidden'}/>

                <Link to={'/'}
                      className="text-center font-poppins text-sm font-semibold leading-normal text-neutral-50 underline md:hidden">
                    {t(GLOBAL_LOCALES.shopNow)}
                </Link>
            </div>
        </div>
    )
}


export default Top
