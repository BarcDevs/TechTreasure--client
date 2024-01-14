import Icon from '@/components/elements/Icon.tsx'
import search from '/assets/icons/search.svg'
import {useTranslation} from 'react-i18next'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'

const Search = ({additionalStyles}: { additionalStyles?: string }) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)
// TODO: add search functionality
    return (
        <div
            className={`inline-flex h-6 w-[210px] justify-between border-none ${additionalStyles}`}>
            <input type="text"
                   placeholder={t(`${GLOBAL_LOCALES.searchPlaceholder}`)}
                   className={'no-focus w-full font-poppins text-xs font-normal leading-[18px] text-black outline-none'}/>
            <Icon path={search} name={'search'}/>
        </div>
    )
}

export default Search
