import {SELLER_LINKS, SELLER_ROOT} from '@/constants'
import {NavLink} from 'react-router-dom'
import {Badge} from '@/components/ui/badge.tsx'

const SidebarLink = ({link} : {link: typeof SELLER_LINKS[number]}) => (
    <NavLink
        className={({isActive}) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${isActive ?
                'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : ''}`}
        to={link.href}
        end={link.href === SELLER_ROOT}
    >
        <link.icon className="h-4 w-4"/>
        <p>{link.name}</p>
        {(link.name === 'Orders' || link.name === 'Customers') && <Badge
            className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 hover:bg-red-500/80">
            6
        </Badge>}
    </NavLink>
)

export default SidebarLink
