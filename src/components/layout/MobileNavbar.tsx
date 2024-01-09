import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {Link, useLocation} from 'react-router-dom'
import Icon from "@/components/shared/Icon"
import hamburger from '/assets/icons/hamburger.svg'
import {NAVIGATION_LINKS} from '@/constants'
import cart from '/assets/icons/cart.svg'
import wishlist from '/assets/icons/wishlist.svg'
import Search from '@/components/shared/Search.tsx'
import {useTranslation} from 'react-i18next'

const DropdownEntry = ({to, label, className}: { to: string, label: string, className?: string }) => (
    <DropdownMenuLabel key={label}>
        <Link to={to} className={`text-body ${className}`}>
            {label}
        </Link>
    </DropdownMenuLabel>
)

const MobileNavbar = ({}) => {
    const {t} = useTranslation('navigationLinks')
    const isLoggedIn = true
    const location = useLocation().pathname
    const isAuthPage = location === '/login' || location === '/signup'

    return (
        <nav className={'w-full md:hidden flex justify-between items-center px-4 py-2'}>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Icon path={hamburger} name={'menu'} size={30}/>
                </DropdownMenuTrigger>
                {/*TODO fix dropdown styling*/}
                <DropdownMenuContent className={'bg-white border-black'}>
                    {NAVIGATION_LINKS.map(link => (
                        <DropdownEntry key={link.name} to={link.path} label={t(link.key)}/>
                    ))}
                    <DropdownMenuSeparator/>
                    {!isLoggedIn &&
                        <DropdownEntry to={'/signup'} label={t('signup')}/>
                    }
                    {isLoggedIn &&
                        <>
                            <DropdownEntry to={'/profile'} label={'Profile'}/>
                            <DropdownEntry to={'/logout'} label={t('logout')} className={'text-red-500'}/>
                        </>
                    }
                </DropdownMenuContent>
            </DropdownMenu>

            <Search/>

            {!isAuthPage &&
                <div className={'inline-flex gap-4 h-6 justify-between'}>
                    <Icon path={wishlist} name={'wishlist'} size={30}/>
                    <Icon path={cart} name={'cart'} size={30}/>
                </div>
            }
        </nav>
    )
}


export default MobileNavbar
