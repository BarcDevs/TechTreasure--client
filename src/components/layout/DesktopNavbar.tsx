import {NavLink, useLocation} from 'react-router-dom'
import {NAVIGATION_LINKS} from '@/constants'
import cart from '/assets/icons/cart.svg'
import search from '/assets/icons/search.svg'
import user from '/assets/icons/user.svg'
import wishlist from '/assets/icons/wishlist.svg'
import Icon from '@/components/shared/Icon.tsx'
import {LAYOUT_CAPTIONS} from '@/constants/captions/en.ts'

const NavbarLink = ({to, label}: { to: string, label: string }) => {
    const isActive = useLocation().pathname === to

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
    const isAuthPage = useLocation().pathname === '/login' || useLocation().pathname === '/signup'

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
                        <NavbarLink key={link.name} to={link.path} label={link.name}/>
                    ))}
                    {!isLoggedIn && <NavbarLink to={'/signup'} label={'Sign Up'}/>}
                </div>
                {/*search & cart*/}
                <div className={'inline-flex gap-6'}>
                    <div
                        className={`no-focus inline-flex h-6 w-[210px] justify-between border-none ${isAuthPage ? 'max-lg:[120px]' : 'max-lg:hidden'}`}>
                        <input type="text"
                               placeholder={LAYOUT_CAPTIONS.searchPlaceholder}
                               className={'w-full font-poppins text-xs font-normal leading-[18px] text-black'}/>
                        <Icon path={search} name={'search'}/>
                    </div>
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
