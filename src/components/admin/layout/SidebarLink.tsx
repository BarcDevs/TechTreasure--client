import {ADMIN_LINKS, ADMIN_ROOT} from '@/constants'
import {NavLink} from 'react-router-dom'
import {Badge} from '@/components/ui/badge.tsx'
import {getStoreStats} from '@/api/admin.ts'
import {useQuery} from '@tanstack/react-query'

const SidebarLink = ({link}: { link: typeof ADMIN_LINKS[number] }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['store-stats'],
        queryFn: getStoreStats
    })

    if (isLoading || !data) return null

    const { products, customers, orders } = data

    const badge = (linkName: string) => {
        const badgeLabel =
            linkName === 'Orders' ? orders :
                linkName === 'Customers' ? customers :
                    linkName === 'Products' ? products :
                        null

        return badgeLabel && (
            <Badge
                className="ml-auto flex size-6 shrink-0 items-center justify-center rounded-full bg-red-500 hover:bg-red-500/80">
                {badgeLabel}
            </Badge>
        )
    }

    return (
        <NavLink
            className={({isActive}) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 
                ${isActive ?
                    'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : ''}
                    ${link.href.includes('logout') ? 'text-red-500' : ''}`}
            to={link.href}
            end={link.href === ADMIN_ROOT}
        >
            <link.icon className="size-4"/>
            <p>{link.name}</p>
            {badge(link.name)}
        </NavLink>
    )
}

export default SidebarLink
