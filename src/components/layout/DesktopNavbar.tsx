import {Link, NavLink, useLocation} from 'react-router-dom'
import {NAVIGATION_LINKS} from '@/constants'
import cart from '/assets/icons/cart.svg'
import user from '/assets/icons/user.svg'
import wishlist from '/assets/icons/wishlist.svg'
import Icon from '@/components/elements/Icon.tsx'
import Search from '@/components/shared/Search.tsx'
import {APP_NAME} from '@/constants'
import {useTranslation} from 'react-i18next'
import {I18N_NAMESPACES} from '@/constants/locales.ts'

const NavbarLink = ({to, label, location}: { to: string, label: string, location: string }) => {
    const isActive = location === to

    return (
        <NavLink to={to} end={to === '/'}
                 className={'whitespace-nowrap text-center text-body text-black'}>
            {label}
            {isActive &&
                <div className="relative h-[0px] w-full opacity-50">
                    <div className="absolute left-0 top-0 h-[0px] w-full border border-black"/>
                </div>}
        </NavLink>
    )
}

const DesktopNavbar = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.navigationLinks)
    const isLoggedIn = false
    const location = useLocation().pathname
    const isAuthPage = location === '/login' || location === '/signup'

    return (
        <nav className={'flex-center w-full max-md:hidden'}>
            <div className={'mb-1 mt-10 flex w-[90vw] flex-row items-center justify-between'}>
                {/*logo*/}
                <h1 className={'text-large mr-2.5 text-black'}>
                    {APP_NAME}
                </h1>
                {/*menu*/}
                <div className={'flex h-6 w-[50%] max-w-[350px] justify-around'}>
                    {NAVIGATION_LINKS.map(link => (
                        <NavbarLink key={link.name} to={link.path} label={t(link.key)} location={location}/>
                    ))}
                    {!isLoggedIn && <NavbarLink to={'/signup'} label={t('signup')} location={location}/>}
                </div>
                {/*search & cart*/}
                <div className={'inline-flex gap-6'}>
                    <Search additionalStyles={isAuthPage ? 'max-lg:[120px]' : 'max-lg:hidden'}/>
                    {!isAuthPage &&
                        <div className={'inline-flex h-6 justify-between gap-4'}>
                            <Link to={'/wishlist'}><Icon path={wishlist} name={'wishlist'} hoverable/></Link>
                            <Link to={'/cart'}><Icon path={cart} name={'cart'} hoverable/></Link>
                            {isLoggedIn && <Icon path={user} name={'user'} hoverable/>}
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default DesktopNavbar
