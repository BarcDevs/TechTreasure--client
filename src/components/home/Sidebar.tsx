import {CATEGORIES, GROUPED_CATEGORIES} from '@/constants/CATEGORIES.ts'
import {useTranslation} from 'react-i18next'
import {I18N_NAMESPACES} from '@/constants'
import Icon from '@/components/shared/Icon.tsx'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import dropdown from '/assets/icons/dropdown.svg'
import {Link} from 'react-router-dom'


const SidebarItem = ({category}: { category: CATEGORIES | { name_key: string, subcategories: CATEGORIES[] } }) => {
    const {t} = useTranslation(I18N_NAMESPACES.categories)
    return typeof category === 'string' ? (
        <li key={category} className={'w-full hover:opacity-90'}>
            <Link to={category} className="text-body text-start text-black">
                {t(category)}
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
                            <DropdownMenuItem key={subcategory}>
                                <Link to={subcategory} className="text-body text-center text-black">
                                    {t(subcategory)}
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
                    key={typeof category === 'string' ? category : category.name_key}
                    category={category}/>
            )}
        </ul>
    </aside>
)

export default Sidebar
