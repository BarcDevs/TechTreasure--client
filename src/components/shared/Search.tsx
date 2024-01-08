import {LAYOUT_CAPTIONS} from '@/constants/captions/en.ts'
import Icon from '@/components/shared/Icon.tsx'
import search from '/assets/icons/search.svg'

const Search = ({additionalStyles}: { additionalStyles?: string}) => {
    return (
        <div
            className={`no-focus inline-flex h-6 w-[210px] justify-between border-none ${additionalStyles}`}>
            <input type="text"
                   placeholder={LAYOUT_CAPTIONS.searchPlaceholder}
                   className={'w-full font-poppins text-xs font-normal leading-[18px] text-black'}/>
            <Icon path={search} name={'search'}/>
        </div>
    )
}

export default Search
