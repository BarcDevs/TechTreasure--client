import {LAYOUT_CAPTIONS} from '@/constants/captions/en.ts'
import Icon from '@/components/shared/Icon.tsx'
import search from '/assets/icons/search.svg'

const Search = ({additionalStyles}: { additionalStyles?: string}) => {
    return (
        <div
            className={`inline-flex h-6 w-[210px] justify-between border-none ${additionalStyles}`}>
            <input type="text"
                   placeholder={LAYOUT_CAPTIONS.searchPlaceholder}
                   className={'no-focus w-full font-poppins text-xs font-normal leading-[18px] text-black outline-none'}/>
            <Icon path={search} name={'search'}/>
        </div>
    )
}

export default Search
