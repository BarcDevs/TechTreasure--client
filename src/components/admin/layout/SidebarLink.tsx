import {ADMIN_LINKS, ADMIN_ROOT} from '@/constants'
import {NavLink} from 'react-router-dom'
import {Badge} from '@/components/ui/badge.tsx'
import ORDERS from '@/mock/orders.ts'
import CUSTOMERS from '@/mock/customers.ts'
import {useStoreData} from '@/hooks/useStoreData.ts'

const SidebarLink = ({link}: { link: typeof ADMIN_LINKS[number] }) => {
const {products} = useStoreData()
    const badge = (linkName: string) => {
        const badgeLabel =
            linkName === 'Orders' ? ORDERS.length :
                linkName === 'Customers' ? CUSTOMERS.length :
                    linkName === 'Products' ? products?.products.length :
                        null

        return (
            <Badge
                className="ml-auto flex size-6 shrink-0 items-center justify-center rounded-full bg-red-500 hover:bg-red-500/80">
                {badgeLabel}
            </Badge>
        )
    }

    return (
        <NavLink
            className={({isActive}) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${isActive ?
                    'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : ''}`}
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
