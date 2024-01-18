import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx'
import {Button} from '@/components/ui/button.tsx'
import Icon from '@/components/elements/Icon.tsx'
import {Link, useLocation} from 'react-router-dom'

const UserDropdown = ({}) => {
    const location = useLocation().pathname
    const isAdminPage = location.startsWith('/admin')
    const root = isAdminPage ? '/admin/' : '/'

    const userImage = "/assets/images/mock-avatar.jpg"
    // const userImage = null

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className={'no-focus'}>
                <Button
                    className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-800"
                    size="icon"
                    variant="ghost"
                >
                    <Icon path={userImage || "/assets/icons/user.svg"} name={'avatar'} size={32} className="aspect-square rounded-full object-cover"/>
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel><Link to={`${root}account`}>My Account</Link></DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem><Link to={`${root}settings`}>Settings</Link></DropdownMenuItem>
                <DropdownMenuItem><Link to={`${root}support`}>Support</Link></DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem><Link to={`${root}logout`} className={'text-red-500'}>Logout</Link></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDropdown
