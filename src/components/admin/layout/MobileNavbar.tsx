import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Icon from '@/components/elements/Icon.tsx'
import hamburger from '/assets/icons/hamburger.svg'
import {ADDITIONAL_ADMIN_LINKS, ADMIN_LINKS} from '@/constants'
import SidebarLink from '@/components/admin/layout/SidebarLink.tsx'

const MobileNavbar = ({}) =>
    (
        <nav className={'flex w-full items-center justify-between px-4 py-2 lg:hidden'}>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Icon
                        path={hamburger}
                        name={'menu'}
                        size={30}
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent className={'border-black bg-white'}>
                    <nav className="grid items-start px-4 text-sm font-medium">
                        {ADMIN_LINKS.map(link => (
                            <SidebarLink
                                key={link.href}
                                link={link}
                            />
                        ))}

                        <DropdownMenuSeparator/>

                        {ADDITIONAL_ADMIN_LINKS.map(({link}) => (
                            <SidebarLink
                                key={link.href}
                                link={link}
                            />
                        ))}
                    </nav>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    )

export default MobileNavbar
