import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import Icon from '@/components/elements/Icon.tsx'
import hamburger from '/assets/icons/hamburger.svg'
import {NAVIGATION_LINKS} from '@/constants'
import cart from '/assets/icons/cart.svg'
import wishlist from '/assets/icons/wishlist.svg'
import Search from '@/components/shared/Search.tsx'
import {useTranslation} from 'react-i18next'
import {I18N_NAMESPACES} from '@/constants/locales.ts'
import {useSelector} from 'react-redux'
import {IRootState} from '@/store'
//todo locales
const MobileNavbar = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.navigationLinks)
    const isLoggedIn = useSelector((state: IRootState) => state.auth.isAuthenticated)
    const location = useLocation().pathname
    const navigate = useNavigate()
    const isAuthPage = location === '/login' || location === '/signup'

    return (
        <nav className={'flex w-full items-center justify-between px-4 py-2 md:hidden'}>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Icon
                        path={hamburger}
                        name={'menu'}
                        size={30}
                    />
                </DropdownMenuTrigger>
                {/*TODO fix dropdown styling*/}
                <DropdownMenuContent className={'border-black bg-white'}>
                    {NAVIGATION_LINKS.map(link => (
                        <DropdownMenuItem
                            key={link.name}
                            onSelect={() => navigate(link.path)}
                            className={'cursor-pointer'}
                        >
                            {t(link.key)}
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator/>
                    {!isLoggedIn &&
                        <DropdownMenuItem
                            onSelect={() => navigate('/signup')}
                            className={'cursor-pointer'}
                        >
                            {t('signup')}
                        </DropdownMenuItem>
                    }
                    {isLoggedIn &&
                        <>
                            <DropdownMenuItem
                                onSelect={() => navigate('/account/me')}
                                className={'cursor-pointer'}
                            >
                                {t('profile')}
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onSelect={() => navigate('/logout')}
                                className={'cursor-pointer text-red-500'}>
                                {t('logout')}
                            </DropdownMenuItem>
                        </>
                    }
                </DropdownMenuContent>
            </DropdownMenu>

            <Search/>

            {!isAuthPage &&
                <div className={'inline-flex h-6 justify-between gap-4'}>
                    <Link to={'/wishlist'}>
                        <Icon
                            path={wishlist}

                            name={'wishlist'}
                            size={30}
                            hoverable
                        />
                    </Link>
                    <Link to={'/cart'}>
                        <Icon
                            path={cart}
                            name={'cart'}
                            size={30}
                            hoverable
                        />
                    </Link>
                </div>
            }
        </nav>
    )
}


export default MobileNavbar
