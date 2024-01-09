import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select"
import {LANGUAGES} from '@/constants'
import {useTranslation} from 'react-i18next'

const LanguagePicker = ({}) => {
    const {i18n} = useTranslation()

    const currentLanguage = () => {
        for (const lang in LANGUAGES) {
            if (LANGUAGES[lang].code === i18n.language) {
                return LANGUAGES[lang]
            }
        }
        return LANGUAGES.ENG
    }

    const handleSelectLanguage = (lang: string) => {
        i18n.changeLanguage(lang)
        localStorage.setItem('language', lang)
    }

    return (
        <Select onValueChange={handleSelectLanguage}>
            <SelectTrigger
                className={'no-focus text-small inline-flex h-[18px] border-none bg-black text-neutral-50 max-md:hidden'}>
                <span>{currentLanguage().name}</span>
            </SelectTrigger>
            <SelectContent>
                {Object.values(LANGUAGES).map(({code, name}) => (
                    <SelectItem className={'text-small cursor-pointer hover:bg-neutral-50'} key={code}
                                value={code}>{name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default LanguagePicker
