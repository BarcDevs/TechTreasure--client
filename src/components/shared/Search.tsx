import Icon from '@/components/shared/Icon.tsx'
import search from '/assets/icons/search.svg'
import {useTranslation} from 'react-i18next'
import {GLOBAL_LOCALE_KEYS, I18N_NAMESPACES} from '@/constants'

const Search = ({additionalStyles}: { additionalStyles?: string}) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)

    return (
        <div
            className={`inline-flex h-6 w-[210px] justify-between border-none ${additionalStyles}`}>
            <input type="text"
                   placeholder={t(`${GLOBAL_LOCALE_KEYS.searchPlaceholder}`)}
                   className={'no-focus w-full font-poppins text-xs font-normal leading-[18px] text-black outline-none'}/>
            <Icon path={search} name={'search'}/>
        </div>
    )
}

export default Search
