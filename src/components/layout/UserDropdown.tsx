import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx'
import {Button} from '@/components/ui/button.tsx'
import Icon from '@/components/elements/Icon.tsx'
import {useLocation, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {IRootState} from '@/store'
import {useTranslation} from 'react-i18next'
import {I18N_NAMESPACES, NAVIGATION_LOCALES} from '@/constants/locales.ts'

const UserDropdown = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.navigationLinks)
    const location = useLocation().pathname
    const navigate = useNavigate()
    const isAdminPage = location.startsWith('/admin')
    const user = useSelector((state: IRootState) => state.auth.user)
    const userImage = '/assets/images/mock-avatar.jpg'

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className={'no-focus'}>
                <Button
                    className="size-8 rounded-full border border-gray-200 dark:border-gray-800"
                    size="icon"
                    variant="ghost"
                >
                    <Icon path={userImage || '/assets/icons/user.svg'}
                          name={'avatar'}
                          size={32}
                          className="aspect-square rounded-full object-cover"/>
                    <span className="sr-only">
                        Toggle user menu
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onSelect={() => navigate('/account/me')}
                    className={'cursor-pointer'}
                >
                    {t(NAVIGATION_LOCALES.myAccount)}
                </DropdownMenuItem>
                {!isAdminPage && user?.role === 'seller' &&
                    <DropdownMenuItem
                        onSelect={() => navigate('/admin')}
                        className={'cursor-pointer'}
                    >
                        {t(NAVIGATION_LOCALES.sellerDashboard)}
                    </DropdownMenuItem>}
                <DropdownMenuSeparator/>
                <DropdownMenuItem
                    onSelect={() => navigate('/contact')}
                    className={'cursor-pointer'}
                >
                    {t(NAVIGATION_LOCALES.support)}
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem
                    onSelect={() => navigate('/logout')}
                    className={'cursor-pointer text-red-500'}
                >
                    {t(NAVIGATION_LOCALES.logout)}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDropdown
