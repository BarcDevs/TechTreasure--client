import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {useLocation, useNavigate} from 'react-router-dom'
import Icon from '@/components/elements/Icon.tsx'
import hamburger from '/assets/icons/hamburger.svg'
import {NAVIGATION_LINKS} from '@/constants'
import Search from '@/components/shared/Search.tsx'
import {useTranslation} from 'react-i18next'
import {I18N_NAMESPACES, NAVIGATION_LOCALES} from '@/constants/locales.ts'
import {useSelector} from 'react-redux'
import {IRootState} from '@/store'
import ShopButton from '@/components/shop/ShopButton.tsx'
import LanguagePicker from '@/components/shared/LanguagePicker.tsx'

const MobileNavbar = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.navigationLinks)
    const isLoggedIn = useSelector((state: IRootState) => state.auth.isAuthenticated)
    const location = useLocation().pathname
    const navigate = useNavigate()
    const isAuthPage = location === '/login' || location === '/signup'
    const isProductsPage = location.startsWith('/products')

    return (
        <nav className={'flex w-full items-center justify-between px-4 py-2 lg:hidden'}>
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
                            {t(link.locale)}
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator/>

                    {!isLoggedIn &&
                        <DropdownMenuItem
                            onSelect={() => navigate('/signup')}
                            className={'cursor-pointer'}
                        >
                            {t(NAVIGATION_LOCALES.signup)}
                        </DropdownMenuItem>
                    }

                    {isLoggedIn &&
                        <>
                            <DropdownMenuItem
                                onSelect={() => navigate('/account/me')}
                                className={'cursor-pointer'}
                            >
                                {t(NAVIGATION_LOCALES.profile)}
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onSelect={() => navigate('/logout')}
                                className={'cursor-pointer text-red-500'}>
                                {t(NAVIGATION_LOCALES.logout)}
                            </DropdownMenuItem>
                        </>
                    }
                </DropdownMenuContent>
            </DropdownMenu>

            {isProductsPage && <Search/>}

            <div className={'flex w-full justify-end'}>
                <div className={'w-1/5'}>
                    <LanguagePicker className={'bg-white text-black md:hidden'}/>
                </div>
            </div>

            {!isAuthPage &&
                <div className={'inline-flex h-6 justify-between gap-4'}>
                    <ShopButton to={'wishlist'} size={25}/>
                    <ShopButton to={'cart'} size={25}/>
                </div>
            }
        </nav>
    )
}


export default MobileNavbar
