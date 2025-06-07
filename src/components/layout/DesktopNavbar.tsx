import {NavLink, useLocation} from 'react-router-dom'
import {NAVIGATION_LINKS} from '@/constants'
import Search from '@/components/shared/Search.tsx'
import {APP_NAME} from '@/constants'
import {useTranslation} from 'react-i18next'
import {AUTH_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'
import Underline from '@/components/shared/Underline.tsx'
import UserDropdown from '@/components/layout/UserDropdown.tsx'
import {useSelector} from 'react-redux'
import {IRootState} from '@/store'
import ShopButton from '@/components/shop/ShopButton.tsx'

const NavbarLink = ({to, label, location}: { to: string, label: string, location: string }) => {
    const isActive = location === to

    return (
        <NavLink to={to} end={to === '/'}
                 className={'text-body whitespace-nowrap text-center text-black'}>
            {label}
            {isActive &&
                <Underline/>}
        </NavLink>
    )
}

const DesktopNavbar = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.navigationLinks)
    const isLoggedIn = useSelector((state: IRootState) => state.auth.isAuthenticated)
    const location = useLocation().pathname
    const isAuthPage = location === '/login' || location === '/signup'
    const isProductsPage = location === '/products'

    return (
        <nav className={'flex-center w-full max-lg:hidden'}>
            <div className={'mb-1 mt-10 flex w-[90vw] flex-row items-center justify-between'}>
                {/*todo: fix logo*/}
                <a href={'/'} className={'flex_row'}>
                    <img src={'/assets/images/logo.png'}
                         alt={'logo'}
                         className={'mr-2.5'}
                         sizes={'10px'}
                    />
                    <h1 className={'text-large mr-2.5 text-black'}>
                        {APP_NAME}
                    </h1>
                </a>
                {/*menu*/}
                <div
                    className={'mx-8 flex h-6 w-[70%] max-w-[450px] justify-around gap-4'}>
                    {NAVIGATION_LINKS.map(link => (
                        <NavbarLink
                            key={link.name}
                            to={link.path}
                            label={t(link.key)}
                            location={location}
                        />
                    ))}
                    {!isLoggedIn &&
                        <NavbarLink
                            to={'/login'}
                            label={t(AUTH_LOCALES.login)}
                            location={location}
                        />}
                </div>

                {/*search & cart*/}
                <div className={'inline-flex gap-6'}>
                    {isProductsPage &&
                        <Search additionalStyles={isAuthPage ? 'max-lg:[120px]' : 'max-lg:hidden'}/>
                    }

                    {!isAuthPage &&
                        <div className={'inline-flex h-6 items-center justify-between gap-4'}>
                            <ShopButton to={'wishlist'} size={30}/>
                            <ShopButton to={'cart'} size={30}/>
                            {isLoggedIn && <UserDropdown/>}
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default DesktopNavbar
