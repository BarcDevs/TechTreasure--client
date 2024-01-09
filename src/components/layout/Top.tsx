import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select"
import {useState} from 'react'
import {LANGUAGES, GLOBAL_LOCALE_KEYS} from '@/constants'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'


const Top = ({}) => {
    const {t} = useTranslation('global')
    const [language, setLanguage] = useState(LANGUAGES.en)

    const handleSelectLanguage = (lang: string) => {
        setLanguage(lang as LANGUAGES)
    }
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
                <Select onValueChange={handleSelectLanguage}>
                    <SelectTrigger
                        className={'no-focus inline-flex h-[18px] border-none bg-black text-small text-neutral-50 max-md:hidden'}>
                        <span>{language}</span>
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(LANGUAGES).map(lang => (
                            <SelectItem className={'cursor-pointer hover:bg-neutral-50 text-small'} key={lang}
                                        value={lang}>{lang}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Link to={'/'}
                      className="text-center font-poppins text-sm font-semibold leading-normal text-neutral-50 underline md:hidden">
                    {t(GLOBAL_LOCALE_KEYS.shopNow)}
                </Link>
            </div>
        </div>
    )
}


export default Top
