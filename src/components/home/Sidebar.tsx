import {GROUPED_CATEGORIES} from '@/constants/categories.ts'
import {useTranslation} from 'react-i18next'
import {I18N_NAMESPACES} from '@/constants/locales.ts'
import Icon from '@/components/elements/Icon.tsx'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import dropdown from '/assets/icons/dropdown.svg'
import {Link} from 'react-router-dom'
import {Category} from '@/types'

const isCategory = (category: (Category | { name_key: string; subcategories: Category[] })) : category is Category =>
    !!(category as Category).id

const SidebarItem = ({category}: { category: (Category | { name_key: string; subcategories: Category[] }) }) => {
    const {t} = useTranslation(I18N_NAMESPACES.categories)
    return isCategory(category) ? (
        <li key={category.id} className={'w-full hover:opacity-90'}>
            <Link to={`category/${category.name}`} className="text-body text-start text-black">
                {t(category.name)}
            </Link>
        </li>
    ) : (
        <DropdownMenu>
            <li className={'w-full hover:opacity-90'}>
                <DropdownMenuTrigger className="inline-flex w-full justify-between">
                    <p className="text-body text-start text-black">
                        {t(category.name_key)}
                    </p>
                    <Icon key={category.name_key} name={'chevron'} path={dropdown}
                          className={'-rotate-90 invert'}
                    />
                    <DropdownMenuContent align={'end'} alignOffset={-210}>
                        {category.subcategories.map(subcategory => (
                            <DropdownMenuItem key={subcategory.id}>
                                <Link to={`category/${subcategory.name}`} className="text-body text-center text-black">
                                    {t(subcategory.name)}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenuTrigger>
            </li>
        </DropdownMenu>
    )
}

const Sidebar = ({}) => (
    <aside>
        <ul className={'flex-col-start w-fit gap-4'}>
            {GROUPED_CATEGORIES.map(category =>
                <SidebarItem
                    key={isCategory(category) ? category.id : category.name_key}
                    category={category}/>
            )}
        </ul>
    </aside>
)

export default Sidebar
