import {NavLink, useLocation} from 'react-router-dom'
import {NAVIGATION_LINKS} from '@/constants'
import cart from '/assets/icons/cart.svg'
import user from '/assets/icons/user.svg'
import wishlist from '/assets/icons/wishlist.svg'
import Icon from '@/components/shared/Icon.tsx'
import Search from '@/components/shared/Search.tsx'

const NavbarLink = ({to, label, location}: { to: string, label: string, location: string }) => {
    const isActive = location === to

    return (
        <NavLink to={to} end={to === '/'}
                 className={'text-center text-black text-base font-normal font-poppins leading-normal whitespace-nowrap'}>
            {label}
            {isActive &&
                <div className="w-full h-[0px] relative opacity-50">
                    <div className="absolute left-0 top-0 h-[0px] w-full border border-black"/>
                </div>}
        </NavLink>
    )
}

const DesktopNavbar = ({}) => {
    const isLoggedIn = false
    const location = useLocation().pathname
    const isAuthPage = location === '/login' || location === '/signup'

    return (
        <nav className={'flex-center w-full max-md:hidden'}>
            <div className={'flex-row justify-between inline-flex w-[75vw] max-lg:w-[90vw] mt-10 mb-1'}>
                {/*logo*/}
                <div className={'mr-2.5 font-inter text-2xl font-bold leading-normal tracking-wide text-black'}>
                    TechTreasure
                </div>
                {/*menu*/}
                <div className={'flex h-6 w-[50%] justify-around'}>
                    {NAVIGATION_LINKS.map(link => (
                        <NavbarLink key={link.name} to={link.path} label={link.name} location={location}/>
                    ))}
                    {!isLoggedIn && <NavbarLink to={'/signup'} label={'Sign Up'} location={location}/>}
                </div>
                {/*search & cart*/}
                <div className={'inline-flex gap-6'}>
                    <Search additionalStyles={isAuthPage ? 'max-lg:[120px]' : 'max-lg:hidden'}/>
                    {!isAuthPage &&
                        <div className={'inline-flex gap-4 h-6 justify-between'}>
                            <Icon path={wishlist} name={'wishlist'}/>
                            <Icon path={cart} name={'cart'}/>
                            {isLoggedIn && <Icon path={user} name={'user'}/>}
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default DesktopNavbar
