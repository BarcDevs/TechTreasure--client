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
                 className={'text-center text-black text-base font-normal font-poppins leading-normal'}>
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
        <nav className={'flex-center w-full'}>
            <div className={'flex-row justify-between inline-flex w-[75%] mt-10 mb-1'}>
                {/*logo*/}
                <div className={'text-black text-2xl font-bold font-inter leading-normal tracking-wide'}>
                    TechTreasure
                </div>
                {/*menu*/}
                <div className={'h-6 gap-12 inline-flex'}>
                    {NAVIGATION_LINKS.map(link => (
                        <NavbarLink key={link.name} to={link.path} label={link.name}/>
                    ))}
                    {!isLoggedIn && <NavbarLink to={'/signup'} label={'Sign Up'}/>}
                </div>
                {/*search & cart*/}
                <div className={'inline-flex gap-6'}>
                    <div
                        className={'inline-flex w-[210px] h-6 justify-between no-focus border-none'}>
                        <input type="text"
                               placeholder={LAYOUT_CAPTIONS.searchPlaceholder}
                               className={'w-full text-black text-xs font-normal font-poppins leading-[18px]'}/>
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
