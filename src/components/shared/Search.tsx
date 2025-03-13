import Icon from '@/components/elements/Icon.tsx'
import search from '/assets/icons/search.svg'
import {useTranslation} from 'react-i18next'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom'
import {useEffect, useRef} from 'react'

const Search = ({additionalStyles}: { additionalStyles?: string }) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)
    const navigate = useNavigate()
    const location = useLocation()
    const [searchTerm, setSearchParams] = useSearchParams()
    const searchInputRef = useRef<HTMLInputElement>(null)

    const searchString = searchTerm.get('search')

    const handleSearch = (e: React.ChangeEvent<any>) => {
        setSearchParams((prev) => {
            prev.set('search', e.target.value)
            if (!e.target.value)
                prev.delete('search')
            return prev
        })
    }

    const handleSearchClick = () => {
        if (location.pathname !== '/products') {
            navigate('/products')
        }
    }

    useEffect(() => {
        if (!location.pathname.includes('/products') &&
            searchInputRef.current)
            searchInputRef.current.value = ''
    }, [location.pathname])

    return (
        <div className={`inline-flex h-6 w-[210px] justify-between border-none ${additionalStyles}`}>
            <input
                type="text"
                ref={searchInputRef}
                value={searchString as string}
                onChange={handleSearch}
                onClick={handleSearchClick}
                placeholder={t(`${GLOBAL_LOCALES.searchPlaceholder}`)}
                className="no-focus w-full font-poppins text-xs font-normal leading-[18px] text-black outline-none"
            />
            <Icon path={search} name="search"/>
        </div>
    )
}

export default Search
